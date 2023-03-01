import selectType from './selectType.js'

export default {
  template: `
    <selectType @setType="setType"></selectType>
  
    `,
  data() {
    return {
      input: '',
    }
  },
  methods: {
    onSetFilter() {},
    setType(currType, type) {
      this.$emit('onSetFilter', type)
    },
  },

  components: {
    selectType,
  },
}
