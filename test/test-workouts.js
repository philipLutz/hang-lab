'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { Workout } = require('../workouts/models');
const { JWT_SECRET, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('/api/workouts', function () {
  const username = 'exampleUserName';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';
  const email = 'exampleEmail@gmail.com';
  const user = 'exampleUserName';
  const workoutDate = '05/11/2018';
  const grip = 'crimp';
  const holdSize = 15;
  const sets = 3;
  const setRest = 4;
  const reps = 6;
  const repHang = 6;
  const repRest = 4;
  const load = 25;
  const bodyweight = 150;
  const comments = 'completed all sets';

  before(function () {
    return runServer(TEST_DATABASE_URL);
  });

  after(function () {
    return closeServer();
  });

  beforeEach(function () {
    return User.hashPassword(password).then(password =>
      User.create({
        username,
        password,
        firstName,
        lastName,
        email
      })).then(function() {
      Workout.create({
        user,
        workoutDate,
        grip,
        holdSize,
        sets,
        setRest,
        reps,
        repHang,
        repRest,
        load,
        bodyweight,
        comments
      })
    });
  });

  afterEach(function () {
    return User.remove({}).then(function() {
      return Workout.remove({})
    });
  });

  describe('/api/workouts', function () {
    describe('GET', function () {
      it('Should list all workouts for specific user', function () {
        const token = jwt.sign({user: {username: 'exampleUserName'}}, JWT_SECRET, {expiresIn: 10000});
        return chai
          .request(app)
          .get('/api/workouts')
          .send({username})
          .set('Authorization', `Bearer ${token}`)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
        });
      });
      it('Should list all workouts with specific grip', function () {
        const token = jwt.sign({user: {username: 'exampleUserName'}}, JWT_SECRET, {expiresIn: 10000});
        return chai
          .request(app)
          .get(`/api/workouts/${grip}`)
          .send({username})
          .set('Authorization', `Bearer ${token}`)
          .then(function(res) {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
        });
      });
    });

    describe('POST', function () {
      it('Should add a workout', function () {
        const token = jwt.sign({user: {username: 'exampleUserName'}}, JWT_SECRET, {expiresIn: 10000});
        const workoutBody = {user, workoutDate, grip, holdSize, sets, setRest, reps, repHang, repRest, load, bodyweight, comments};
        return chai
          .request(app)
          .post('/api/workouts')
          .send(workoutBody)
          .set('Authorization', `Bearer ${token}`)
          .then(function(res) {
            expect(res).to.have.status(201);
            expect(res).to.be.json;
            expect(res.body.workoutDate).to.equal(workoutBody.workoutDate);
          })
      });
    });


    describe('PUT', function () {
      it('Should edit an existing workout', function () {
        it('Should add a workout', function () {
        const token = jwt.sign({user: {username: 'exampleUserName'}}, JWT_SECRET, {expiresIn: 10000});
        const updateWorkout = {}
        return Workout
          .findOne()
          .then(function(res) {

          })
          
        });
      });
    });

    describe('DELETE', function () {
      it('Should delete an existing workout', function () {

      });
    });



  });







});