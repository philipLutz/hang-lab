'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const passport = require('passport');
const requiredFields = require('../middleware/requiredFields');

mongoose.Promise = global.Promise;

router.use(jwtAuth)

router.use(bodyParser.json())

const { Workout } = require('./models');

const jwtAuth = passport.authenticate('jwt', {session: false});

//Get all workouts for one user
router.get('/workouts', jwtAuth, (req, res) => {
	Workout
		.find({author: req.user._id})
		.sort({date: -1})
		.then(workouts => res.json(workouts))
		.catch(err => {
			console.error(err);
			res.status(500).json({ message: 'Internal server error' });
		});
});

//Get specific workout by date
router.get('/workouts/:date', jwtAuth, (req, res) => {
	Workout
		.find({date: req.params.date})
		.sort({date: -1})
		.then(workouts => res.json(workouts))
		.catch(err => {
			console.error(err);
			res.status(500).json({ message: 'Unable to find workouts for this date'});
		});
});

//Post a workout

router.post('/workouts', jwtAuth, (req, res) => {
	
})





