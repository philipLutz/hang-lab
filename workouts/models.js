'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const workoutSchema = new mongoose.Schema({
	user: { type: String, required: true },
	workoutDate: { type: String, required: true },
	grip: { type: String, required: true },
	holdSize: { type: Number, required: true },
	sets: { type: Number, required: true },
	setRest: { type: Number, required: true },
	reps: { type: Number, required: true },
	repHang: { type: Number, required: true },
	repRest: { type: Number, required: true },
	load: { type: Number, required: true },
	bodyweight: { type: Number, required: true },
	comments: { type: String, required: true }
}, { timestamp: true });

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = { Workout };