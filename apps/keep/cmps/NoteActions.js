export default {
  props: ['note'],
  template: `
    <section class="note-actions">
     
      <button @click="toggleChoseColor" class="fa palette"></button>
      <div v-if="isChoseColor" class="pick-color">
        
        <button class="btn-pick-color btn-red" @click="setBgColor('#e6c9a8', note.id)"></button>
        <button class="btn-pick-color btn-pink" @click="setBgColor('#fdcfe8', note.id)"></button>
        <button class="btn-pick-color btn-purple" @click="setBgColor('#d7aefb', note.id)"></button>
        <button class="btn-pick-color btn-blue" @click="setBgColor('#aecbfa', note.id)"></button>
        <button class="btn-pick-color btn-green" @click="setBgColor('#ccff90', note.id)"></button>
      </div>
      <RouterLink :to="'/note/edit/'+note.id" class="fa pencil"></RouterLink>		
      <button @click="onCopy(note)" class="fa-regular copy"></button>
        <button @click="onRemove(note.id)" class="btn-remove fa trash-can" title="Delete">
        </button>
    </section>
  `,
  data() {
    return {
      isChoseColor: false,
    }
  },
  methods: {
    // pinNote(note) {
    //   this.$emit('pin', note)
    // },
    onCopy(note) {
      this.$emit('copy', note)
    },
    onRemove(noteId) {
      this.$emit('remove', noteId)
    },
    toggleChoseColor() {
      this.isChoseColor = !this.isChoseColor
    },
    setBgColor(color, noteId) {
      this.toggleChoseColor()
      this.$emit('setBgColor', color, noteId)
    },
  },
  computed: {},
}
