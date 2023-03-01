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
          
          <input type="text" v-model="input" :placeholder="setPlaceHolder" name="title" />
          <button type="submit" class="form-save">Save</button>
          </form>
          <p @click="setType('NoteTxt')" class="fa txt" :class="{'active-type': type.NoteTxt}" title="Text"></p>
          <p @click="setType('NoteTodos')" class="fa list" :class="{'active-type': type.NoteTodos}" title="List"></p>
          <p @click="setType('NoteImg')" class="fa-regular image" :class="{'active-type': type.NoteImg}"title="Image"></p>
          <p @click="setType('NoteVideo')" class="fa video" :class="{'active-type': type.NoteVideo}" title="Video"></p>
     
					<RouterLink to="/note" class="form-back">back</RouterLink>
        
		
    </section>
  `,

  data() {
    return {
      note: noteService.getEmptyNote(this.currType),
      showModal: false,
      type: {
        NoteTxt: true,
        NoteTodos: false,
        NoteImg: false,
        NoteVideo: false,
      },
      currType: 'NoteTxt',
      input: '',
    }
  },
  created() {
    const { noteId } = this.$route.params

    if (!noteId) return

    noteService.get(noteId).then((note) => {
      this.note = note
      this.setType(note.type)
    })
  },
  methods: {
    save() {
      this.setInfo()
      console.log(this.note)

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
    setInfo() {
      if (this.currType === 'NoteImg' || this.currType === 'NoteVideo') {
        this.note.info.url = this.input
      }
      if (this.currType === 'NoteTodos') {
        this.note.info.todos = []
        this.input.split(',').map((todo, idx) => {
          this.note.info.todos[idx] = { txt: todo, doneAt: null }
        })
      }
    },
    setType(type) {
      if (type === this.currType) return

      this.type[this.currType] = false
      this.type[type] = true

      this.currType = type
      this.note.type = type
    },
  },
  computed: {
    setPlaceHolder() {
      if (this.currType === 'NoteTodos') return 'Enter comma separated list'
      if (this.currType === 'NoteTxt') return "What's on your mind?"
      return 'Enter URL...'
    },
  },
}
