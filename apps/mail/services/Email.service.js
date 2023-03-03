'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import demoMails from '../data/demo-emails.json' assert { type: 'json' }

const MAIL_KEY = 'mailDB'

_createMails()

export const emailService = {
	query,
	get,
	remove,
	save,
	getEmptyMail,
	getUser,
}

function query(criteria) {
	return storageService.query(MAIL_KEY).then(mails => {
		const regex = new RegExp('^' + criteria.txt, 'i')

		//TODO: sort by date
		let filteredList = mails.filter(
			mail =>
				(criteria.isRead === null || mail.isRead === criteria.isRead) &&
				(regex.test(mail.subject) || regex.test(mail.body) || regex.test(mail.from))
		)

		if (criteria.status === 'inbox') {
			filteredList = filteredList.filter(
				mail => mail.sentAt && mail.to === getUser().email && !mail.removedAt
			)
		} else if (criteria.status === 'sent') {
			filteredList = filteredList.filter(
				mail => mail.sentAt && mail.from === getUser().email && !mail.removedAt
			)
		} else if (criteria.status === 'trash') {
			filteredList = filteredList.filter(mail => mail.removedAt)
		} else if (criteria.status === 'draft') {
			filteredList = filteredList.filter(mail => !mail.sentAt && !mail.removedAt)
		} else if (criteria.status === 'starred') {
			filteredList = filteredList.filter(mail => mail.isStared && !mail.removedAt)
		}

		return filteredList.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
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
		id: null,
		subject: '',
		body: '',
		isRead: true,
		sentAt: null,
		removedAt: null,
		from: getUser().email,
		to: '',
	}
}

function _createMails() {
	let mails = utilService.loadFromStorage(MAIL_KEY)
	if (!mails || !mails.length) {
		utilService.saveToStorage(MAIL_KEY, demoMails)
	}
}
