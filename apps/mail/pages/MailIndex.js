import { mailService } from '../services/mail.service.js'

export default {
	template: `
  <section class="mail-index">
  <BookList
						:books="filteredBooks" 					
						@remove="remove"	      
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
	components: {},
}
