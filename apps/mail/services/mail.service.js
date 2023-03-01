'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

import booksDemoData from '../data/books.json' assert { type: 'json' }

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
	query,
	get,
	remove,
	save,
	getEmptyBook,
	addReview,
	removeReview,
	addGoogleBook,
}

function query() {
	return storageService.query(BOOK_KEY)
}

function get(bookId) {
	return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
}

function remove(bookId) {
	return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
	if (book.id) {
		return storageService.put(BOOK_KEY, book)
	} else {
		return storageService.post(BOOK_KEY, book)
	}
}

function addReview(bookId, review) {
	let book
	review.id = utilService.makeId()
	return get(bookId)
		.then(res => {
			book = res
			if (!book.reviews) book.reviews = []
			book.reviews.unshift(review)
			return save(book)
		})
		.catch(console.log)
}

function removeReview(bookId, reviewId) {
	return get(bookId)
		.then(book => {
			const idx = book.reviews.findIndex(review => review.id === reviewId)
			book.reviews.splice(idx, 1)
			return save(book)
		})
		.catch(console.log)
}

function addGoogleBook(googleBook) {
	return query().then(books => {
		if (books.some(book => book.title === googleBook.title)) return
		return storageService.post(BOOK_KEY, googleBook)
	})
}

function getEmptyBook() {
	return {
		title: '',
		subtitle: '',
		authors: [''],
		publishedDate: null,
		description: '',
		pageCount: null,
		categories: [],
		thumbnail: 'https://edit.org/photos/images/cat/book-covers-big-2019101610.jpg-1300.jpg',
		language: 'en',
		listPrice: {
			amount: null,
			currencyCode: 'EUR',
			isOnSale: false,
		},
	}
}

function _createBooks() {
	let books = utilService.loadFromStorage(BOOK_KEY)
	if (!books || !books.length) {
		utilService.saveToStorage(BOOK_KEY, booksDemoData)
	}
}
