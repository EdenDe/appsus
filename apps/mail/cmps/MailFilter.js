export default {
	template: `
      <ul class="mail-filter clean-list">
         <li v-for="filter,index in filterBy" :class="icon(index)" @click="setFilter(filter)" :key="index"> 
            {{filter}}
         </li>
      </ul>
  `,
	data() {
		return {
			filterBy: ['inbox', 'starred', 'sent', 'draft', 'trash'],

			// filterBy: [
			// 	{ filterName: 'inbox', unreadCount: 0 },
			// 	{ filterName: 'starred', unreadCount: 0 },
			// 	{ filterName: 'sent', unreadCount: 0 },
			// 	{ filterName: 'draft', unreadCount: 0 },
			// 	{ filterName: 'trash', unreadCount: 0 },
			// ],
		}
	},
	methods: {
		setFilter(filterBy) {
			console.log(filterBy)
			this.filterBy = filterBy
			this.$emit('setFilter', this.filterBy)
		},
	},
	// watch: {
	// 	filterBy: {
	// 		handler() {
	// 			this.$emit('filter', filterBy)
	// 		},
	// 		//deep: true,
	// 	},
	// },
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
