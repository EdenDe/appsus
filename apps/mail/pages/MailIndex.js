import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'
import MailFilter from '../cmps/MailFilter.js'

export default {
	template: `
  <section class="mail-index" v-if="mails">
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
			criteria: {
				status: 'inbox',
				txt: '',
				isRead: false,
				isStared: false,
				lables: [],
			},
		}
	},
	created() {
		this.getMails()
	},
	methods: {
		// countMails() {
		// 	mails.forEach(mail => {
		// 		if (!mail.isRead) {
		// 			this.filterBy.inbox++
		// 		}
		// 	})
		// },
		getMails() {
			mailService
				.query(this.criteria)
				.then(mails => {
					this.mails = mails
				})
				.catch(console.log)
		},
		setFilter(filterBy) {
			debugger
			console.log(filterBy)
			if (filterBy === 'starred') {
				this.criteria.isStared = true
				this.criteria.status = 'inbox'
			}
			this.criteria.status = filterBy
			this.getMails()
		},
	},
	components: {
		MailList,
		MailFilter,
	},
}
