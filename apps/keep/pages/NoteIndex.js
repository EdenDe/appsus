import { noteService } from '../services/note.service.js'
import { utilService } from '../../../services/util.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'

import {
  eventBus,
  showErrorMsg,
  showSuccessMsg,
} from '../../../services/event-bus.service.js'

export default {
  emits: ['save', 'pin', 'copy', 'remove', 'setBgColor'],
  template: `
    
      <section class="note-index">
        <section class="search-filter "> 
          <RouterLink to="/note/edit" class="btn-new-note fa plus tooltip"><span>Add Note</span></RouterLink>
          <div class="fa magnifying-glass flex align-center justify-center circle-hover"></div>
          <input v-model="searchKey" type="search" placeholder="Search"/>
          <NoteFilter @onSetFilter="onSetFilterBy"/>
        </section>
        <NoteList 
					:notes="pinnedNotes"
					v-if="notes"
					@save="save"
					@pin="pin"
					@remove="remove"
					@copy="copy"
					@setBgColor="setBgColor"
        />
        <NoteList 
					:notes="filteredNotes"
					v-if="notes"
					@save="save"
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
      filterBy: {
        NoteTxt: this.fixQueryParams('NoteTxt'),
        NoteTodos: this.fixQueryParams('NoteTodos'),
        NoteImg: this.fixQueryParams('NoteImg'),
        NoteVideo: this.fixQueryParams('NoteVideo'),
      },
      searchKey: '',
      pinNotes: [],
    }
  },
  created() {
    noteService
      .query()
      .then((notes) => {
        this.notes = notes
      })
      .catch(console.log)

    eventBus.on('save', this.save)
  },
  computed: {
    filteredNotes() {
      let txt = new RegExp(this.searchKey, 'i')

      return this.notes.filter(
        (note) =>
          txt.test(note.info.title) &&
          note.isPinned === false &&
          this.filterBy[note.type] === true
      )
    },
    pinnedNotes() {
      this.pinNotes = this.notes.filter((note) => note.isPinned === true)
      return this.pinNotes
    },
  },
  methods: {
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
      delete note.id
      noteService
        .save(note)
        .then((note) => {
          showSuccessMsg('Copied note')
          noteService.query().then((notes) => (this.notes = notes))
        })
        .catch((err) => {
          showErrorMsg('Note copied failed')
        })
    },
    save(note) {
      noteService
        .save(note)
        .then((note) => {
          noteService.query().then((notes) => (this.notes = notes))
        })
        .catch((err) => {
          showErrorMsg('Note saved failed')
        })
    },
    setBgColor(color, noteId) {
      let note = this.notes.find((note) => note.id === noteId)
      note.style.backgroundColor = color
      noteService.save(note)
    },
    onSetFilterBy(filterBy) {
      this.filterBy = filterBy
      utilService.setQueryParams(this.filterBy)
    },
    fixQueryParams(val) {
      let res = utilService.getValFromParam(val)
      res = res === 'true' || !res ? true : false
      return res
    },
  },
  components: {
    NoteFilter,
    NoteList,
  },
}
