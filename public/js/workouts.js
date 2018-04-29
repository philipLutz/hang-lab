'use strict';

// Global Variables

var workoutIdToEdit = '';

// Get New Workout

$('#js-get-workouts').click(event => {
	event.preventDefault();
	getWorkouts();
	$('#display-workout-log').empty();
	$('#display-workout-log').attr("aria-hidden", "false");
	$('#display-workout-log').removeAttr("hidden");
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
	console.log(data);
	for (let i=0; i < data.length; i++) {
		


		$('#display-workout-log').append(
			`<li class="workout-item">
				<h3>${data[i].workoutDate}</h3>
				<section>Grip: ${data[i].holdSize} mm ${data[i].grip}</section>
				<section>${data[i].sets} sets of ${data[i].reps} reps</section>
				<section>Rep: ${data[i].repHang} s hang / ${data[i].repRest} s rest</section>
				<section>Rest between sets: ${data[i].setRest} min</section>
				<section>Bodyweight: ${data[i].bodyweight} lb, Additional Load: ${data[i].load} lb</section>
				<section>Workout Comments: "${data[i].comments}"</section>
				<section class="workout-id" aria-hidden="true" hidden></section>
				<button data-id="${data[i]._id}" type="button" role="button" class="js-edit-button">Edit Workout</button>
				<button type="button" role="button" class="js-hide-edit-button" aria-hidden="true" hidden>Close Edit Workout</button>
				<button data-id="${data[i]._id}" type="button" role="button" class="js-delete-button">Delete Workout</button>
			</li>
			`
			)
	};

}

// Rolldown animation - increments the delay on each item.
$('.rolldown-list li').each(function () {
  var delay = ($(this).index() / 4) + 's';
  $(this).css({
    webkitAnimationDelay: delay,
    mozAnimationDelay: delay,
    animationDelay: delay
  });
});

// Post New Workout

$('#js-add-workout-button').click(event => {
	event.preventDefault();
	$('#add-workout-form').attr("aria-hidden", "false");
	$('#add-workout-form').removeAttr("hidden");
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
	let grip = $('input[id="js-grip"]').val();
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
}

// Put Workout (edit)

// Display Edit Form, make workoutIdToEdit global variable...

// I need to redo the PUT form so that it is hidden when the page originally loads and then when the user clicks on the workout to edit it, the list of other workouts disappears and the form then prefills in with the info from the specific workout.  I think I am having trouble because there is a form for each item in the list and I can't specify (easily) which one I want to submit to the server. So I just need to grab the values (like I did to get the data-id) from the event.currentTarget then add the to the edit form, then the request should be good?

$('#display-workout-log').on('click', '.js-edit-button', (event => {
	event.preventDefault();
	window.workoutIdToEdit = $(event.currentTarget).attr('data-id');
	$('.edit-workout-form').attr("aria-hidden", "false");
	$('.edit-workout-form').removeAttr("hidden");
	$('.js-hide-edit-button').attr("aria-hidden", "false");
	$('.js-hide-edit-button').removeAttr("hidden");
	$('.js-edit-button').attr("aria-hidden", "true");
	$('.js-edit-button').attr("hidden", "true");
	
}));

// Hide Edit Form

$('#display-workout-log').on('click', '.js-hide-edit-button', (event => {
	event.preventDefault();
	$('.edit-workout-form').attr("aria-hidden", "true");
	$('.edit-workout-form').attr("hidden", "true");
	$('.js-hide-edit-button').attr("aria-hidden", "true");
	$('.js-hide-edit-button').attr("hidden", "true");
	$('.js-edit-button').attr("aria-hidden", "false");
	$('.js-edit-button').removeAttr("hidden");
}));

// Listen for Edit Form submission

$('#display-workout-log').on('click', '#js-edit-submit-button', (event => {
	event.preventDefault();
	console.log('submit clicked');
	editWorkout();
}));

function editWorkout() {
	let workoutDate = $(event.currentTarget).find('.js-date').val();
	// let grip = $('input[id="js-grip"]').val();
	// let holdSize = $('input[id="js-size"]').val();
	// let sets = $('input[id="js-sets"]').val();
	// let setRest = $('input[id="js-set-rest"]').val();
	// let reps = $('input[id="js-reps"]').val();
	// let repHang = $('input[id="js-rep-hang"]').val();
	// let repRest = $('input[id="js-rep-rest"]').val();
	// let load = $('input[id="js-load"]').val();
	// let bodyweight = $('input[id="js-bodyweight"]').val();
	// let comments = $('input[id="js-comments"]').val();
	console.log(workoutDate);
}

function putWorkout(workoutDate, grip, holdSize, sets, setRest, reps, repHang, repRest, load, bodyweight, comments) {
	$('.put-workout-failure').remove();

	const token = localStorage.getItem('authToken');

	$.ajax({
		url: `/api/workouts/${workoutIdToEdit}`,
		type: 'PUT',
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
	getWorkouts();
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
	})
}



