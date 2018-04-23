'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport');

//const requiredFields = require('../middleware/requiredFields');

mongoose.Promise = global.Promise;

const jwtAuth = passport.authenticate('jwt', {session: false});

router.use(jwtAuth)

router.use(bodyParser.json())

const { Workout } = require('./models');

//Get all workouts for one user

router.get('/workouts', jwtAuth, (req, res) => {
	Workout
		.find({author: req.user._id})
		.sort({date: -1})
		.then(workouts => res.json(workouts))
		.catch(err => {
			console.error(err);
			res.status(500).json({ message: 'Internal server error.' });
		});
});

//Get specific workout by _id

router.get('/workouts/:id', jwtAuth, (req, res) => {
	Workout
		.findById(req.params.id)
		.then(workouts => res.json(workouts))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Internal server error, unable to find workout.'});
		});
});

//Post a workout

router.post('/workouts', jwtAuth, (req, res) => {
	Workout
		.create({
			user: req.user._id,
			workoutDate: req.body.workoutDate,
			grip: req.body.grip,
			holdSize: req.body.holdSize,
			sets: req.body.sets,
			setRest: req.body.setRest,
			reps: req.body.reps,
			repHang: req.body.repHang,
			repRest: req.body.repRest,
			load: req.body.load,
			bodyweight: req.body.bodyweight,
			comments: req.body.comments
		})
		.then(workout => res.status(201).json(workout))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Internal server error, unable to post new workout.' });
		});
});

//Edit existing workout by _id

router.put('/workouts/:id', jwtAuth, (req, res) => {
	Workout
		.findByIdAndUpdate(req.params.id, {$set: {
			workoutDate: `${req.body.workoutDate}`,
			grip: `${req.body.grip}`,
			holdSize: `${req.body.holdSize}`,
			sets: `${req.body.sets}`,
			setRest: `${req.body.setRest}`,
			reps: `${req.body.reps}`,
			repHang: `${req.body.repHang}`,
			repRest: `${req.body.repRest}`,
			load: `${req.body.load}`,
			bodyweight: `${req.body.bodyweight}`,
			comments: `${req.body.comments}`
		}})
		.then(updatedWorkout => res.status(201).json(updatedWorkout))
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Internal server error, unable to update workout.' });
		});
});

//Delete existing workout by _id

router.delete('/workouts/:id', jwtAuth, (req, res) => {
	Workout
		.findByIdAndRemove(req.params.id)
		.then(workout => {
			console.log(`Deleted workout with id \`${req.params.id}\``);
			res.status(204).json({ message: 'success' });
		})
		.catch(err => {
			console.error(err);
			res.status(500).json({ error: 'Internal server error, unable to delete workout' });
		});
});

module.exports = { router };
