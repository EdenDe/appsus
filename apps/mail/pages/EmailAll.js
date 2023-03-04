import { eventBus } from '../../../services/event-bus.service.js'
import { emailService } from '../services/email.service.js'

import EmailList from '../cmps/EmailList.js'
import EmptyMailList from '../cmps/EmptyMailList.js'

export default {
	name: 'EmailAll',
	template: `
	<section v-if="mails" class="email-all"> 
			<section class="filter-sort-btns">
				<button class="fa filter circle-hover tooltip" @click="showFilterOptions=!showFilterOptions">
					<span>filter</span>
					<ul class="filter-options clean-list" :class="{'show-list':showFilterOptions}">
							<li @click="onChangeFilterAll()">All</li>
							<li @click="onChangeFilterRead(true)">Read</li>
							<li @click="onChangeFilterRead(false)">Unread</li>
							<li @click="onChangeFilterStared(true)">Starred</li>
							<li @click="onChangeFilterStared(false)">Unstarred</li>
					</ul>
				</button>
				<button class="fa sort circle-hover tooltip" @click="showSortOptions=!showSortOptions">
					<span>sort</span>
					<ul class="sort-options clean-list" :class="{'show-list':showSortOptions}">
						<li @click="sortBy='Date'">Date</li>
						<li @click="sortBy='Title'">Title</li>
					</ul>
				</button>
			</section>
      <EmailList :mails="mails" v-if="mails.length > 0" />
			<EmptyMailList v-else/>
			<RouterView/>
	</section>
  `,
	created() {
		this.getMails()
		eventBus.on('toggleStar', this.toggleStar)
		eventBus.on('removeMail', this.removeMail)
		eventBus.on('toggleRead', this.toggleRead)
		eventBus.on('setFilter', this.setFilter)
	},
	data() {
		return {
			mails: null,
			showFilterOptions: false,
			showSortOptions: false,
			criteria: {
				status: 'inbox',
				search: {},
				isRead: null,
				isStared: null,
				lables: [],
			},
			sortBy: 'Date',
		}
	},
	watch: {
		criteria: {
			handler() {
				this.getMails()
			},
			deep: true,
		},
		sortBy() {
			emailService.setSort(this.sortBy)
			this.getMails()
		},
		mails() {
			eventBus.emit('countUnreadFilters')
		},
	},
	methods: {
		setFilter(filters) {
			for (let filter in filters) {
				this.criteria[filter] = filters[filter]
			}
			this.criteria = { ...this.criteria }
		},
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
		onChangeFilterRead(value) {
			this.setFilter({
				isRead: value,
				isStared: null,
			})
		},
		onChangeFilterStared(value) {
			this.setFilter({
				isRead: null,
				isStared: value,
			})
		},
		onChangeFilterAll() {
			this.setFilter({
				isRead: null,
				isStared: null,
			})
		},
	},
	components: {
		EmailList,
		EmptyMailList,
	},
}
