const mockCalendar = [
	{
		Day1: {
			training: true,
			comments: 'Workout4'
		}
	}, {
		Day2: {
			training: false,
			comments: 'feeling sore'
		}
	}, {
		Day3: {
			training: true,
			comments: 'Workout5'
		}
	}
];

const mockLogbook = [
	{
		Workout1: {
			date: '4/3/18',
			hold: 'crimp',
			size: 15,
			sets: 3,
			reps: 6,
			rephang: 6,
			represt: 4,
			load: 10,
			bodyweight: 150,
			totalload: function() {return this.load + this.bodyweight;},
			comments: 'completed all the sets easily'
		}
	}, {
		Workout2: {
			date: '4/5/18',
			hold: 'crimp',
			size: 15,
			sets: 3,
			reps: 6,
			rephang: 6,
			represt: 4,
			load: 15,
			bodyweight: 150,
			totalload: function() {return this.load + this.bodyweight;},
			comments: 'completed all the sets'
		}
	}, {
		Workout3: {
			date: '4/8/18',
			hold: 'crimp',
			size: 15,
			sets: 3,
			reps: 6,
			rephang: 6,
			represt: 4,
			load: 20,
			bodyweight: 150,
			totalload: function() {return this.load + this.bodyweight;},
			comments: 'almost failed on last rep of last two sets'
		}
	}
];

const mockProgress = [
	{
		load: 
			[mockLogbook[0].Workout1.totalload(), mockLogbook[1].Workout2.totalload(), mockLogbook[2].Workout3.totalload()]
	}, {
		sets: 
			[mockLogbook[0].Workout1.sets, mockLogbook[1].Workout2.sets, mockLogbook[2].Workout3.sets]
	}
];