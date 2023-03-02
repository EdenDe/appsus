'use strict'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
	query,
	get,
	remove,
	save,
	getEmptyNote: getEmptyNote,
}

function query() {
	return storageService.query(NOTE_KEY)
}

function get(noteId) {
	return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNoteId)
}

function remove(noteId) {
	return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
	if (note.id) {
		return storageService.put(NOTE_KEY, note)
	} else {
		return storageService.post(NOTE_KEY, note)
	}
}

function getEmptyNote(type) {
	if (!type) type = 'NoteTxt'

	const emptyNote = {
		createdAt: Date.now(),
		type,
		isPinned: false,
		style: {
			backgroundColor: '#aecbfa',
		},
		info: getInfo(type),
	}
	return emptyNote
}

function getInfo(type) {
	if (type === 'NoteTxt')
		return {
			title: '',
		}

	if (type === 'NoteTodos')
		return {
			todos: [],
		}

	return {
		url: '',
	}
}

function _createNotes() {
	let notes = utilService.loadFromStorage(NOTE_KEY)
	if (!notes || !notes.length) {
		fetch('../data/demo-notes.json')
			.then(res => res.json())
			.then(res => {
				utilService.saveToStorage(NOTE_KEY, res)
			})
	}
}

function _setNextPrevNoteId(note) {
	return storageService.query(NOTE_KEY).then(notes => {
		const NoteIdx = notes.findIndex(currNote => currNote.id === note.id)
		note.nextNoteId = notes[NoteIdx + 1] ? notes[NoteIdx + 1].id : notes[0].id
		note.prevNoteId = notes[NoteIdx - 1] ? notes[NoteIdx - 1].id : notes[notes.length - 1].id
		return note
	})
}
