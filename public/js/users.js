'use strict';

// Show Create Account Form

$('#show-create-account-button').on('click', event => {
	event.preventDefault();
	$('#about').attr("aria-hidden", "true");
	$('#about').attr("hidden", "true");
	$('#show-buttons').attr("aria-hidden", "true");
	$('#show-buttons').attr("hidden", "true");
	$('#js-signup-form').attr("aria-hidden", "false");
	$('#js-signup-form').removeAttr("hidden");
});

// Back to Start

$('#back-button').on('click', event => {
	event.preventDefault();
	$('#about').attr("aria-hidden", "false");
	$('#about').removeAttr("hidden");
	$('#show-buttons').attr("aria-hidden", "false");
	$('#show-buttons').removeAttr("hidden");
	$('#js-signup-form').attr("aria-hidden", "true");
	$('#js-signup-form').attr("hidden", "true");
})

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
	console.log(firstName, lastName, username, email, password);
}

function postNewUser(firstName, lastName, username, email, password) {
	$('.signup-failure').remove();
	$.ajax({
		url: '/api/users',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({
			"firstName": `${firstName}`,
			"lastName": `${lastName}`,
			"username": `${username}`,
			"email": `${email}`,
			"password": `${password}`
		}),
		success: (data) => {
			if(data) {
				location.href = '/login.html';

				$('input[id="js-signup-firstName"]').val('');
				$('input[id="js-signup-lastName"]').val('');
				$('input[id="js-signup-username"]').val('');
				$('input[id="js-signup-email"]').val('');
				$('input[id="js-signup-password"]').val('');
			}
		},
		error: (...rest) => {
			$('#signup-result').prepend(
				`<div class='signup-failure'><b>Oops! Account creation failed. Please <a href='/'>login</a> or try signing up again.</b></div>`
				)
		}
	});
}

//Login Existing User

$('#js-login-form').submit(event => {
	event.preventDefault();
	loginExistingUser();
	$('#signup-success').attr("aria-hidden", "true");
	$('#signup-success').attr("hidden", "true");
});

function loginExistingUser() {
	let username = $('input[id="js-login-username"]').val();
	let password = $('input[id="js-login-password"]').val();
	postExistingUser(username, password);
}

function postExistingUser(username, password) {
	$.ajax({
		url: '/api/auth/login',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		data: JSON.stringify({
			"username": `${username}`,
			"password": `${password}`
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
