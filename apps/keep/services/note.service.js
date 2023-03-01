'use strict'
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import notesDemoData from './noteDemoData.js'

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
  return storageService.get(NOTE_KEY, noteId).then(_setNextPrevNotekId)
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

function getEmptyNote() {
  return {
    id: utilService.makeId(),
    createdAt: Date.now(),
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#00d',
    },
    info: {
      txt: '',
    },
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    utilService.saveToStorage(NOTE_KEY, notesDemoData)
  }
}

// function _setNextPrevBookId(book) {
//   return storageService.query(NOTE_KEY).then((books) => {
//     const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
//     book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id
//     book.prevBookId = books[bookIdx - 1]
//       ? books[bookIdx - 1].id
//       : books[books.length - 1].id
//     console.log(book)
//     return book
//   })
// }
