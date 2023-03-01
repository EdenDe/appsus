import NotePreview from '../cmps/NotePreview.js'
import NoteActions from '../cmps/NoteActions.js'

export default {
  props: ['notes'],
  template: `
    <ul class="note-list">
        <li v-for="note in notes" :key="note.id" class="note-preview" 
        :style="{backgroundColor: note.style.backgroundColor}" >
          <NotePreview :note="note"/>
					<RouterLink :to="'/note/'+note.id">...more</RouterLink> 
          <noteActions :note="note" @setBgColor="setBgColor"></noteActions>
	        
        </li>  
      </ul>
     
    `,

  methods: {
    onRemove(noteId) {
      this.$emit('remove', noteId)
    },
    toggleChoseColor() {
      this.isChoseColor = !this.isChoseColor
    },
    setBgColor(color, noteId) {
      this.$emit('setBgColor', color, noteId)
    },
  },
  components: {
    NotePreview,
    NoteActions,
  },
}
