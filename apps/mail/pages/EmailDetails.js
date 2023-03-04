import { eventBus } from '../../../services/event-bus.service.js'
import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/email.service.js'

export default {
	name: 'EmailDetails',
	template: `
	 <section v-if="mail" class="email-details-container">
		<div class="details-options">
			<RouterLink to="/mail" class="fa back circle-hover flex align-center justify-center tooltip">
				<span>Back</span>
			</RouterLink>
			<button class="fa trash-can circle-hover flex align-center justify-center tooltip" @click="remove">
				<span>Ramove</span>
			</button>
			<div> 
				<button :class="starIcon" @click="toggleStar" class="circle-hover tooltip">
					<span> {{mail.isStared? 'Starred' : 'Not starred'}}</span>
				</button>		
				<button @click="saveAsNote" class="fa-regular file circle-hover tooltip"> 
					<span>Save as Note</span>
				</button>
			</div>
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
						this.updateMail()
					}
				})
				.catch(console.log)
		},
		updateMail() {
			emailService.save(this.mail).catch(console.log)
		},
		saveAsNote() {
			utilService.setQueryParams({ title: this.mail.body })
			this.$router.push('/note/edit')
		},
		toggleStar() {
			this.mail.isStared = !this.mail.isStared
			this.updateMail()
		},
	},
	computed: {
		mailId() {
			return this.$route.params.mailId
		},
		dateFormatted() {
			if (!this.mail.sentAt) return ''
			const date = new Date()
			return new Intl.DateTimeFormat('en-He', {
				dateStyle: 'medium',
				timeStyle: 'short',
				hour12: true,
			}).format(date)
		},
		starIcon() {
			return this.mail.isStared ? 'fa filledStar' : 'fa-regular star'
		},
	},
}
