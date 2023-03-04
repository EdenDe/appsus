import { utilService } from '../../../services/util.service.js'
import SelectType from './SelectType.js'

export default {
	name: 'noteFilter',
	template: `
    <SelectType :filters="filters"  @setType="onSetFilters"/>
  
    `,
	data() {
		return {
			filters: {
				NoteTxt: this.fixQueryParams('NoteTxt'),
				NoteTodos: this.fixQueryParams('NoteTodos'),
				NoteImg: this.fixQueryParams('NoteImg'),
				NoteVideo: this.fixQueryParams('NoteVideo'),
			},
		}
	},
	methods: {
		onSetFilters(type) {
			this.filters[type] = !this.filters[type]
			this.$emit('onSetFilter', this.filters)
		},
		fixQueryParams(val) {
			let res = utilService.getValFromParam(val)
			res = !res || res === 'true' ? true : false
			return res
		},
	},

	components: {
		SelectType,
	},
}
