import NoteActions from '../cmps/NoteActions.js'

import NoteTxt from './NoteTxt.js'
import NoteTodos from './NoteTodos.js'
import NoteImg from './NoteImg.js'
import NoteVideo from './NoteVideo.js'

export default {
  props: ['notes'],
  name: 'NotesList',
  emits: ['save', 'pin', 'copy', 'remove', 'setBgColor'],
  template: `
    <ul class="note-list clean-list">
        <li v-for="note in notes" :key="note.id" class="note-preview" 
        :style="{backgroundColor: note.style.backgroundColor}" @click="toggleEditor()">
  
         <button @click="onPin(note)" class="btn-pin fa pin" :class="{pinned: note.isPinned}"></button>
          <component :is="note.type" :info="note.info" @save="onSave(note)" /> 
          <noteActions :note="note" @pin="onPin" @copy="onCopy" @remove="onRemove" @setBgColor="setBgColor"></noteActions>
	        
        </li>  
      </ul>
      <RouterView/>
    `,
  data() {
    return {
      isEditing: false,
    }
  },

  methods: {
    onSave(note) {
      this.$emit('save', note)
    },
    onPin(note) {
      this.$emit('pin', note)
    },
    toggleEditor() {
      this.isEditing = !this.isEditing
    },
    onRemove(noteId) {
      this.$emit('remove', noteId)
    },
    onCopy(note) {
      this.$emit('copy', note)
    },
    toggleChoseColor() {
      this.isChoseColor = !this.isChoseColor
    },
    setBgColor(color, noteId) {
      this.$emit('setBgColor', color, noteId)
    },
  },
  components: {
    NoteActions,
    NoteTxt,
    NoteTodos,
    NoteImg,
    NoteVideo,
  },
}
