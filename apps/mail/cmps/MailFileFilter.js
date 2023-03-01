export default {
	props: ['iconsOnly'],
	template: `
      <ul class="mail-filter clean-list">
         <li v-for="filter,index in filterBy" :class="icon(index)" @click="setFilter(filter)" :key="index"> 
           	<span v-show="!iconsOnly">{{filter}}</span> 
         </li>
      </ul>
  `,
	data() {
		return {
			filterBy: ['inbox', 'starred', 'sent', 'draft', 'trash'],
			filters: { status: 'inbox', isRead: null, isStared: null, lables: [] },
		}
	},
	methods: {
		setFilter(filter) {
			this.filters.status = filter === 'starred' ? 'inbox' : filter
			this.filters.isStared = filter === 'starred' ? true : false

			this.$emit('setFilter', this.filters)
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
