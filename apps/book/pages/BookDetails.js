import LongTxt from '../../../cmps/LongTxt.js'
import AddReview from '../cmps/AddReview.js'
import Review from '../cmps/Review.js'
import { bookService } from '../services/book.service.js'

export default {
	template: `
	<template v-if="book">
		<nav class="book-details-nav flex align-center">
			<RouterLink to="/book" class="btn-back"> back</RouterLink>
			<RouterLink :to="'/book/'+ book.prevBookId">Previous</RouterLink> 
			<RouterLink :to="'/book/'+ book.nextBookId">Next</RouterLink>
		</nav>
    <section class="book-details" >
      <div :class="{'book-on-sale': book.listPrice.isOnSale }">
        <img :src="book.thumbnail"/>
      </div>
      <div> 
     		<h2>{{book.title}}</h2>
      	<h3 class="book-subtitle"> {{book.subtitle}}</h3>
      	<div> <LongTxt :txt="book.description"/> </div>
     		<div class="book-authors" v-if="book.authors.length>0">     
        	<h4>Authors</h4>
					{{authors}}
     		</div>    
        <div class="book-categories" v-if="book.categories.length>0">
          <h4>Categories</h4>
          {{categories}}
        </div>
        <p>The book consider to be {{publishedDateDescribed}} and {{pageCountDescribed}}</p>
        <p>Language: {{book.language}}</p>
        <p> Price: <span :class="priceColorClass">{{formattedCurrency}}</span></p>
      </div>
			<section class="reviews" >
				<AddReview :book="book" @addReview="addReview"/>
				<article v-for="review in book.reviews" :key="review.id" v-if="book.reviews" class="review">
					<Review :review="review"/>
					<button class="btn-remove fa trash-can" @click="removeReview(review.id)"> </button>
				</article>
			</section>
    </section>
	</template>
  `,
	data() {
		return {
			book: null,
		}
	},
	created() {
		console.log('bookId Changed!', this.$route.params)
		this.loadBook()
	},
	watch: {
		bookId() {
			console.log('bookId Changed!')
			this.loadBook()
		},
	},
	methods: {
		addReview(review) {
			bookService
				.addReview(this.book.id, review)
				.then(book => (this.book = book))
				.catch(console.log)
		},
		removeReview(reviewId) {
			bookService
				.removeReview(this.book.id, reviewId)
				.then(res => (this.book = res))
				.catch(console.log)
		},
		loadBook() {
			bookService
				.get(this.bookId)
				.then(book => (this.book = book))
				.catch(console.log)
		},
	},
	computed: {
		bookId() {
			return this.$route.params.bookId
		},
		pageCountDescribed() {
			let txt = 'Light'
			if (this.book.pageCount > 200) txt = 'Descent'
			else if (this.book.pageCount > 500) txt = 'Serious'
			return txt + ' Reading'
		},
		publishedDateDescribed() {
			if (new Date().getYear() - this.book.publishedDate > 10) return 'Vintage'
			return 'New'
		},
		priceColorClass() {
			if (this.book.listPrice.amount > 150) return 'red'
			else if (this.book.listPrice.amount < 20) return 'green'
		},
		formattedCurrency() {
			const { amount, currencyCode } = this.book.listPrice
			return new Intl.NumberFormat('en', {
				style: 'currency',
				currency: currencyCode,
				maximumSignificantDigits: 5,
			}).format(amount)
		},
		authors() {
			return this.book.authors.join(' || ')
		},
		categories() {
			return this.book.categories.join(' || ')
		},
	},
	components: {
		LongTxt,
		AddReview,
		Review,
	},
}
