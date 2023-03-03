export default {
  props: ['info'],
  template: `
    <p contenteditable="true" class="edit-txt edit-title" @input="onInput($event)">{{info.title}}</p>
  `,
  methods: {
    onInput(ev) {
      this.info.title = ev.target.innerText
      this.$emit('save', this.info.title)
    },
  },
}
