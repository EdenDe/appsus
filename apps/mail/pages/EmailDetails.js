import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/Email.service.js'

export default {
	name: 'EmailDetails',
	template: `
	 <section v-if="mail" class="email-details-container">
		<div class="details-options">
			<RouterLink to="/mail" class="fa back circle-hover flex align-center justify-center" title="back"> </RouterLink>
			<button class="fa trash-can circle-hover flex align-center justify-center" @click="remove" title="ramove"></button>
			<button class="fa filledStar" @click="toggleStar"> </button>
			<button @click="saveAsNote" class="fa-regular file circle-hover" title="Save as Note"> </button>
		</div>
    <section class="email-details" >
     <h2>{{mail.subject}}</h2> 
     <div class="flex justify-between">
      <p>{{mail.from}}</p>
      <p>{{dateFormatted}}</p>
     </div>
     <p class="email-body">{{mail.body}}</p>
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
		saveAsNote() {
			utilService.setQueryParams({ title: this.mail.body })
			//this.$router.push('/note/edit')
			this.$router.push('/note/edit')
		},
		toggleStar() {
			//TODO: toggle star using event bus maybe?
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
