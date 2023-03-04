import { bookService } from '../services/book.service.js'
import Loader from '../../../cmps/Loader.js'
import BookList from '../cmps/BookList.js'
import BookFilter from '../cmps/BookFilter.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
	template: `
      <section class="book-index">
					<BookFilter @onSetFilter="onSetFilterBy" />
					<template v-if="books"> 
					<RouterLink to="/book/add" class="btn-new-book">Add new book</RouterLink>
					<BookList
						:books="filteredBooks" 					
						@remove="remove"	      
					/>
					</template>
					<Loader v-else/>
      </section>
  `,
	data() {
		return {
			books: null,
			filterBy: {
				amount: 0,
			},
		}
	},
	created() {
		bookService
			.query()
			.then(books => {
				this.books = books
			})
			.catch(console.log)
	},
	computed: {
		filteredBooks() {
			let regex = new RegExp(this.filterBy.title, 'i')
			return this.books.filter(
				book => regex.test(book.title) && book.listPrice.amount > this.filterBy.amount
			)
		},
	},
	methods: {
		remove(bookId) {
			bookService
				.remove(bookId)
				.then(books => {
					//FIXME
					//eventBusService.emit('show-msg', { txt: 'Book Removed', type: 'success' })
					this.books = books
				})
				.catch(err => {
					//FIXME
					//eventBusService.emit('show-msg', { txt: 'Book Removed Failed', type: 'error' })
				})
		},
		savedBook(book) {
			this.books.push(book)
		},
		onSetFilterBy(filterBy) {
			this.filterBy = filterBy
		},
	},
	components: {
		BookList,
		BookFilter,
		Loader,
	},
}
