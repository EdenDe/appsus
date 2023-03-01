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
          <input v-model="searchKey" type="search" placeholder="Search"/>
        <NoteFilter @onSetFilter="onSetFilterBy" />
        <RouterLink to="/note/edit" class="btn-new-note">Add Note</RouterLink>
        <NoteList 
        :notes="filteredNotes"
        v-if="notes"
        @remove="remove"
        @copy="copy"
        @setBgColor="setBgColor"
        />
      </section>
    `,
  data() {
    return {
      notes: null,
      filterBy: {
        types: [
          { NoteTxt: true },
          { NoteTodos: true },
          { NoteImg: true },
          { NoteVideo: true },
        ],
        createdAt: Date.now(),
      },
      searchKey: '',
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
      let txt = new RegExp(this.searchKey, 'i')
      return this.notes.filter(
        (note) =>
          txt.test(note.info.title) || this.filterBy.types[note.type] === true
      )
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
    copy(note) {
      note.id = ''
      noteService
        .save(note)
        .then((note) => {
          showSuccessMsg('Copied note')
          noteService
            .query()
            .then((notes) => (this.notes = notes))
            .catch(console.log)
        })
        .catch((err) => {
          showErrorMsg('Note copied failed')
        })
    },
    savedNote(note) {
      this.notes.push(note)
    },
    setBgColor(color, noteId) {
      let note = this.notes.find((note) => note.id === noteId)
      note.style.backgroundColor = color
      noteService.save(note)
    },
    onSetFilterBy(type) {
      let types = this.filterBy.types
      let newTypes = types.map((currType) => {
        currType = { currType: false }
      })
      console.log(newTypes)

      // types[type] = true
      // types = types
    },
  },
  components: {
    NoteFilter,
    NoteList,
    addNote,
  },
}
