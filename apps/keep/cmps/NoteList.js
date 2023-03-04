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
	<!-- <draggable v-model="notes" tag="ul"  class="note-list clean-list"> -->
    <ul class="note-list clean-list" >
        <li v-for="note in notes" draggable="true" @dragstart="dragStart" @dragover.prevent="dragOver" @drop.prevent="drop" :data-id="note.id" :key="note.id" class="note-preview" 
        :style="{backgroundColor: note.style.backgroundColor}" @click="toggleEditor()">
  
         <button @click="onPin(note)" class="btn-pin fa pin" :class="{pinned: note.isPinned}"></button>
          <Component :is="note.type" :info="note.info" @save="onSave(note)" /> 
          <NoteActions :note="note" @pin="onPin" @copy="onCopy" @remove="onRemove" @setBgColor="setBgColor"/>
	        
        </li>  
      </ul>
			 <!-- </draggable> -->
      <RouterView/>
    `,
  data() {
    return {
      isEditing: false,
    }
  },

  methods: {
    dragStart(ev) {
      ev.dataTransfer.effectAllowed = 'move'
      ev.dataTransfer.setData('text', ev.target.dataset.id)
    },
    dragOver() {},
    drop(ev) {
      const noteId = ev.dataTransfer.getData('text')
      // const currNote = document.querySelector([data-id = ${noteId}]`)

      // ev.target.appendChild()
    },
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
