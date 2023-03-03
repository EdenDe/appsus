export default {
  props: ['info'],
  template: `
  <!-- <template v-if="!isEdited"> -->
    <!-- <h1>{{info.title}}</h1> -->
  <!-- </template> -->
  

  <!-- <template v-if="isEdited"> -->
    <p contenteditable="true" class="edit-txt edit-title" @input="onInput($event)">{{info.title}}</p>
  <!-- </template> -->
  

  `,
  methods: {
    onInput(ev) {
      this.info.title = ev.target.innerText
      this.$emit('save', this.info.title)
    },
  },
}
