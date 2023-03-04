import { eventBus } from '../../../services/event-bus.service.js'
import { emailService } from '../services/email.service.js'

export default {
	props: ['iconsOnly'],
	template: `
      <ul class="mail-filter clean-list">
         <li v-for="filter,index in filterBy" 
						@click="setFilter(filter.filterName)" 
						class="flex align-center file-filter"
						:class="{'active-filter': filter.filterName === filters.status,
										'icons-only':iconsOnly}"
						:key="index"> 
				 		<span :class="icon(index)" class="flex align-center justify-center filter-icon"> </span>
				 		<span class="filter-file-name" >{{filter.filterName}}</span> 
						<span class="unread-number" v-show="filter.unreadCount!=0">{{filter.unreadCount}}</span> 
         </li>
      </ul>
  `,
	data() {
		return {
			filterBy: [
				{ filterName: 'inbox', unreadCount: 0 },
				{ filterName: 'starred', unreadCount: 0 },
				{ filterName: 'sent', unreadCount: 0 },
				{ filterName: 'draft', unreadCount: 0 },
				{ filterName: 'trash', unreadCount: 0 },
			],
			filters: { status: 'inbox', isRead: null, lables: [] },
			unreadUpdatesInterval: null,
		}
	},
	created() {
		this.unreadCount()
		eventBus.on('countUnreadFilters', this.unreadCount)
	},
	methods: {
		setFilter(filter) {
			this.filters.status = filter
			this.$emit('setFilter', this.filters)
		},
		unreadCount() {
			this.filterBy.forEach(filter => {
				emailService
					.query({ status: filter.filterName, isRead: false, isStared: null, txt: '' })
					.then(res => {
						filter.unreadCount = res.length
					})
			})
		},
	},
	computed: {
		icon() {
			return index => {
				const classNames = [
					'fa inbox',
					'fa-regular star',
					'fa sent',
					'fa-regular file',
					'fa trash-can',
				]
				return classNames[index]
			}
		},
	},
}
