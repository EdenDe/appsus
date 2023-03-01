import { mailService } from '../services/mail.service.js'

export default {
	template: `
	<template v-if="mail">
		<nav>
			<RouterLink to="/mail"> back</RouterLink>
		</nav>
    <section class="mail-details" >
     <h2>{{mail.subject}}</h2> 
     <div class="flex justify-between">
      <p>{{mail.from}}</p>
      <p>{{dateFormatted}}</p>
     </div>
     <p>{{mail.body}}</p>
    </section>
	</template>
  `,
	data() {
		return {
			mail: null,
		}
	},
	created() {
		this.loadMail()
	},
	watch: {
		mailId() {
			this.loadMail()
		},
	},
	methods: {
		loadMail() {
			mailService
				.get(this.mailId)
				.then(mail => (this.mail = mail))
				.catch(console.log)
		},
	},
	computed: {
		mailId() {
			return this.$route.params.mailId
		},
		dateFormatted() {
			const date = new Date(this.mail.sentAt)
			return new Intl.DateTimeFormat('en-He', {
				dateStyle: 'medium',
				timeStyle: 'short',
				hour12: true,
			}).format(date)
		},
	},
}
