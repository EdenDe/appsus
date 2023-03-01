import { mailService } from '../services/mail.service.js'
import MailList from '../cmps/MailList.js'
import MailFileFilter from '../cmps/MailFileFilter.js'
import MailSearchFilter from '../cmps/MailSearchFilter.js'
import MailCompose from '../cmps/MailCompose.js'

export default {
	template: `
  <section class="mail-index flex-column" >
		<header class="flex align-center justify-between hamburger-logo-container"> 
			<button class="fa bars circle-hover" @click="toggleIconOnly">	</button>
			<img src="../../../assets/img/gmail.jpg"/>
			<span>Email</span>
			<MailSearchFilter @setFilter="setFilter"/>
		</header>
		<main class="flex justify-between"> 
    <aside class="mail-options" :class="{'icons-only':iconsOnly}"> 
			<MailCompose />
      <MailFileFilter @setFilter="setFilter" />
    </aside>
		<template v-if="mails"> 
    <MailList
      :mails="mails" 						     
    />
		</template>
		</main>
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
		MailCompose,
	},
}
