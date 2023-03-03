export default {
  props: ['filters', 'currType'],
  name: 'selectType',
  template: `
    <section class="selectType">
          <div @click="setType('NoteTxt')" class="fa txt tooltip" :class="{'active-type': types.NoteTxt}"><span>Text</span></div>
          <div @click="setType('NoteTodos')" class="fa list tooltip" :class="{'active-type': types.NoteTodos}"><span>List</span></div>
          <div @click="setType('NoteImg')" class="fa-regular image tooltip" :class="{'active-type': types.NoteImg}"><span>Image</span></div>
          <div @click="setType('NoteVideo')" class="fa video tooltip" :class="{'active-type': types.NoteVideo}"><span>Video</span></div>	
    </section>
  `,

  data() {
    return {
      types: {
        NoteTxt: this.filters ? this.filters['NoteTxt'] : false,
        NoteTodos: this.filters ? this.filters['NoteTodos'] : false,
        NoteImg: this.filters ? this.filters['NoteImg'] : false,
        NoteVideo: this.filters ? this.filters['NoteVideo'] : false,
      },
      activeType: this.currType,
    }
  },
  created() {
    this.types[this.currType] = true
  },
  methods: {
    setType(type) {
      this.types[type] = !this.types[type]
      if (!this.filters)
        this.types[this.activeType] = !this.types[this.activeType]
      this.activeType = type
      this.$emit('setType', type)
    },
  },
}
