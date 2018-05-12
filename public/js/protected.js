'use strict';

// Check User

function parseJwt(token) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(window.atob(base64));
};

function authorizeUser() {
	const token = localStorage.getItem('authToken');
	if (!token) {
		location.href = '/';
	}
};

$(() => {
	authorizeUser();
});

//Logout User

$('#js-logout-button').click(event => {
	event.preventDefault();
	logoutUser();
});

function logoutUser() {
	localStorage.removeItem('authToken');
	window.location.href = ('/')
};
