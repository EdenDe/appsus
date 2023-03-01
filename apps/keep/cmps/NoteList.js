import NotePreview from '../cmps/NotePreview.js'

export default {
  props: ['notes'],
  template: `
    <ul class="note-list">
        <li v-for="note in notes" :key="note.id" class="note-preview" 
        :style="{backgroundColor: note.style.backgroundColor}" >
          <NotePreview :note="note" @setBgColor="setBgColor"/>
					<RouterLink :to="'/note/'+note.id">...more</RouterLink> 
				
					<button @click="onRemove(note.id)" class="btn-remove" title="Delete">
            X
          </button>

					<RouterLink :to="'/note/edit/'+note.id">
            	Edit			
          </RouterLink>		
        </li>  
      </ul>
     
    `,
  methods: {
    onRemove(noteId) {
      this.$emit('remove', noteId)
    },
    setBgColor(color, noteId) {
      this.$emit('setBgColor', color, noteId)
    },
  },
  components: {
    NotePreview,
  },
}
