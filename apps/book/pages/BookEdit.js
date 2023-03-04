import { bookService } from '../services/book.service.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
	template: `
    <section class="book-edit">	
			
        <h2>Add a book</h2>
        <form @submit.prevent="save">
          <input type="text" v-model="book.title" placeholder="book title" name="title"/>
          <input type="text" v-model="book.subtitle" placeholder="book subtitle" name="subtitle"/>
					<textarea v-model="book.description" placeholder="book description" name="description" />
          <input type="text" v-model="authors" placeholder="book author">
					<div class=flex-row-container>
						<input type="number" v-model.number="book.listPrice.amount" placeholder="book price">
						<input type="number" v-model.number="book.pageCount" placeholder="book pages amount" >
					</div>					
					<div class="flex-row-container"> 
						<select v-model="book.listPrice.currencyCode"> 
							<option value="EUR">EUR</option>
							<option value="ILS">ILS</option>
							<option value="USD">USD</option>
						</select>
						<select v-model="book.language"> 
							<option value="en">English</option>
							<option value="he">Hebrew</option>
							<option value="sp">Spanish</option>
						</select>
					</div>
          <button type="submit" class="form-save">Save</button>
					<RouterLink to="/book" class="form-back">back</RouterLink>
        </form>
		
    </section>
  `,
	data() {
		return {
			book: bookService.getEmptyBook(),
			showModal: false,
			authors: '',
		}
	},
	created() {
		const { bookId } = this.$route.params
		if (!bookId) return
		bookService.get(bookId).then(book => {
			this.book = book
			this.authors = book.authors.join('')
		})
	},
	methods: {
		save() {
			this.book.authors = this.authors.split(',')

			bookService
				.save(this.book)
				.then(() => {
					showSuccessMsg('Book saved')
					this.$router.push('/books')
				})
				.catch(() => {
					showErrorMsg('Book Save Failed')
				})
		},
	},
}
