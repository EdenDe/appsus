import { noteService } from '../services/note.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'
import addNote from '../cmps/addNote.js'

import {
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'

export default {
  template: `
    
      <section class="note-index">

        <NoteFilter @onSetFilter="onSetFilterBy" />
        <RouterLink to="/note/edit" class="btn-new-note">Add Note</RouterLink>
        <NoteList 
        :notes="filteredNotes"
        v-if="notes"
        @remove="remove"
        />
      </section>
    `,
  data() {
    return {
      notes: null,
      filterBy: {
        title: '',
        type: '',
        createdAt: Date.now(),
      },
    }
  },
  created() {
    noteService
      .query()
      .then((notes) => (this.notes = notes))
      .catch(console.log)
  },
  computed: {
    filteredNotes() {
      let title = new RegExp(this.filterBy.title, 'i')

      return this.notes.filter((note) => title.test(note.title))
    },
  },
  methods: {
    remove(noteId) {
      noteService
        .remove(noteId)
        .then((notes) => {
          const idx = this.notes.findIndex((note) => note.id === noteId)
          this.notes.splice(idx, 1)
          showSuccessMsg('Note deleted')
        })
        .catch((err) => {
          showErrorMsg('Note remove failed')
        })
    },
    savedNote(note) {
      this.notes.push(note)
    },
    onSetFilterBy(filterBy) {
      this.filterBy = filterBy
    },
  },
  components: {
    NoteFilter,
    NoteList,
    addNote,
  },
}
