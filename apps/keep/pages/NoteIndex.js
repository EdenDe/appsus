import { note } from '../services/note.service'
import NoteList from '../cmps/NoteList.js'
import NoteFilter from '../cmps/NoteFilter.js'
import NotePreview from '../cmps/NotePreview.js'
import NoteDetails from './NoteDetails.js'

export default {
  template: `
    
      <section class="note">

      </section>
    `,
  components: {
    NoteList,
    NoteFilter,
    NotePreview,
    NoteDetails,
  },
}
