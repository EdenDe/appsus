import { utilService } from '../../../services/util.service.js'
import selectType from './selectType.js'

export default {
  name: 'noteFilter',
  template: `
    <selectType :isAdd="false" @setType="onSetFilters"></selectType>
  
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
      res = res === 'true' || !res ? true : false
      return res
    },
  },

  components: {
    selectType,
  },
}
