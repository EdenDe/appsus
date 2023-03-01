'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import demoMails from '../data/demo-mails.json' assert { type: 'json' }

const MAIL_KEY = 'mailDB'
const USER_KEY = 'userDB'
let gUser

_createMails()

export const mailService = {
	query,
	get,
	remove,
	save,
	getEmptyMail,
	getUser,
}

function query(criteria) {
	return storageService.query(MAIL_KEY).then(mails => {
		const regex = new RegExp(criteria.txt, 'i')

		//TODO: label filter
		let filteredList = mails.filter(
			mail =>
				(criteria.isRead === null || mail.isRead === criteria.isRead) &&
				(criteria.isStared === null || mail.isStared === criteria.isStared) &&
				(regex.test(mail.subject) || regex.test(mail.body) || regex.test(mail.from))
		)

		if (criteria.status === 'inbox') {
			filteredList = filteredList.filter(mail => mail.sentAt || mail.to === getUser().email)
		} else if (criteria.status === 'sent') {
			filteredList = filteredList.filter(mail => mail.sentAt || mail.from === getUser().email)
		} else if (criteria.status === 'trash') {
			filteredList = filteredList.filter(mail => mail.removeAt)
		} else if (criteria.status === 'draft') {
			filteredList = filteredList.filter(mail => !mail.sentAt)
		}
		return filteredList
	})
}

function get(mailId) {
	return storageService.get(MAIL_KEY, mailId)
}

function getUser() {
	return {
		email: 'user@appsus.com',
		fullname: 'Mahatma Appsus',
	}
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
