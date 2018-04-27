'use strict';

// Global Variables

let currentWorkoutId;
let workoutIdToDelete;

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
	console.log(data.length);
	console.log(data[0].bodyweight);
	for (let i=0; i < data.length; i++) {
		


		$('#display-workout-log').append(
			`<li>${data[i].workoutDate}</li>`
			)
	};

}

// Increments the delay on each item.
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

$('#js-edit-workout-form').submit(event => {
	event.preventDefault();
	editWorkout();
});

function editWorkout() {
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
	putWorkout(workoutDate, grip, holdSize, sets, setRest, reps, repHang, repRest, load, bodyweight, comments);
}

function putWorkout(workoutDate, grip, holdSize, sets, setRest, reps, repHang, repRest, load, bodyweight, comments) {
	$('.put-workout-failure').remove();

	const token = localStorage.getItem('authToken');

	$.ajax({
		url: `/api/workouts/${currentWorkoutId}`,
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
					`<div class="add-workout-success">Your workout was successfuly changed.</div>`
					)
			}
		},
		error: (...rest) => {
			$('#edit-workout-result').prepend(
				`<div class="edit-workout-failure">Oops! Failed to change workout. Please try again.</div>`
				)
		}
	});
}

// Delete Workout

function deleteWorkout() {
	const token = localStorage.getItem('authToken');

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



