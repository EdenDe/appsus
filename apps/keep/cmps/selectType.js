export default {
  props: ['isAdd'],
  template: `
    <section class="selectType">
          <div @click.stop="setType('NoteTxt')" class="fa txt" :class="{'active-type': type.NoteTxt}" title="Text"></div>
          <div @click.stop="setType('NoteTodos')" class="fa list" :class="{'active-type': type.NoteTodos}" title="List"></div>
          <div @click.stop="setType('NoteImg')" class="fa-regular image" :class="{'active-type': type.NoteImg}" title="Image"></div>
          <div @click.stop="setType('NoteVideo')" class="fa video" :class="{'active-type': type.NoteVideo}" title="Video"></div>	
    </section>
  `,

  data() {
    return {
      type: {
        NoteTxt: true,
        NoteTodos: this.isAdd ? false : true,
        NoteImg: this.isAdd ? false : true,
        NoteVideo: this.isAdd ? false : true,
      },
      currType: 'NoteTxt',
    }
  },

  methods: {
    setType(type) {
      this.type[type] = !this.type[type]
      if (this.isAdd) this.type[this.currType] = !this.type[this.currType]
      this.currType = type
      this.$emit('setType', type)
    },
  },
}
