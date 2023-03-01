import { noteService } from '../services/note.service.js'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'

export default {
  template: `
    <section class="note-edit">	
			
        <h2>Add a note</h2>
        <form @submit.prevent="save">
          <input type="text" v-model="note.info.txt" placeholder="note title" name="title"/>
     
          <button type="submit" class="form-save">Save</button>
					<RouterLink to="/note" class="form-back">back</RouterLink>
        </form>
		
    </section>
  `,
  data() {
    return {
      note: noteService.getEmptyNote(),
      showModal: false,
    }
  },
  created() {
    const { noteId } = this.$route.params
    if (!noteId) return
    noteService.get(noteId).then((note) => {
      this.note = note
      console.log(this.note)
    })
  },
  methods: {
    save() {
      noteService
        .save(this.note)
        .then((note) => {
          showSuccessMsg('note saved')
          this.$router.push('/note')
        })
        .catch((err) => {
          showErrorMsg('Note Save Failed')
        })
    },
  },
}
