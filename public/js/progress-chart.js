'use strict';

let ctx = $("#myChart");

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

$('#js-hide-progress-chart').click(event => {
	event.preventDefault();
	$('#progress-chart').attr("aria-hidden", "true");
	$('#progress-chart').attr("hidden", "true");
})









let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                
            ],
            borderColor: [
                
            ],
            borderWidth: 1
        }]
    },
    options: {
        
    }
});