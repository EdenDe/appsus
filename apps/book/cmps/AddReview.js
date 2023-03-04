import RatingBar, { RateByTextbox, RateBySelect } from './RatingBar.js'

export default {
	props: ['book'],
	template: `
    <section class="book-review"> 
   	  <h3>Add your review</h3>
      <form @submit.prevent="save"> 
        <input type="text" placeholder="insert your full name" v-model="fullname"/>
				<input type="date" v-model="readAt" />
				<fieldset>
					<legend>Choose how to rate the book</legend>
					<div>
					<input v-model="typeOfCmp" type="radio" id="star" name="rate" value="RatingBar" checked>     
					<label for="star">rate by star</label>
					</div>
					<div>
					<input v-model="typeOfCmp" type="radio" id="text" name="rate" value="RateByTextbox">
					<label for="text">rate by text</label>
					</div>
					<div>
					<input v-model="typeOfCmp" type="radio" id="select" name="rate" value="RateBySelect">
					<label for="select">rate by select</label>
					</div>
				</fieldset>
				<Component 
					:is="typeOfCmp"
					:rating="rating"
					:enableChange="true"
					@onRate="onRate"
				/>
				<button>save review</button>
  	  </form>
  </section>
  `,

	data() {
		return {
			fullname: '',
			rating: 3,
			readAt: new Date(),
			typeOfCmp: 'RatingBar',
		}
	},
	methods: {
		save() {
			this.$emit('addReview', {
				fullname: this.fullname,
				rating: this.rating,
				readAt: this.readAt,
			})
		},
		onRate(rate) {
			this.rating = rate
		},
	},
	created() {
		this.readAt = [
			new Date(this.readAt).getFullYear(),
			(new Date(this.readAt).getMonth() + 1).toString().padStart(2, '0'),
			new Date(this.readAt).getDate().toString().padStart(2, '0'),
		].join('-')
	},
	components: {
		RatingBar,
		RateByTextbox,
		RateBySelect,
	},
}
