import { noteService } from '../services/note.service.js'

import NoteFilter from '../cmps/NoteFilter.js'
import NoteList from '../cmps/NoteList.js'
import NotePreview from '../cmps/NotePreview.js'

// import { eventBusService } from '../../../services/event-bus.service.js'

export default {
  template: `
    
      <section class="note-index">
        <NoteFilter @onSetFilter="onSetFilterBy" />
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

      return this.books.filter((book) => title.test(book.title))
    },
  },
  methods: {
    remove(noteId) {
      noteService
        .remove(noteId)
        .then((notes) => {
          eventBusService.emit('show-msg', {
            txt: 'note Deleted',
            type: 'success',
          })
          this.notes = notes
        })
        .catch((err) => {
          eventBusService.emit('show-msg', {
            txt: 'Book Removed Failed',
            type: 'error',
          })
        })
    },
    savedBook(book) {
      this.books.push(book)
    },
    onSetFilterBy(filterBy) {
      this.filterBy = filterBy
    },
  },
  components: {
    NoteFilter,
    NoteList,
    NotePreview,
  },
}
