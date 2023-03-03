import { utilService } from '../../../services/util.service.js'

export default {
  props: ['note'],
  emits: ['save', 'pin', 'copy', 'remove', 'setBgColor'],
  name: 'NoteActions',
  template: `
    <section class="note-actions"> 
      <button class="btn-palette fa palette">
      <div class="pick-color" >       
        <button class="btn-pick-color btn-red tooltip" @click="setBgColor('#e6c9a8', note.id)"><span>Red</span></button>
        <button class="btn-pick-color btn-pink tooltip" @click="setBgColor('#fdcfe8', note.id)"><span>Pink</span></button>
        <button class="btn-pick-color btn-purple tooltip" @click="setBgColor('#d7aefb', note.id)"><span>Purple</span></button>
        <button class="btn-pick-color btn-blue tooltip" @click="setBgColor('#aecbfa', note.id)"><span>Blue</span></button>
        <button class="btn-pick-color btn-green tooltip" @click="setBgColor('#ccff90', note.id)"><span>Green</span></button>
      </div>
      </button>
      <RouterLink :to="'/note/edit/'+note.id" class="fa pencil tooltip"><span>Edit</span></RouterLink>		
      <button @click="onCopy(note)" class="fa-regular copy tooltip"><span>Copy</span></button>
      <button @click="sendNote" class="fa-regular envelop tooltip"><span>Send</span></button>
        <button @click="onRemove(note.id)" class="btn-remove fa trash-can tooltip"><span>Delete</span>
        </button>
    </section>
  `,
  methods: {
    sendNote() {
      let body
      if (this.note.type === 'NoteTxt') body = this.note.info.title
      else if (this.note.type === 'NoteTodos')
        body = this.note.info.todos.map((todo) => todo.txt).join('\n')
      else body = this.note.info.url

      utilService.setQueryParams({
        subject: 'my note',
        body: body,
      })
      this.$router.push('/mail/compose')
    },
    onCopy(note) {
      this.$emit('copy', note)
    },
    onRemove(noteId) {
      this.$emit('remove', noteId)
    },
    setBgColor(color, noteId) {
      this.$emit('setBgColor', color, noteId)
    },
  },
  computed: {},
}
