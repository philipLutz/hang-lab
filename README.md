# Hang Lab

## Introduction

Hang Lab is an application aimed at rock climbers who engage in hangboard (also called fingerboard) training.  Hangboarding is is a systematic way for climbers to strengthen their fingers, and finger strength is one of the most significant physical attributes in determining difficult rock climbing performance.  Hang Lab offers a simple way for the user to log their hangboard workouts and track their progress.  Details like grip type, size of hold, and style of workout structure is completely customizable.  Hang Lab tracks progress for specific grip types, and the options offered in this application will be more than adequate for even the most advanced athletes.  

## Screenshots

### Start

![Start Page](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-06-05%20at%2020.03.43.png "Start Page")

### Create Account

![Create Account Page](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-06-05%20at%2020.05.24.png "Create Account Page")

### Login

![Login Page](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-06-05%20at%2020.04.57.png "Login Page")

### User Account with Workout Log

![Workout Log](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-06-05%20at%2020.07.08.png "Workout Log")

### Add Workout Form

![Add Workout Form](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-06-05%20at%2020.08.33.png "Add Workout Form")

### Edit Workout Form

![Edit Workout Form](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-06-05%20at%2020.09.10.png "Edit Workout Form")

### View Progress Chart

![Progress Chart](https://raw.githubusercontent.com/philipLutz/hang-lab/master/Screen%20Shot%202018-06-05%20at%2020.10.19.png "Progress Chart")

## User Experience

The user starts at the start page, which contains a description of the application and two options. If they already have an account, there is a button to skip straight to the login page.  If the user needs to create an account, they click on the create account button and proceed to fill out the form.  If the account is successfully created, the user is moved to the login page (an error message will appear if there is a problem). Once the user has logged into the account, they can view their workout log and add workouts to their account.  When looking at the workout log, the user has the option to edit or delete workouts.  If the user wants to view their progress, they select the grip type that they want to analyze, and a line chart is generated from all the workouts that reference that specific grip.  When the user is done using the application, a logout button is located in the upper right section of the screen.

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
