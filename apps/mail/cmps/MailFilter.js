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
			// 	filterBy: ['inbox', 'starred', 'sent', 'draft', 'trash'],
			//   filterBy: {{filterName:'inbox',
			// }, 'starred', 'sent', 'draft', 'trash'},
		}
	},
	methods: {
		setFilter(filterBy) {
			this.$emit('filter', filterBy)
		},
	},
	watch: {
		filterBy: {
			handler() {
				console.log('filterBy changed', this.filterBy)
				this.$emit('filter', this.filterBy)
			},
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
