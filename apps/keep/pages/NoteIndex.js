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
        :notes="pinnedNotes"
        v-if="notes"
        @pin="pin"
        @remove="remove"
        @copy="copy"
        @setBgColor="setBgColor"
        />
        <NoteList 
        :notes="filteredNotes"
        v-if="notes"
        @pin="pin"
        @remove="remove"
        @copy="copy"
        @setBgColor="setBgColor"
        />
      </section>
    `,
  data() {
    return {
      notes: null,
      filterBy: [
        { NoteTxt: true },
        { NoteTodos: true },
        { NoteImg: true },
        { NoteVideo: true },
      ],
      searchKey: '',
      pinNotes: [],
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
          txt.test(note.info.title) &&
          note.isPinned === false &&
          this.typeFilter(note)
      )
    },
    pinnedNotes() {
      this.pinNotes = this.notes.filter((note) => note.isPinned === true)
      return this.pinNotes
    },
  },
  methods: {
    typeFilter(note) {
      let isType = false

      for (let idx in this.filterBy) {
        if (Object.keys(this.filterBy[idx]).toString() !== note.type) continue
        isType = this.filterBy[idx][note.type]
      }
      return isType
    },
    pin(note) {
      this.notes.find((currNote) => currNote.id === note.id)
      note.isPinned = !note.isPinned
      noteService.save(note)
    },
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
    onSetFilterBy(filterBy) {
      console.log(filterBy)
      this.filterBy = filterBy
      console.log(this.filterBy)
    },
  },
  components: {
    NoteFilter,
    NoteList,
    addNote,
  },
}
