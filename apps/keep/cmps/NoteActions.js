import { utilService } from '../../../services/util.service.js'

export default {
	props: ['note'],
	emits: ['save', 'pin', 'copy', 'remove', 'setBgColor'],
	name: 'NoteActions',
	template: `
    <section class="note-actions">
     
      <button class="btn-palette fa palette" title="Change Color">
      <div  class="pick-color" >
        
        <button class="btn-pick-color btn-red" @click="setBgColor('#e6c9a8', note.id)" title="Red"></button>
        <button class="btn-pick-color btn-pink" @click="setBgColor('#fdcfe8', note.id)" title="Pink"></button>
        <button class="btn-pick-color btn-purple" @click="setBgColor('#d7aefb', note.id)" title="Purple"></button>
        <button class="btn-pick-color btn-blue" @click="setBgColor('#aecbfa', note.id)" title="Blue"></button>
        <button class="btn-pick-color btn-green" @click="setBgColor('#ccff90', note.id)" title="Green"></button>
      </div>
      </button>
      <RouterLink :to="'/note/edit/'+note.id" class="fa pencil" title="Edit"></RouterLink>		
      <button @click="onCopy(note)" class="fa-regular copy" title="Copy"></button>
      <button @click="sendNote" class="fa-regular envelop" title="Send"></button>
        <button @click="onRemove(note.id)" class="btn-remove fa trash-can" title="Delete">
        </button>
    </section>
  `,
	methods: {
		sendNote() {
			let body
			if (this.note.type === 'NoteTxt') body = this.note.info.title
			else if (this.note.type === 'NoteTodos')
				body = this.note.info.todos.map(todo => todo.txt).join('\n')
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
