import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'

export default {
	template: `
  <section class="mail-index">
  <MailList
		:mails="mails" 						     
	/>

  </section>
    `,
	data() {
		return {
			mails: null,
		}
	},
	created() {
		mailService
			.query()
			.then(mails => {
				console.log(mails)
				this.mails = mails
			})
			.catch(console.log)
	},
	components: {
		MailList,
	},
}
