# Hang Lab

## Introduction

Hang Lab is an application aimed at rock climbers who engage in hangboard (also called fingerboard) training.  Hangboarding is is a systematic way for climbers to strengthen their fingers, and finger strength is one of the most significant physical attributes in determining difficult rock climbing performance.  Hang Lab offers a simple way for the user to log their hangboard workouts and track their progress.  Details like grip type, size of hold, and style of workout structure is completely customizable.  Hang Lab tracks progress for specific grip types, and the options offered in this application will be more than adequate for even the most advanced athletes.  

## Screenshots

### Create Account

![Create Account Page](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-05-13%20at%2015.47.05.png "Create Account Page")

### Login

![Login Page](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-05-13%20at%2015.47.28.png "Login Page")

### User Account with Workout Log

![Workout Log](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-05-13%20at%2015.48.09.png "Workout Log")

### Add Workout Form

![Add Workout Form](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-05-13%20at%2015.49.03.png "Add Workout Form")

### Edit Workout Form

![Edit Workout Form](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-05-13%20at%2015.49.47.png "Edit Workout Form")

### View Progress Chart

![Progress Chart](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-05-13%20at%2015.50.28.png "Progress Chart")

## User Experience

The user starts at the account creation page, and if they already have an account, there is a button in the upper right section of the screen to skip straight to the login.  If the user successfully creates a new account, they are moved to the login page and then can log into their account.  Once in the account, the user can view their workout log and add workouts to their account.  When looking at the workout log, the user has the option to edit or delete workouts.  If the user wants to view their progress, they select the grip type that they want to analyze, and a line chart is generated from all the workouts that reference that specific grip.  When the user is done using the application, a logout button is located in the upper right section of the screen.

## Try it Out 

https://evening-wave-56565.herokuapp.com/

If you do not want to create your own account, you can use an example account that has the username of "TestUser1" with the password "1234512345".  This account is prefilled with typical hangboard workout information and is an easy way to see how the application is used.

## Technology

### Front-End
- HTML
- JavaScript
- CSS
- JQuery
- Chart.js

### Back-End
- Node
- Express
- MongoDB
- Bcrypt
- JSON Web Tokens
- Passport

### Testing and Deployment
- Mocha
- Chai
- Faker
- Travis CI
- Heroku
- mLab

## Future Development

- Add more customizable grip type options and track grip preferences for each user
- Allow user to specify type of hangboard being used
- Let user specify how they want to view their progress (e.g. track grip size or time under tension instead of total load)
- Allow users to connect with each other and if users' preferences allow it, view each others' workout logs and progress
