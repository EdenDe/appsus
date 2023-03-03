import { eventBus } from '../../../services/event-bus.service.js'
import EmailList from '../cmps/EmailList.js'
import { emailService } from '../services/Email.service.js'

export default {
	props: ['criteria'],
	name: 'EmailAll',
	template: `
    <section>
      <EmailList :mails="mails" v-if="mails" />
			<RouterView/>
    </section>  
  `,
	created() {
		this.getMails()
		eventBus.on('toggleStar', this.toggleStar)
		eventBus.on('removeMail', this.removeMail)
		eventBus.on('toggleRead', this.toggleRead)
	},
	data() {
		return {
			mails: null,
		}
	},
	watch: {
		criteria() {
			this.getMails()
		},
		mails() {
			eventBus.emit('countUnreadFilters')
		},
	},
	methods: {
		saveMail(mail) {
			emailService.save(mail).then(this.getMails).catch(console.log)
		},
		getMails() {
			emailService
				.query(this.criteria)
				.then(mails => {
					this.mails = mails
				})
				.catch(console.log)
		},
		toggleStar(mailId) {
			const mail = this.mails.find(mail => mail.id === mailId)
			if (!mail) return

			mail.isStared = !mail.isStared
			this.saveMail(mail)
		},
		removeMail(mailToDelete) {
			const mailIdx = this.mails.findIndex(mail => mail.id === mailToDelete.id)
			if (mailIdx === -1) return
			this.mails.splice(mailIdx, 1)

			if (mailToDelete.removedAt) {
				emailService.remove(mailToDelete.id).then(this.getMails).catch(console.log)
			} else {
				mailToDelete.removedAt = new Date()
				this.saveMail(mailToDelete)
			}
		},
		toggleRead(mailId) {
			const mail = this.mails.find(mail => mail.id === mailId)
			if (!mail) return

			mail.isRead = !mail.isRead
			this.saveMail(mail)
		},
	},
	components: {
		EmailList,
	},
}
