// All these function render piece of HTML to plug into the DOM tree.
// The HTML can be plugged using $('#id').html(new_html);

function render_neighborhoods(neighborhoods) {
	var html = "<tr>"+
			"<th>ID</th>"+
			"<th>Name</th>"+
			"<th>Size</th>"+
			"<th></th>"+
		"</tr>";

	for(var i=0; i<neighborhoods.length; i++) {
		var p = neighborhoods[i];
		html += "<tr>" +
			"<td>" + p.id + "</td>" +
			"<td><a href='#' data-neighborhood-id='" + p.id + "' class='neighborhood-landmarks'>" +
				html_escape(p.name) +
			"</a></td>"+
			"<td>" + html_escape(p.size) + "</td>" +
			"<td>" +
				"<a href='#' data-neighborhood-id='" + p.id + "' class='edit_icon neighborhood-edit'>Edit</a> " +
				"<a href='#' data-neighborhood-id='" + p.id + "' class='delete_icon neighborhood-delete'>Delete</a>" +
			"</td>" +
		"</tr>";
	}

	html = "<table class='grid'>"+html+"</table>";
	return html;
}

function render_neighborhood_form(neighborhood) {
	if(!neighborhood) return 'Empty neighborhood.';
	
	var html = '';
	var title = (neighborhood.id) ? 'Edit neighborhood' : 'Add neighborhood';
	
	html += "<h1>" + title + "</h1>";
	html += "<form action='#' method='post'>";
	html += "<p><label>ID</label><input name='id' value='" + html_escape(neighborhood.id) + "' readonly='readonly' /></p>";
	html += "<p><label>Name</label><input name='name' value='" + html_escape(neighborhood.name) + "'/></p>";
	html += "<p><label>Size</label><input name='size' value='" + html_escape(neighborhood.size) + "'/></p>";
	html += "<p><button>Save</button></p>";
	html += "</form>";
	
	return html;
}

// landmarkS
function render_landmarks(neighborhood, landmarks) {	
	var html = '';
	
	html += "<p class='user_icon'>"+
			"<b>" + html_escape(neighborhood.name) + "</b>, "+ 
			neighborhood.size +
		"</p>";
	
	html += "<table class='grid'>";
	html += "<tr>"+
		"<th>ID</td>"+
		"<th>Landmarks</th>"+
		"<th>Neighborhood_ID</th>"+
		"<th></th>"+
	"</tr>";
	for(var i=0; i<landmarks.length; i++) {
		var landmark = landmarks[i];
		//fq flobalna promenliva
		var landmarktype = get_landmarktype(landmark.neighborhood_id);
		html += "<tr>"+
			"<td>" + landmark.id + "</td>" +
			"<td>" + html_escape(landmark.name) + "</td>" +
			"<td>" + landmark.neighborhood_id + "</td>" +
			"<td>" +
				"<a href='#' data-neighborhood-id='" + neighborhood.id + "' data-landmark-id='" + landmark.id + "' class='edit_icon landmark-edit'>Edit</a> " +
				"<a href='#' data-neighborhood-id='" + neighborhood.id + "' data-landmark-id='" + landmark
				.id + "' class='delete_icon landmark-delete'>Delete</a>" +
			"</td>"+
		"</tr>";
	}
	html += "</table>";
	
	html += "<p>" +
		"<a href='#' data-neighborhood-id='" + neighborhood.id + "' class='add_icon landmark-add'>Add New landmark</a> " +
		"<a href='#' data-neighborhood-id='" + neighborhood.id + "' class='refresh_icon landmarks-refresh'>Refresh</a>" +
		"</p>";

	return html;
}

function render_landmark_form(landmark) {
	if(!landmark) return 'Empty landmark.';
	
	var html = '';
	var title = (landmark.id) ? 'Edit landmark' : 'Add landmark';
	
	html += "<h1>" + title + "</h1>";
	html += "<form action='#' method='post'>";
	html += "<p><label>ID</label><input name='id' value='" + html_escape(landmark.id) + "' readonly='readonly' /></p>";
	html += "<p><label>Neighborhood_ID</label><input name='neighborhood_id' value='" + html_escape(landmark.neighborhood_id) + "' readonly='readonly' /></p>";
	html += "<p><label>Name</label><input name='name' value='" + html_escape(landmark.name) + "'/></p>";
	
	//html += "<p><label>Type</label>";
	//html += "<select name='landmarktype_id' class='txt medium'>";
	/*html += "<option value=''> </option>";
	for(var i = 0; i < landmarkTYPES.length; i++) {
		var landmark = landmarkTYPES[i];
		var selected = (landmark.landmarktype_id === landmarktype.id) ? 'selected' : '';
		html += "<option value='" + landmarktype.id + "' " + selected + ">" + landmarktype.name + "</option>";
	}
	html += "</select>"; 
	html += "</p>";*/

	html += "<p><button>Save</button></p>";
	html += "</form>";
	
	return html;
}

function render_messages(messages) {
	var html = '';
	if(messages) {	
		for(var i = 0; i < messages.length; i++) {
			var m = messages[i];
			var css = (m.type === 'error') ? 'error_icon' : 'info_icon';
			html += "<p class='" + css + "'>" + m.text + "</p>";
		}
	}
	return html;
}

function get_landmarktype(landmarktype_id) {
	// landmarkTYPES is global variable preloaded on client start.
	for(var i=0; i < landmarkTYPES.length; i++) {
		if(landmarkTYPES[i].id == landmarktype_id) {
			return landmarkTYPES[i];
		}
	}
	return null;
}
	
function html_escape(val) {
	return (val+'')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&apos;');
}

