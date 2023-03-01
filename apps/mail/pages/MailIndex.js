import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'

export default {
	template: `
  <section class="mail-index">
    <aside class="mail-options"> 
      <MailFilter @setFilter="setFilter"/>
    </aside>
    <MailList
      :mails="mails" 						     
    />
  </section>
    `,
	data() {
		return {
			mails: null,
			filterBy: {},
		}
	},
	created() {
		mailService
			.query()
			.then(mails => {
				this.mails = mails
			})
			.catch(console.log)
	},
	methods: {
		countMails() {
			mails.forEach(mail => {
				if (!mail.isRead) {
					this.filterBy.inbox++
				}
			})
		},
		setFilter(filterBy) {
			this.filterBy = filterBy
		},
		computed: {
			filteredMail() {
				console.log(this.mails)
				return this.mails
			},
		},
	},
	components: {
		MailList,
		MailFilter,
	},
}
