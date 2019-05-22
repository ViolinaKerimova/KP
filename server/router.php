<?php
// Route URL paths
if($request->get('neighborhoods')) {
	$response->neighborhoods = $db->querybind_all('SELECT * FROM neighborhoods ORDER BY id');
}
else if($request->get('neighborhoods/[0-9]+')) {
	$neighborhood_id = (int) $request->segment(1);
	$response->neighborhood = $db->querybind_one('SELECT * FROM neighborhoods WHERE id = ?', [ $neighborhood_id ]);
	if(!$response->neighborhood) {
		$response->code(404);
		$response->error('404: neighborhood Not Found.');
	}
}
else if($request->post('neighborhoods/[0-9]+') || $request->post('neighborhoods')) {
	$neighborhood_id = (int) $request->segment(1, 0);
	$neighborhood = $request->data;
	if($neighborhood) {	
		if(strlen($neighborhood->name) < 1) $response->error('First Name is empty.');
		if($neighborhood->size < 1) $response->error('Size is empty.');
		//if(strlen($neighborhood->address) < 3) $response->error('Address is shorter then 3 characters.');
	}
	else {
		$response->error('No JSON data sent.');
	}
	
	if($response->hasErrors()) {
		$response->code(400);
		$response->error('400: Invalid input.');
	}
	else {
		if($neighborhood_id > 0) { // update existing
			$result = $db->querybind(
				'UPDATE neighborhoods SET name=?, size=?  WHERE id=?', 
				[$neighborhood->name, $neighborhood->size,  $neighborhood_id]
			);
		} else { // insert new
			$result = $db->querybind(
				'INSERT INTO neighborhoods SET name=?, size=?', 
				[$neighborhood->name, $neighborhood->size]
			);
			$neighborhood_id = $db->insert_id;
		}
		
		$response->neighborhood = $db->querybind_one('SELECT * FROM neighborhoods WHERE id = ?', [$neighborhood_id]);
		$response->info('neighborhood saved.');	
	}
}////////////////////
else if($request->delete('neighborhoods/[0-9]+')) {
	$neighborhood_id = (int) $request->segment(1);
	$db->querybind('DELETE FROM landmarks WHERE neighborhood_id = ?', [$neighborhood_id] );
	$db->querybind('DELETE FROM neighborhoods WHERE id = ?', [$neighborhood_id] );
	$response->info("neighborhood id=$neighborhood_id and its landmarks deleted.");
}
else if($request->get('neighborhoods/[0-9]+/landmarks')) {
	$neighborhood_id = (int) $request->segment(1);
	$response->neighborhood = $db->querybind_one('SELECT * FROM neighborhoods WHERE id = ?', [$neighborhood_id] );
	$response->landmarks = [];
	if($response->neighborhood) {
		$response->landmarks = $db->querybind_all('SELECT * FROM landmarks WHERE neighborhood_id = ?', [$neighborhood_id] );
	}
	else {
		$response->code(404);
		$response->error("404: neighborhood id=$neighborhood_id not found.");
	}
}
else if($request->get('landmarks/[0-9]+')) {
	$landmark_id = (int) $request->segment(1);
	$response->landmark = $db->querybind_one('SELECT * FROM landmarks WHERE id = ?', [ $landmark_id ]);
	if(!$response->landmark) {
		$response->code(404);
		$response->error('404: landmark Not Found.');
	}
}
else if($request->post('landmarks/[0-9]+') || $request->post('landmarks')) {
	$landmark_id = (int) $request->segment(1);
	$landmark = $request->data; // deserialized JSON object sent over the network.
	if($landmark) {
		if(strlen($landmark->name) < 1) $response->error('Name is empty.');
		if($landmark->neighborhood_id < 1) $response->error('Missing neighborhood_id.');
//		$teltype = $db->querybind_one("SELECT * FROM teltypes WHERE id = ?", [$landmark->teltype_id + 0]);
//		if(!$teltype) $response->error('Type is invalid.');
	}
	else {
		$response->error('No JSON data sent.');
	}
	
	if($response->hasErrors()) {
		$response->code(400);
		$response->error('400: Invalid input.');		
	}
	else {
		$args = [$landmark->name, $landmark->neighborhood_id];
		if($landmark_id > 0) { // update existing
			$result = $db->querybind('UPDATE landmarks SET  name=?, neighborhood_id=? WHERE id=?', $args,$landmark_id);
		} else { // insert new
			$result = $db->querybind('INSERT INTO landmarks SET name=?, neighborhood_id=?',$args,$landmark_id);
		    $landmark_id = rand(0,10);
		}
		$response->landmark = $db->querybind_one('SELECT * FROM landmarks WHERE id = ?', [$landmark_id]);
		$response->info('landmark saved.');	
	}
}
else if($request->delete('landmarks/[0-9]+')) {
	$landmark_id = (int) $request->segment(1);
	$db->querybind('DELETE FROM landmarks WHERE id = ?', [$landmark_id] );
	$response->info("landmark id=$landmark_id deleted.");
}
else if($request->get('teltypes')) {
	$response->teltypes = $db->querybind_all('SELECT * FROM teltypes ORDER BY id');
}
else {
	$response->error('404: URL Not Found: /'.$request->path);
	$response->code(404);
}

// Outputs $response object as JSON to the client.
echo $response->render();