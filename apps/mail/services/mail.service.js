'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import demoMails from '../data/demo-mails.json' assert { type: 'json' }

const MAIL_KEY = 'mailDB'

_createMails()

export const mailService = {
	query,
	get,
	remove,
	save,
	getEmptyMail,
}

function query() {
	return storageService.query(MAIL_KEY)
}

function get(mailId) {
	return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
	return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
	if (mail.id) {
		return storageService.put(MAIL_KEY, mail)
	} else {
		return storageService.post(MAIL_KEY, mail)
	}
}

function getEmptyMail() {
	return {
		id: '',
		subject: '',
		body: '',
		isRead: false,
		sentAt: null,
		removedAt: null,
		from: '',
		to: '',
	}
}

function _createMails() {
	let mails = utilService.loadFromStorage(MAIL_KEY)
	if (!mails || !mails.length) {
		utilService.saveToStorage(MAIL_KEY, demoMails)
	}
}
