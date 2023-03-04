export const utilService = {
	setQueryParams,
	deleteQueryParam,
	getValFromParam,
	makeId,
	loadFromStorage,
	saveToStorage,
	getRandomInt,
}

function setQueryParams(newParams) {
	const url = new URL(window.location.href)
	const params = new URLSearchParams(url.search)

	for (var paramName in newParams) {
		const paramValue = newParams[paramName]
		params.set(paramName, paramValue) // used to update an existing query string parameter or add a new one if it doesn't exist.
	}

	url.search = params.toString()
	window.history.pushState({ path: url.href }, '', url.href) //modify the URL of the current page without reloading the page
}

function deleteQueryParam(key) {
	const url = new URL(window.location.href)
	const params = new URLSearchParams(url.search)

	params.delete(key)
	url.search = params.toString()

	window.history.pushState({ path: url.href }, '', url.href)
}

function getValFromParam(key) {
	const queryStringParams = new URLSearchParams(window.location.search)
	return queryStringParams.get(key)
}
function makeId(length = 6) {
	var txt = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length))
	}

	return txt
}

function saveToStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
	const data = localStorage.getItem(key)
	return data ? JSON.parse(data) : undefined
}

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}
