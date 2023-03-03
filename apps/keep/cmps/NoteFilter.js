import { utilService } from '../../../services/util.service.js'
import selectType from './SelectType.js'

export default {
	name: 'noteFilter',
	template: `
    <selectType :filters="filters"  @setType="onSetFilters"></selectType>
  
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
		selectType,
	},
}
