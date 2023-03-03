export default {
  props: ['isAdd', 'initType'],
  name: 'selectType',
  template: `
    <section class="selectType">
          <div @click="setType('NoteTxt')" class="fa txt" :class="{'active-type': types.NoteTxt}" title="Text"></div>
          <div @click="setType('NoteTodos')" class="fa list" :class="{'active-type': types.NoteTodos}" title="List"></div>
          <div @click="setType('NoteImg')" class="fa-regular image" :class="{'active-type': types.NoteImg}" title="Image"></div>
          <div @click="setType('NoteVideo')" class="fa video" :class="{'active-type': types.NoteVideo}" title="Video"></div>	
    </section>
  `,

  data() {
    return {
      types: {
        NoteTxt: false,
        NoteTodos: false,
        NoteImg: false,
        NoteVideo: false,
      },
      currType: this.initType,
    }
  },
  created() {
    // console.log('hi')t
    // if (!this.initType) return
    console.log(this.initType)
    console.log(this.isAdd)
    this.types[this.initType] = true
    console.log(this.types)
    // this.setType(this.initType)
  },
  methods: {
    setType(type) {
      this.types[type] = !this.types[type]
      if (this.isAdd) this.types[type] = !this.types[type]
      this.currType = type
      console.log(this.currType)

      this.$emit('setType', type)
    },
  },
}
