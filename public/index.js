function watchSignUp() {
	$('#sign-up-button').click(function(event) {
		displaySignUpForm();
	});
}

function watchLogIn() {
	$('#log-in-button').click(function(event) {
		displayLogInForm();
	});
}

function displayLogInForm() {
	$('.form').html(`
		<form class="submit-form">
			<button type="button" role="button" id="submit-button">Submit form</button>
		</form>
		`);
	watchSubmitButton();
}

function displaySignUpForm() {
	$('.form').html(`
		<form class="submit-form">
			<button type="button" role="button" id="submit-button">Submit form</button>
		</form>
		`);
	watchSubmitButton();
}

function watchSubmitButton() {
	$('#submit-button').click(function(event) {
		displayOverview();
		$('.submit-form').remove();
	});
}

function displayOverview() {
	$('.overview').html(`
		<div>Overview</div>
		`);
	getCalendarData();
	getLogbookData();
	getProgressData();
}

function getCalendarData() {
	const calendarDataRaw = mockCalendar;
	displayCalendar(calendarDataRaw);
}

function getLogbookData() {
	const logbookDataRaw = mockLogbook;
	displayLogbook(logbookDataRaw);
}

function getProgressData() {
	const progressDataRaw = mockProgress;
	displayProgress(progressDataRaw);
}

function displayCalendar(calendarDataRaw) {
	const day1 = calendarDataRaw[0].Day1;
	const day2 = calendarDataRaw[1].Day2;
	const day3 = calendarDataRaw[2].Day3;

	$('.calendar').html(`
		<div>Day 1 Training: ${day1.training}, Comments: ${day1.comments}</div>
		<div>Day 2 Training: ${day2.training}, Comments: ${day2.comments}</div>
		<div>Day 3 Training: ${day3.training}, Comments: ${day3.comments}</div>
		`);
}

function displayLogbook(logbookDataRaw) {
	const workout1 = logbookDataRaw[0].Workout1;
	const workout2 = logbookDataRaw[1].Workout2;
	const workout3 = logbookDataRaw[2].Workout3;

	$('.logbook').html(`
		<div>Workout 1 : ${workout1}</div>
		<div>Workout 2 : ${workout2}</div>
		<div>Workout 3 : ${workout3}</div>
		`);
}

function displayProgress(progressDataRaw) {
	const load = progressDataRaw[0].load
	const sets = progressDataRaw[1].sets

	$('.progress').html(`
		<div>Total load over time: ${load}</div>
		<div>Total sets over time: ${sets}</div>
		`);
}






$(watchSignUp);
$(watchLogIn);