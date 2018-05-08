'use strict';

// Global Variables

var workoutIdToEdit = '';

// Rolldown animation - increments the delay on each item.

$('.rolldown-list li').each(function () {
  var delay = ($(this).index() / 4) + 's';
  $(this).css({
    webkitAnimationDelay: delay,
    mozAnimationDelay: delay,
    animationDelay: delay
  });
});

// Get New Workout

$('#js-get-workouts').click(event => {
	event.preventDefault();
	getWorkouts();
	$('#display-workout-log').empty();
	$('#display-workout-log').attr("aria-hidden", "false");
	$('#display-workout-log').removeAttr("hidden");
	$('#add-workout-form').attr("aria-hidden", "true");
	$('#add-workout-form').attr("hidden", "true");
	$('#edit-workout-result').empty();
	$('#add-workout-result').empty();
	$('#delete-workout-result').empty();
	$('#edit-workout-form').attr("aria-hidden", "true");
	$('#edit-workout-form').attr("hidden", "true");
	$('#js-edit-workout-form').empty();
	$('#progress-chart').attr("aria-hidden", "true");
	$('#progress-chart').attr("hidden", "true");
});

$('#js-hide-workout-log').click(event => {
	event.preventDefault();
	$('#display-workout-log').attr("aria-hidden", "true");
	$('#display-workout-log').attr("hidden", "true");
	$('#display-workout-log').empty();
});

function getWorkouts() {
	const token = localStorage.getItem('authToken');

	$.ajax({
		url: '/api/workouts',
		type: 'GET',
		dataType: 'json',
		headers: {
			Authorization: `Bearer ${token}`
		},
		success: function(data) {
			displayAllWorkouts(data);
		},
		error: function(data) {
			console.log('error');
		}
	});
};

function displayAllWorkouts(data) {
	
	for (let i=0; i < data.length; i++) {

		$('#display-workout-log').append(
			`<li class="workout-item">
				<h3 data-date="${data[i].workoutDate}">${data[i].workoutDate}</h3>
				
				<section data-holdSize="${data[i].holdSize}" data-grip="${data[i].grip}" class="edit-hold"><b>Grip</b>: ${data[i].holdSize} mm ${data[i].grip}</section>
				
				<section data-sets="${data[i].sets}" data-reps="${data[i].reps}" class="edit-sets"><b>Form</b>: ${data[i].sets} sets of ${data[i].reps} reps</section>
				
				<section data-repHang="${data[i].repHang}" data-repRest="${data[i].repRest}" class="edit-rep"><b>Rep</b>: ${data[i].repHang} sec hang / ${data[i].repRest} sec rest</section>
				
				<section data-setRest="${data[i].setRest}" class="edit-rest"><b>Rest between sets</b>: ${data[i].setRest} min</section>
				
				<section data-bodyweight="${data[i].bodyweight}" data-load="${data[i].load}" class="edit-load"><b>Bodyweight</b>: ${data[i].bodyweight} lb</section>

				<section data-bodyweight="${data[i].bodyweight}" data-load="${data[i].load}" class="edit-load"><b>Additional Load</b>: ${data[i].load} lb</section>
				
				<section data-comments="${data[i].comments}" class="edit-comments"><b>Workout Comments</b>: "${data[i].comments}"</section>
				
				
				<button data-id="${data[i]._id}" type="button" role="button" class="js-edit-button">Edit Workout</button>
				
				<button type="button" role="button" class="js-hide-edit-button" aria-hidden="true" hidden>Close Edit Workout</button>
				
				<button data-id="${data[i]._id}" type="button" role="button" class="js-delete-button">Delete Workout</button>
			</li>
			`
			)
	};
}

// Post New Workout

$('#js-add-workout-button').click(event => {
	event.preventDefault();
	$('#add-workout-form').attr("aria-hidden", "false");
	$('#add-workout-form').removeAttr("hidden");
	$('#display-workout-log').attr("aria-hidden", "true");
	$('#display-workout-log').attr("hidden", "true");
	$('#display-workout-log').empty();
	$('#progress-chart').attr("aria-hidden", "true");
	$('#progress-chart').attr("hidden", "true");
	$('#edit-workout-form').attr("aria-hidden", "true");
	$('#edit-workout-form').attr("hidden", "true");
});

$('#js-hide-workout-form').click(event => {
	event.preventDefault();
	$('#add-workout-form').attr("aria-hidden", "true");
	$('#add-workout-form').attr("hidden", "true");
	$('#add-workout-result').empty();
});

$('#js-add-workout-form').submit(event => {
	event.preventDefault();
	addNewWorkout();
});

function addNewWorkout() {
	let workoutDate = $('input[id="js-date"]').val();
	let grip = $('select[id="js-grip"] option:selected').val();
	let holdSize = $('input[id="js-size"]').val();
	let sets = $('input[id="js-sets"]').val();
	let setRest = $('input[id="js-set-rest"]').val();
	let reps = $('input[id="js-reps"]').val();
	let repHang = $('input[id="js-rep-hang"]').val();
	let repRest = $('input[id="js-rep-rest"]').val();
	let load = $('input[id="js-load"]').val();
	let bodyweight = $('input[id="js-bodyweight"]').val();
	let comments = $('input[id="js-comments"]').val();
	postNewWorkout(workoutDate, grip, holdSize, sets, setRest, reps, repHang, repRest, load, bodyweight, comments);
}

function postNewWorkout(workoutDate, grip, holdSize, sets, setRest, reps, repHang, repRest, load, bodyweight, comments) {
	$('.add-workout-failure').remove();

	const token = localStorage.getItem('authToken');

	$.ajax({
		url: '/api/workouts',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		headers: {Authorization: `Bearer ${token}`},
		data: JSON.stringify({
			"workoutDate": `${workoutDate}`,
			"grip": `${grip}`,
			"holdSize": `${holdSize}`,
			"sets": `${sets}`,
			"setRest": `${setRest}`,
			"reps": `${reps}`,
			"repHang": `${repHang}`,
			"repRest": `${repRest}`,
			"load": `${load}`,
			"bodyweight": `${bodyweight}`,
			"comments": `${comments}`
		}),
		success: (data) => {
			if(data) {
				$('#add-workout-result').prepend(
					`<div id="add-workout-success">Your workout was successfuly logged.</div>`
					)
				$('input[id="js-date"]').val('');
				$('input[id="js-grip"]').val('');
				$('input[id="js-size"]').val('');
				$('input[id="js-sets"]').val('');
				$('input[id="js-set-rest"]').val('');
				$('input[id="js-reps"]').val('');
				$('input[id="js-rep-hang"]').val('');
				$('input[id="js-rep-rest"]').val('');
				$('input[id="js-load"]').val('');
				$('input[id="js-bodyweight"]').val('');
				$('input[id="js-comments"]').val('');
			}
		},
		error: (...rest) => {
			$('#add-workout-result').prepend(
				`<div id="add-workout-failure">Oops! Failed to add workout. Please try again.</div>`
				)
		}
	});
	$('#add-workout-form').attr("aria-hidden", "true");
	$('#add-workout-form').attr("hidden", "true");
}

// Put Workout (edit)

// Display Edit Form, make workoutIdToEdit global variable...

$('#display-workout-log').on('click', '.js-edit-button', (event => {
	event.preventDefault();
	window.workoutIdToEdit = $(event.currentTarget).attr('data-id');
	let editDate = $(event.currentTarget).siblings("h3").attr('data-date');
	let editGrip = $(event.currentTarget).siblings(".edit-hold").attr('data-grip');
	let editHoldSize = $(event.currentTarget).siblings(".edit-hold").attr('data-holdSize');
	let editSets = $(event.currentTarget).siblings(".edit-sets").attr('data-sets');
	let editReps = $(event.currentTarget).siblings(".edit-sets").attr('data-reps');
	let editRepHang = $(event.currentTarget).siblings(".edit-rep").attr('data-repHang');
	let editRepRest = $(event.currentTarget).siblings(".edit-rep").attr('data-repRest');
	let editSetRest = $(event.currentTarget).siblings(".edit-rest").attr('data-setRest');
	let editBodyweight = $(event.currentTarget).siblings(".edit-load").attr('data-bodyweight');
	let editLoad = $(event.currentTarget).siblings(".edit-load").attr('data-load');
	let editComments = $(event.currentTarget).siblings(".edit-comments").attr('data-comments');

	$('#edit-workout-form').attr("aria-hidden", "false");
	$('#edit-workout-form').removeAttr("hidden");
	$('#display-workout-log').attr("aria-hidden", "true");
	$('#display-workout-log').attr("hidden", "true");
	$('#display-workout-log').empty();
	$('#progress-chart').attr("aria-hidden", "true");
	$('#progress-chart').attr("hidden", "true");

	$('#js-edit-workout-form').append(
		`<fieldset>
			<legend>Edit Workout</legend>

			<div>
				<label for="js-edit-date" class="label">Workout Date:</label>
				<input id="js-edit-date" class="input" type="text" value="${editDate}" required>
			</div>

			<div>
				<label for="js-edit-grip" class="label">Grip Type:</label>
				<select id="js-edit-grip" class="input" name="select-grip" required>
					<option value="crimp">Crimp</option>
					<option value="open">Open</option>
					<option value="IM">IM pocket</option>
					<option value="MR">MR pocket</option>
					<option value="mono">Mono pocket</option>
				</select>
			</div>

			<div>
				<label for="js-edit-size" class="label">Hold Size (millimeters):</label>
				<input id="js-edit-size" class="input" type="text" value="${editHoldSize}" required>
			</div>

			<div>
				<label for="js-edit-sets" class="label">Number of Sets:</label>
				<input id="js-edit-sets" class="input" type="text" value="${editSets}" required>
			</div>

			<div>
				<label for="js-edit-set-rest" class="label" >Rest Between Sets (minutes):</label>
				<input id="js-edit-set-rest" class="input" type="text" value="${editSetRest}" required>
			</div>

			<div>
				<label for="js-edit-reps" class="label">Number of Repetitions:</label>
				<input id="js-edit-reps" class="input" type="text" value="${editReps}" required>
			</div>

			<div>
				<label for="js-edit-rep-hang" class="label">Repetition Duration (seconds):</label>
				<input id="js-edit-rep-hang" class="input" type="text" value="${editRepHang}" required>
			</div>

			<div>
				<label for="js-edit-rep-rest" class="label">Rest Between Repetitions (seconds):</label>
				<input id="js-edit-rep-rest" class="input" type="text" value="${editRepRest}" required>
			</div>

			<div>
				<label for="js-edit-load" class="label">Load Adjustment (pounds):</label>
				<input id="js-edit-load" class="input" type="text" value="${editLoad}" required>
			</div>

			<div>
				<label for="js-edit-bodyweight" class="label">Bodyweight (pounds):</label>
				<input id="js-edit-bodyweight" class="input" type="text" value="${editBodyweight}" required>
			</div>

			<div>
				<label for="js-edit-comments" class="label">Comments on Performance:</label>
				<input id="js-edit-comments" class="input" type="text" value="${editComments}" required>
			</div>

			<div>
				<button type="submit" class="button" id="js-edit-submit-button">Edit Workout</button>
				<button type="button" class="button" id="js-hide-edit-workout">Close Edit Workout</button>
			</div>
			
		</fieldset>`
		)
	
}));

// Hide Edit Form

$('#edit-workout-form').on('click', '#js-hide-edit-workout', (event => {
	event.preventDefault();
	$('#edit-workout-form').attr("aria-hidden", "true");
	$('#edit-workout-form').attr("hidden", "true");
	$('#js-edit-workout-form').empty();
	getWorkouts();
	$('#display-workout-log').empty();
	$('#display-workout-log').attr("aria-hidden", "false");
	$('#display-workout-log').removeAttr("hidden");
}));

// Listen for Edit Form submission

$('#edit-workout-form').on('click', '#js-edit-submit-button', (event => {
	event.preventDefault();
	editWorkout();
}));

function editWorkout() {
	let workoutDateNew = $('input[id="js-edit-date"]').val();
	let gripNew = $('select[id="js-edit-grip"] option:selected').val();
	let holdSizeNew = $('input[id="js-edit-size"]').val();
	let setsNew = $('input[id="js-edit-sets"]').val();
	let setRestNew = $('input[id="js-edit-set-rest"]').val();
	let repsNew = $('input[id="js-edit-reps"]').val();
	let repHangNew = $('input[id="js-edit-rep-hang"]').val();
	let repRestNew = $('input[id="js-edit-rep-rest"]').val();
	let loadNew = $('input[id="js-edit-load"]').val();
	let bodyweightNew = $('input[id="js-edit-bodyweight"]').val();
	let commentsNew = $('input[id="js-edit-comments"]').val();
	putWorkout(workoutDateNew, gripNew, holdSizeNew, setsNew, setRestNew, repsNew, repHangNew, repRestNew, loadNew, bodyweightNew, commentsNew);
}

function putWorkout(workoutDateNew, gripNew, holdSizeNew, setsNew, setRestNew, repsNew, repHangNew, repRestNew, loadNew, bodyweightNew, commentsNew) {
	$('#edit-workout-result').empty();

	const token = localStorage.getItem('authToken');

	$.ajax({
		url: `/api/workouts/${workoutIdToEdit}`,
		type: 'PUT',
		dataType: 'json',
		contentType: 'application/json',
		headers: {Authorization: `Bearer ${token}`},
		data: JSON.stringify({
			"workoutDate": `${workoutDateNew}`,
			"grip": `${gripNew}`,
			"holdSize": `${holdSizeNew}`,
			"sets": `${setsNew}`,
			"setRest": `${setRestNew}`,
			"reps": `${repsNew}`,
			"repHang": `${repHangNew}`,
			"repRest": `${repRestNew}`,
			"load": `${loadNew}`,
			"bodyweight": `${bodyweightNew}`,
			"comments": `${commentsNew}`
		}),
		success: (data) => {
			if(data) {
				$('#edit-workout-result').prepend(
					`<div class="edit-workout-success">Your workout was successfuly changed.</div>`
					)
			}
		},
		error: (...rest) => {
			$('#edit-workout-result').prepend(
				`<div class="edit-workout-failure">Oops! Failed to change workout. Please try again.</div>`
				)
		}
	});
	$('#edit-workout-form').attr("aria-hidden", "true");
	$('#edit-workout-form').attr("hidden", "true");
	$('#js-edit-workout-form').empty();
}

// Delete Workout

$('#display-workout-log').on('click', '.js-delete-button', (event => {
	console.log('delete clicked');
	event.preventDefault();
	let workoutIdToDelete = $(event.currentTarget).attr('data-id');
	deleteWorkout(workoutIdToDelete,);
	$(event.currentTarget).closest('li').remove();
}));

function deleteWorkout(workoutIdToDelete) {
	const token = localStorage.getItem('authToken');
	console.log(workoutIdToDelete);
	$.ajax({
		url: `/api/workouts/${workoutIdToDelete}`,
		type: 'DELETE',
		dataType: 'json',
		headers: {Authorization: `Bearer ${token}`},
		success: (data) => {
			console.log(`Successfully deleted workout ${workoutIdToDelete}`);

			$('#delete-workout-result').prepend(
				`<div class="delete-workout-success">Your workout was successfully deleted.</div>`
				)
		},
		error: (...rest) => {
			$('#delete-workout-result').prepend(
				`<div class="delete-workout-failure">Oops! Failed to delete workout. Please try again.`
				)
		}
	});
}



