export default {
  props: ['info'],
  template: `
  <!-- <template v-if="!isEdited"> -->
    <!-- <h1>{{info.title}}</h1> -->
  <!-- </template> -->
  

  <!-- <template v-if="isEdited"> -->
    <textarea v-model="info.title" class="edit-txt edit-title" @input="fitContent($event)"></textarea>
  <!-- </template> -->
  

  `,
  methods: {
    fitContent(ev) {
      ev.target.style.height = ev.target.scrollHeight + 'px'
      this.$emit('save', this.info.title)
    },
  },
}
