import RatingBar from './RatingBar.js'

export default {
	props: ['review'],
	template: `
        <span> {{review.fullname}} </span>
          <RatingBar :rating="review.rating" :enableChange="enableChange=false"/>
        <span> {{dateRelative}} </span>
    `,
	computed: {
		dateRelative() {
			const DAY_MILLISECONDS = 1000 * 60 * 60 * 24
			const daysDifference = Math.round(
				(new Date(this.review.readAt).getTime() - new Date().getTime()) / DAY_MILLISECONDS
			)
			return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(daysDifference, 'days')
		},
	},
	components: {
		RatingBar,
	},
}
