import LongTxt from '../../../cmps/LongTxt.js'
export default {
	props: ['mail'],
	template: ` 
  <article :class="{'mail-preview':true,'unread-mail':!mail.isRead}">
		<button :class="starIcon" class="btn-star circle-hover" @click.prevent="setStar"></button>
    <p> {{mail.from}} </p>
    <p> {{mail.subject}} </p>
		<p class="mail-body"> {{mail.body}} </p>
    <p> {{dateFormatted}} </p>
  </article>
  `,
	data() {
		return {
			isStar: this.mail.isStared,
		}
	},
	methods: {
		setStar() {
			this.isStar = !this.isStar
			this.$emit('setToggleStar', this.mail.id)
		},
	},
	computed: {
		dateFormatted() {
			if (!this.mail.sentAt) return ''
			const date = new Date(this.mail.sentAt)

			if (date.getFullYear() < new Date().getFullYear()) {
				return date.getFullYear()
			} else if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
				return new Intl.DateTimeFormat('en-He', { timeStyle: 'short', hour12: true }).format(date)
			} else {
				return new Intl.DateTimeFormat('en-He', { month: 'short', day: 'numeric' }).format(date)
			}
		},
		starIcon() {
			return this.isStar ? 'fa filledStar' : 'fa-regular star'
		},
	},

	components: {
		LongTxt,
	},
}
