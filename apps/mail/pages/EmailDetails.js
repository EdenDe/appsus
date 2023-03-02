import { mailService } from '../services/Email.service.js'

export default {
	template: `
	 <section v-if="mail" class="email-details-container">
		<div class="details-options">
			<RouterLink to="/mail" class="fa back"> </RouterLink>
			<button class="fa trash-can" @click="remove(mail.id)"></button>
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
			this.loadMail()
		},
	},
	methods: {
		remove(id) {
			console.log(id)
			this.$emit('remove', id)
		},
		loadMail() {
			mailService
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
			mailService.save(this.mail).catch(console.log)
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
