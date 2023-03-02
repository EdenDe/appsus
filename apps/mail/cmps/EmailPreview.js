import LongTxt from '../../../cmps/LongTxt.js'
export default {
	props: ['mail'],
	template: ` 
  <article :class="{'mail-preview':true,'unread-mail':!mail.isRead}">
    <p> {{mail.from}} </p>
    <p> {{mail.subject}} </p>
		<p> {{mail.body}} </p>
    <p> {{dateFormatted}} </p>
  </article>
  `,

	computed: {
		dateFormatted() {
			const date = new Date(this.mail.sentAt)
			if (date.getFullYear() < new Date().getFullYear()) {
				return date.getFullYear()
			} else if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
				return new Intl.DateTimeFormat('en-He', { timeStyle: 'short', hour12: true }).format(date)
			} else {
				return new Intl.DateTimeFormat('en-He', { month: 'short', day: 'numeric' }).format(date)
			}
		},
	},
	components: {
		LongTxt,
	},
}
