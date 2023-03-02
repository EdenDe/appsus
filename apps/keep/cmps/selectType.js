export default {
  template: `
    <section class="selectType">
          <button @click="setType('NoteTxt')" class="fa txt" :class="{'active-type': type.NoteTxt}" title="Text"></button>
          <button @click="setType('NoteTodos')" class="fa list" :class="{'active-type': type.NoteTodos}" title="List"></button>
          <button @click="setType('NoteImg')" class="fa-regular image" :class="{'active-type': type.NoteImg}"title="Image"></button>
          <button @click="setType('NoteVideo')" class="fa video" :class="{'active-type': type.NoteVideo}" title="Video"></button>	
    </section>
  `,

  data() {
    return {
      type: {
        NoteTxt: true,
        NoteTodos: false,
        NoteImg: false,
        NoteVideo: false,
      },
      currType: 'NoteTxt',
    }
  },

  methods: {
    setType(type) {
      this.currType = type
      this.$emit('setType', type)
    },
  },
}
