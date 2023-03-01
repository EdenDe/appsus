import NotePreview from '../cmps/NotePreview.js'

export default {
  props: ['notes'],
  template: `
    <ul class="note-list">
        <li v-for="note in notes" :key="note.id" class="note-preview">
          <NotePreview :note="note"/>
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
  },
  components: {
    NotePreview,
  },
}
