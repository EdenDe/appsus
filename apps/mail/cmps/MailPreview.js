import LongTxt from '../../../cmps/LongTxt.js'
export default {
	props: ['mail'],
	template: ` 
    <p> {{mail.from}} </p>
    <p> {{mail.subject}} </p>
    <LongTxt :txt="mail.body"/>
    <p> {{dateRelative}} </p>
  `,

	computed: {
		dateRelative() {
			const date = new Date(this.mail.sentAt)
			if (date.getFullYear() < new Date().getFullYear()) {
				return date.getFullYear()
			} else if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
				return (
					date.getHours().toString().padStart(2, '0') +
					':' +
					date.getMinutes().toString().padStart(2, '0')
				)
			} else {
				return new Intl.DateTimeFormat('en-He', { month: 'short', day: 'numeric' }).format(date)
			}
		},
	},
	components: {
		LongTxt,
	},
}
