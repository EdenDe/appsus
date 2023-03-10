import { noteService } from '../services/note.service.js'
import { eventBus, showErrorMsg, showSuccessMsg } from '../../../services/event-bus.service.js'

import SelectType from './SelectType.js'
import { utilService } from '../../../services/util.service.js'

export default {
	emits: ['save'],
	name: 'AddNote',
	template: `
    <section class="note-edit" v-if="currType">	
      <h2>Add a note</h2>
      <form  @submit.prevent="save">
        <div> 
          <input type="text" v-model="input" :placeholder="setPlaceHolder" name="title" />
          <SelectType :filters="null" :currType="currType" @setType="setType"/>
        </div>
        <div class="form-btns flex align-center justify-between"> 
           <button type="submit" class="form-save">Close</button>
        </div>
      </form>
    </section>
    <div class="screen"></div> 
  `,
	data() {
		return {
			note: null,
			showModal: false,
			currType: null,
			input: '',
		}
	},
	created() {
		const { noteId } = this.$route.params

		if (!noteId) {
			this.currType = 'NoteTxt'
			this.note = noteService.getEmptyNote(this.currType)
			this.input = utilService.getValFromParam('title') || ''
			utilService.deleteQueryParam('title')
			return
		}
		noteService.get(noteId).then(note => {
			this.note = note
			this.setType(note.type)
			this.input = this.setTodosInput(note) || note.info.url || note.info.title
		})
	},
	methods: {
		save() {
			this.setInfo()
			console.log(this.note)
			if (this.input !== '') {
				eventBus.emit('save', this.note)
			}
			this.$router.push('/note')
		},
		setInfo() {
			if (this.currType === 'NoteImg' || this.currType === 'NoteVideo') {
				this.note.info.url = this.input
				return
			}
			if (this.currType === 'NoteTodos') {
				this.note.info.todos = []
				this.input.split(',').map((todo, idx) => {
					this.note.info.todos[idx] = { txt: todo, doneAt: null }
				})
				return
			}
			this.note.info.title = this.input
		},
		setTodosInput(note) {
			console.log(note)
			if (!note.info.todos) return
			return note.info.todos.map((todo, idx) => {
				return this.note.info.todos[idx].txt
			})
		},

		setType(type) {
			this.currType = type
			this.note.type = this.currType
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
		SelectType,
	},
}
