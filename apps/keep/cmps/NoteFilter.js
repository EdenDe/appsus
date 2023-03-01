export default {
  template: `
    
   
    `,
  data() {
    return {
      input: '',
    }
  },
  methods: {
    onSetFilter() {
      this.$emit('onSetFilter', this.input)
    },
  },
}
