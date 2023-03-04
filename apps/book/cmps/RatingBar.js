export default {
	props: ['rating', 'enableChange'],
	template: `
      <ul class="customRatingBarStyle" >
        <li v-for="rate in maxRating" @click="setRating(rate)" class="star">
            <img :src="rate <= rating? starImgFilled : startImgCorner" class="starImgStyle">
        </li>
      </ul>
    `,
	data() {
		return {
			maxRating: [1, 2, 3, 4, 5],
			starImgFilled: 'https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png',
			startImgCorner: 'https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png',
		}
	},
	methods: {
		setRating(rate) {
			if (!this.enableChange) return
			this.$emit('onRate', rate)
		},
	},
}

export const RateByTextbox = {
	template: `
	<input class="rate-by-text" 
		type="number"
		placeholder="rate between 1 to 5"
		v-model.number="txt"
		min="1"
		max="5"
		@input="setRating"/>
`,
	data() {
		return {
			txt: null,
		}
	},
	methods: {
		setRating() {
			this.$emit('onRate', this.txt)
		},
	},
}

export const RateBySelect = {
	template: `
	<section class="rate-by-select">
		<select v-model="rating" @change="setRating">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
		</select>
	</section>`,
	data() {
		return {
			rating: 5,
		}
	},
	methods: {
		setRating() {
			this.$emit('onRate', this.rating)
		},
	},
}
