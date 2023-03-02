import { emailService } from '../services/Email.service.js'

export default {
	template: `
	 <section v-if="mail" class="email-details-container">
		<div class="details-options">
			<RouterLink to="/mail" class="fa back circle-hover flex align-center justify-center"> </RouterLink>
			<button class="fa trash-can circle-hover flex align-center justify-center" @click="remove"></button>
		</div>
    <section class="email-details" >
     <h2>{{mail.subject}}</h2> 
     <div class="flex justify-between">
      <p>{{mail.from}}</p>
      <p>{{dateFormatted}}</p>
     </div>
     <p>{{mail.body}}</p>
    </section>
	 </section> 
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
			if (!this.mailId) return
			this.loadMail()
		},
	},
	methods: {
		remove() {
			if (this.mail.removedAt) {
				emailService.remove(this.mailId).then(this.back).catch(console.log)
			} else {
				this.mail.removedAt = Date.now()
				emailService.save(this.mail).then(this.back).catch(console.log)
			}
		},
		back() {
			this.$router.push('/mail')
		},
		loadMail() {
			emailService
				.get(this.mailId)
				.then(mail => {
					this.mail = mail
					if (!mail.isRead) {
						this.mail.isRead = true
						this.updateToRead()
					}
				})
				.catch(console.log)
		},
		updateToRead() {
			emailService.save(this.mail).catch(console.log)
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
