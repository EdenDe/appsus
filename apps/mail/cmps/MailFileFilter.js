export default {
	props: ['iconsOnly'],
	template: `
      <ul class="mail-filter clean-list">
         <li v-for="filter,index in filterBy" 
						@click="setFilter(filter)" 
						class="flex align-center file-filter"
						:class="{'active-filter': filter === filters.status,
										'icons-only':iconsOnly}"
						:key="index"> 
				 		<span :class="icon(index)" class="flex align-center justify-center filter-icon"> </span>
				 		<span class="filter-file-name" >{{filter}}</span> 
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
			this.filters.status = filter
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
