'use strict';

//Create New Account

$('#js-signup-form').submit(event => {
	event.preventDefault();
	createNewUser();
});

function createNewUser() {
	let firstName = $('input[id="js-signup-firstName"]').val();
	let lastName = $('input[id="js-signup-lastName"]').val();
	let username = $('input[id="js-signup-username"]').val();
	let email = $('input[id="js-signup-email"]').val();
	let password = $('input[id="js-signup-password"]').val();
	postNewUser(firstName, lastName, username, email, password);
}

function postNewUser(firstName, lastName, username, email, password) {
	$('.signup-failure').remove();
	$.ajax({
		url: '/api/users',
		type: 'POST',
		dataType: 'jsonp',
		contentType: 'application/json',
		data: JSON.stringify({
			firstName: firstName,
			lastName: lastName,
			username: username,
			email: email,
			password: password
		}),
		success: (data) => {
			if(data) {
				$('#signup-result').prepend(
					`<div class='signup-success'>Sick! Your account has been created. You can login <a href='/'>here</a>.</div>`
					)
				$('input[id="js-signup-firstName"]').val('');
				$('input[id="js-signup-lastName"]').val('');
				$('input[id="js-signup-username"]').val('');
				$('input[id="js-signup-email"]').val('');
				$('input[id="js-signup-password"]').val('');
			}
		},
		error: (...rest) => {
			$('#signup-result').prepend(
				`<div class='signup-failure'>Oops! Account creation failed. Please <a href='/'>login</a> or try signing up again.</div>`
				)
		}
	});
}

//Login Existing User

$('#js-login-form').submit(event => {
	event.preventDefault();
	loginExistingUser();
});

function loginExistingUser() {
	let email = $('input[id="js-login-email"]').val();
	let password = $('input[id="js-login-password"]').val();
	postExistingUser(email, password);
}

function postExistingUser(email, password) {
	$.ajax({
		url: '/api/login',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({
			email: email,
			password: password
		}),
		success: (token) => {
			localStorage.setItem('authToken', token.authToken);
			location.href = '/home.html';
		},
		error: (jqXHR, exception) => {
			$('.alert').attr('aria-hidden', 'false').removeAttr('hidden');
		}
	});
}

//Login Button

$('#log-in-button').click(event => {
	window.location.href = './login.html';
	return false;
});

//Signup Button

$('#sign-up-button').click(event => {
	window.location.href = './signup.html';
	return false;
});

$(function() {
	const token = localStorage.getItem('authToken');
	if (token) {
		location.href = '/home.html';
	}
});
