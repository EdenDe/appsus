import selectType from './selectType.js'

export default {
  template: `
    <selectType @setType="onSetFilters"></selectType>
  
    `,
  data() {
    return {
      filters: [
        // 'NoteTxt',
        // 'NoteTodos',
        // 'NoteImg',
        // 'NoteVideo',
        { NoteTxt: false },
        { NoteTodos: false },
        { NoteImg: false },
        { NoteVideo: false },
      ],
    }
  },
  methods: {
    onSetFilters(type) {
      for (let idx in this.filters) {
        if (Object.keys(this.filters[idx]).toString() !== type) continue
        this.filters[idx][type] = !this.filters[idx][type]
      }
      this.$emit('onSetFilter', this.filters)
    },
  },

  components: {
    selectType,
  },
}
