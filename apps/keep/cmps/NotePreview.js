import NoteTxt from './NoteTxt.js'
import NoteTodos from './NoteTodos.js'
import NoteImg from './NoteImg.js'
import NoteVideo from './NoteVideo.js'

export default {
  props: ['note'],
  template: `
      <article>
          <component :is="note.type" :info="note.info"
              @changeInfo="updateNote" />
        
      </article>
  `,

  methods: {
    updateNote() {
      console.log('update')
    },
  },
  computed: {},
  components: {
    NoteTxt,
    NoteTodos,
    NoteImg,
    NoteVideo,
  },
}
