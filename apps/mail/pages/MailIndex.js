import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'
import MailFileFilter from '../cmps/MailFileFilter.js'
import MailSearchFilter from '../cmps/MailSearchFilter.js'

export default {
	template: `
  <section class="mail-index" >
		<div class="flex justify-between hamburger-logo-container"> 
			<button class="fa bars circle-hover" @click="toggleIconOnly">	</button>
			<img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"/>
		</div>
	
	
		<MailSearchFilter @setFilter="setFilter"/>
    <aside class="mail-options"> 
      <MailFileFilter @setFilter="setFilter" :iconsOnly="iconsOnly"/>
    </aside>
		<template v-if="mails"> 
    <MailList
      :mails="mails" 						     
    />
		</template>
  </section>
    `,
	data() {
		return {
			mails: null,
			criteria: {
				status: 'inbox',
				txt: '',
				isRead: null,
				isStared: null,
				lables: [],
			},
			iconsOnly: false,
		}
	},
	created() {
		this.getMails()
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
		setFilter(filters) {
			debugger
			for (let filter in filters) {
				this.criteria[filter] = filters[filter]
			}

			this.getMails()
		},
		toggleIconOnly() {
			this.iconsOnly = !this.iconsOnly
		},
	},
	components: {
		MailList,
		MailSearchFilter,
		MailFileFilter,
	},
}
