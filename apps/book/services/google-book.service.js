'use strict'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

//import googleDemoData from '../data/google.json' assert { type: 'json' }
import { bookService } from './book.service.js'

const GOOGLE_STORAGE_KEY = 'googleDB'

//_createGoogleDemoData()

export const googleBookService = {
	query,
	get,
	remove,
	save,
	debounce,
}

function query(txt) {
	return axios
		.get('https://www.googleapis.com/books/v1/volumes?q=' + txt)
		.then(res => {
			let newBooks = res.data.items.map(book => {
				let newBook = bookService.getEmptyBook()
				newBook.id = book.id
				newBook.listPrice.isOnSale = book.saleInfo.saleability === 'NOT_FOR_SALE' ? false : true
				newBook.listPrice.amount = utilService.getRandomInt(50, 200)
				newBook.title = book.volumeInfo.title || ''
				newBook.language = book.volumeInfo.language || 'en'
				newBook.subtitle = book.volumeInfo.subtitle || ''
				newBook.authors = book.volumeInfo.authors || []
				newBook.categories = book.volumeInfo.categories || []
				newBook.pageCount = +book.volumeInfo.pageCount || 0
				newBook.publishedDate = +book.volumeInfo.publishedDate || 0
				newBook.description = book.volumeInfo.description || ''
				newBook.thumbnail = book.volumeInfo.imageLinks?.thunmbnail || newBook.thumbnail
				return newBook
			})
			return Promise.resolve(newBooks)
		})
		.catch(err => Promise.reject(err))
}

function debounce(func, wait = 500) {
	let timeout
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout)
			func(...args)
		}

		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
	}
}

function get(googleId) {
	return storageService.get(GOOGLE_STORAGE_KEY, googleId)
}

function remove(googleId) {
	return storageService.remove(BOOK_KEY, googleId)
}

function save(google) {
	if (google.id) {
		return storageService.put(BOOK_KEY, google)
	} else {
		return storageService.post(BOOK_KEY, google)
	}
}

// function _createGoogleDemoData() {
// 	let books = utilService.loadFromStorage(GOOGLE_STORAGE_KEY)
// 	if (!books || !books.length) {
// 		utilService.saveToStorage(GOOGLE_STORAGE_KEY, googleDemoData)
// 	}
// }
