import EmailList from '../cmps/EmailList.js'
import { mailService } from '../services/Email.service.js'

export default {
	props: ['criteria'],
	template: `
    <section>
      <EmailList :mails="mails" v-if="mails"/>
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
	methods: {
		getMails() {
			mailService
				.query(this.criteria)
				.then(mails => {
					this.mails = mails
				})
				.catch(console.log)
		},
	},
	components: {
		EmailList,
	},
}
