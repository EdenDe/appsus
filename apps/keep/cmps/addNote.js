import { noteService } from '../services/note.service.js'
import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'

import selectType from './selectType.js'

export default {
  template: `
    <section @submit.prevent="save" class="note-edit">	
      <h2>Add a note</h2>
      <form @keyup.enter="onSave">
        <div> 
          <input type="text" v-model="input" :placeholder="setPlaceHolder" name="title" />
            <selectType :isAdd="true" @setType="setType"></selectType>
        </div>
        <div class="form-btns flex align-center justify-between"> 
          <RouterLink to="/note" class="form-back">Close</RouterLink>
          <button @click.prevent="onSave" type="submit" class="form-save">Save</button>
        </div>
      </form>
    </section>
    <div class="screen"></div> 
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
      console.log(note)
      this.input = this.setTodosInput(note) || note.info.url || note.info.title
      this.setType(note.type)
    })
  },
  methods: {
    onSave() {
      this.setInfo()
      this.$router.push('/note')
      this.$emit('save', this.note)
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
      this.note.info.title = this.input
    },
    setTodosInput(note) {
      if (!note.info.todos) return
      return note.info.todos.map((todo, idx) => {
        return this.note.info.todos[idx].txt
      })
    },

    setType(type) {
      if (type === this.currType) return

      this.type[this.currType] = false
      this.type[type] = true

      this.currType = type
    },
  },
  computed: {
    setPlaceHolder() {
      if (this.currType === 'NoteTodos') return 'Enter comma separated list'
      if (this.currType === 'NoteTxt') return "What's on your mind?"
      return 'Enter URL...'
    },
  },
  components: {
    selectType,
  },
}
