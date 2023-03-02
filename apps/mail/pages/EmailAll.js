import EmailList from '../cmps/EmailList.js'
import { mailService } from '../services/Email.service.js'

export default {
	props: ['criteria'],
	template: `
    <section>
      <EmailList :mails="mails" v-if="mails" @toggleStar="toggleStar"/>
    </section>  
  `,
	created() {
		this.getMails()
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
	},
	methods: {
		getMails() {
			mailService
				.query(this.criteria)
				.then(mails => {
					this.mails = mails
				})
				.catch(console.log)
		},
		toggleStar(mailId) {
			mailService
				.get(mailId)
				.then(mail => {
					mail.isStared = !mail.isStared
					mailService.save(mail).then(this.getMails).catch(console.log)
				})
				.catch(console.log)
		},
	},
	components: {
		EmailList,
	},
}
