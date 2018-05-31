'use strict';

var ctx = $("#myChart");

// Create Global Variables

var gripSearchedProgress = '';

// Click event

$('.js-show-progress-button').click(event => {
	event.preventDefault();
	$('#display-workout-log').empty();
	$('#edit-workout-result').empty();
	$('#add-workout-result').empty();
	$('#delete-workout-result').empty();
	$('#add-workout-form').attr("aria-hidden", "true");
	$('#add-workout-form').attr("hidden", "true");
	$('#add-workout-result').empty();
	$('#edit-workout-form').attr("aria-hidden", "true");
	$('#edit-workout-form').attr("hidden", "true");
	$('#js-edit-workout-form').empty();
	$('#progress-chart').attr("aria-hidden", "false");
	$('#progress-chart').removeAttr("hidden");
});

$('#js-hide-progress-button').click(event => {
	event.preventDefault();
	$('#progress-chart').attr("aria-hidden", "true");
	$('#progress-chart').attr("hidden", "true");
});

$('#search-grip-form').submit(event => {
	event.preventDefault();
	let gripInput = $('select[id="js-grip-progress-search"] option:selected').val();
	window.gripSearchedProgress = gripInput;
	getProgressChartData(gripInput);
});

function getProgressChartData(gripInput) {

	const token = localStorage.getItem('authToken');

	$.ajax({
		url: `/api/workouts/${gripInput}`,
		type: 'GET',
		dataType: 'json',
		headers: {
			Authorization: `Bearer ${token}`
		},
		success: function(data) {
			processData(data);
		},
		error: function(data) {
			console.log('error');
		}
	});
};

// Loop through data to create arrays for the data points on the chart

function processData(data) {
	
	let workoutDateArray = [];
	let holdSizeArray = [];
	let bodyweightArray = [];
	let loadArray = [];
	let setsArray = [];
	let repsArray = [];
	let repHangArray = [];
	let repRestArray = [];
	let setRestArray = [];
	let commentsArray = [];

	for (let i=0; i < data.length; i++) {
		workoutDateArray.push(data[i].workoutDate);
	};

	for (let i=0; i < data.length; i++) {
		holdSizeArray.push(data[i].holdSize);
	};

	for (let i=0; i < data.length; i++) {
		bodyweightArray.push(data[i].bodyweight);
	};

	for (let i=0; i < data.length; i++) {
		loadArray.push(data[i].load);
	};

	for (let i=0; i < data.length; i++) {
		setsArray.push(data[i].sets);
	};

	for (let i=0; i < data.length; i++) {
		repsArray.push(data[i].reps);
	};

	for (let i=0; i < data.length; i++) {
		repHangArray.push(data[i].repHang);
	};

	for (let i=0; i < data.length; i++) {
		repRestArray.push(data[i].repRest);
	};

	for (let i=0; i < data.length; i++) {
		setRestArray.push(data[i].setRest);
	};

	for (let i=0; i < data.length; i++) {
		commentsArray.push(data[i].comments);
	};

	let totalLoadArray = [];

	for (let i=0; i < data.length; i++) {
		totalLoadArray.push(loadArray[i]+bodyweightArray[i]);
	}

	renderChart(workoutDateArray, totalLoadArray, gripSearchedProgress);
	


};

function renderChart(workoutDateProgress, totalLoadProgress, gripSearchedProgress) {

	Chart.defaults.global.defaultFontFamily = 'Stylish';
	Chart.defaults.global.defaultFontColor = 'rgba(51, 51, 51, 1)';
	Chart.defaults.global.defaultFontSize = 20;
	Chart.defaults.global.elements.line.borderColor = 'rgba(129, 5, 252, 0.9)'

	let data = {
		labels: workoutDateProgress,
		datasets: [{data: totalLoadProgress, backgroundColor: 'rgba(129, 5, 252, 0.3)'}]
	}

	let myChart = new Chart(ctx, {
		type: 'line',
		data: data,
		options : {
    		title: {display: false},
      		scales: {
        		yAxes: [{
          			scaleLabel: {display: true, labelString: "Total load in pounds"}, fontColor: 'rgba(0, 0, 0, 0.7)', fontSize: 28, gridLines: {color: 'rgba(0, 0, 0, 0.7)'}, ticks: {color: 'rgba(0, 0, 0, 0.7)'}
        		}],
        		xAxes: [{
          			scaleLabel: {display: true, labelString: "Workout Dates"}, fontColor: 'rgba(0, 0, 0, 0.7)', fontSize: 28, gridLines: {color: 'rgba(0, 0, 0, 0.7)'}, ticks: {color: 'rgba(0, 0, 0, 0.7)'}
        		}]
      		},
      		responsive: true,
      		maintainAspectRatio: false,
      		legend: {display: false}
      		
      		
    	}
	})
}






