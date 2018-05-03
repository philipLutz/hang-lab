'use strict';

var ctx = $("#myChart");

// Create Global Variables


var progressArrayGlobal = '';
var gripSearchedProgress = '';
// var workoutDateProgress = '';
// var holdSizeProgress = '';
// var bodyweightProgress = '';
// var loadProgress = '';
// var setsProgress = '';
// var repsProgress = '';
// var repHangProgress = '';
// var repRestProgress = '';
// var setRestProgress = '';
// var commentsProgress = '';
// var totalLoadProgress = '';


$('#js-show-progress-button').click(event => {
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
	console.log('progress clicked')
	let gripInput = $('input[id="js-grip-progress-search"]').val();
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
			$('input[id="js-grip-progress-search"]').val('');
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

	// window.workoutDateProgress = workoutDateArray;
	// window.holdSizeProgress = holdSizeArray;
	// window.bodyweightProgress = bodyweightArray;
	// window.loadProgress = loadArray;
	// window.setsProgress = setsArray;
	// window.repsProgress = repsArray;
	// window.repHangProgress = repHangArray;
	// window.repRestProgress = repRestArray;
	// window.setRestProgress = setRestArray;
	// window.commentsProgress = commentsArray;

	// console.log(workoutDateProgress, holdSizeProgress, bodyweightProgress, loadProgress, setsProgress, repsProgress, repHangProgress, repRestProgress, setRestProgress, commentsProgress);

	let totalLoadArray = [];
	let progressArray = [];

	for (let i=0; i < data.length; i++) {
		totalLoadArray.push(loadArray[i]+bodyweightArray[i]);
	}

	for (let i=0; i < data.length; i++) {
		progressArray.push({x: i+1, y: totalLoadArray[i]});
	}

	
	window.progressArrayGlobal = progressArray;

	console.log(progressArrayGlobal, gripSearchedProgress);


};


var myChart = new Chart(ctx, {
    type: 'line',
    title: {text: `Progress for ${gripSearchedProgress}`},
    data: progressArrayGlobal
    // options : {
    //   scales: {
    //     yAxes: [{
    //       scaleLabel: {
    //         display: true,
    //         labelString: "Total load in pounds"
    //       }
    //     }]
    //   }
    // }
});