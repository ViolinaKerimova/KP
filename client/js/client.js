// This is a global variable with all rows of the "teltypes" table.
var landmarkTYPES = [];
var i=0;
function reload_neighborhoods() {
	$.get('neighborhoods').done(function(data) {
		$('#neighborhoods').html(render_neighborhoods(data.neighborhoods));
		$('#neighborhoods-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#neighborhoods-messages').html(render_messages(data.messages));
	});
}

function reload_landmarks(neighborhood_id) {
	$.get('neighborhoods/' + neighborhood_id + '/landmarks').done(function(data) {
		$('#landmarks').html(render_landmarks(data.neighborhood, data.landmarks));
		$('#landmarks-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#landmarks-messages').html(render_messages(data.messages));
	});
}

function reload_teltypes() {
	$.get('teltypes').done(function(data) {
		landmarkTYPES = data.teltypes;
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#neighborhoods-messages').html(render_messages(data.messages));
	});
}

$(document).ready(function() {
	
	reload_teltypes();
	reload_neighborhoods();

	$(document).on('click', 'a.neighborhoods-refresh', function() {
		reload_neighborhoods();
		return false; // disables default browser behavior when a hyper-link is clicked.
	});

	$(document).on('click', 'a.neighborhood-add', function() {
		var new_neighborhood = { id: '', fname: '', lname: '',	address: '' };
		$('#neighborhood-edit').html(render_neighborhood_form(new_neighborhood));
		$('#neighborhood-messages').html('');
		return false;
	});

	$(document).on('click', 'a.neighborhood-edit', function() {
		var neighborhood_id = $(this).attr('data-neighborhood-id');
		$.get('neighborhoods/'+neighborhood_id).done(function(data) {
			$('#neighborhood-edit').html(render_neighborhood_form(data.neighborhood));	
			$('#neighborhood-messages').html(render_messages(data.messages));
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#neighborhood-messages').html(render_messages(data.messages));
		});
		return false;
	});

	$(document).on('submit', '#neighborhood-edit > form', function() {
		var edited_neighborhood = $(this).serializeObject();
		$.postJSON('neighborhoods/' + edited_neighborhood.id, edited_neighborhood).done(function(data) {
			$('#neighborhood-edit').html('');
			$('#neighborhood-messages').html(render_messages(data.messages));
			reload_neighborhoods();
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#neighborhood-messages').html(render_messages(data.messages));
		});
		return false;
	});

	$(document).on('click', 'a.neighborhood-delete', function() {
		var neighborhood_id = $(this).attr('data-neighborhood-id');
		$.delete('neighborhoods/' + neighborhood_id).done(function(data) {
			reload_neighborhoods();
			$('#neighborhood-messages').html(render_messages(data.messages));
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#neighborhood-messages').html(render_messages(data.messages));
		});
		return false;
	});


	// landmarkS
	$(document).on('click', 'a.neighborhood-landmarks, a.landmarks-refresh', function() {
		var neighborhood_id = $(this).attr('data-neighborhood-id');
		reload_landmarks(neighborhood_id);
		$('#landmark-edit').html('');
		$('#landmark-messages').html('');
		return false;
	});

	$(document).on('click', 'a.landmark-delete', function() {
		var landmark_id = $(this).attr('data-landmark-id');
		var neighborhood_id = $(this).attr('data-neighborhood-id');
		$.delete('landmarks/' + landmark_id).done(function(data) {
			reload_landmarks(neighborhood_id);
		});
		return false;
	});

	$(document).on('click', 'a.landmark-edit', function() {
		var landmark_id = $(this).attr('data-landmark-id');
		$.get('landmarks/'+landmark_id).done(function(data){
			$('#landmark-edit').html(render_landmark_form(data.landmark));
			$('#landmark-messages').html(render_messages(data.messages));					
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#landmark-messages').html(render_messages(data.messages));
		});
		return false;
	});

	$(document).on('click', 'a.landmark-add', function() {
		var neighborhood_id = $(this).attr('data-neighborhood-id');
		var new_landmark = { id: '', neighborhood_id: neighborhood_id, number: '', teltype_id: '' };
		$('#landmark-edit').html(render_landmark_form(new_landmark));
		$('#landmark-messages').html('');
		return false;
	});

	$(document).on('submit', '#landmark-edit > form', function() {
		var landmark = $(this).serializeObject();
		$.postJSON('landmarks/' + landmark.id, landmark).done(function(data) {
			$('#landmark-edit').html('');
			$('#landmark-messages').html(render_messages(data.messages));
			reload_landmarks(landmark.neighborhood_id);
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#landmark-messages').html(render_messages(data.messages));
		});
		return false;
	});
});
