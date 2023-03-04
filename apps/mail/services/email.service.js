'use strict'

import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

import demoMails from '../data/demo-emails.json' assert { type: 'json' }

const MAIL_KEY = 'mailDB'
let sortBy

_createMails()

export const emailService = {
	query,
	get,
	remove,
	save,
	getEmptyMail,
	getUser,
	setSort,
	getEmptyTxtFilters,
}

function query(criteria) {
	return storageService.query(MAIL_KEY).then(mails => {
		let filteredList = _filterByText(mails, criteria.search)

		filteredList = filteredList.filter(
			mail => criteria.isRead === null || mail.isRead === criteria.isRead
		)
		filteredList = _filterByStatus(filteredList, criteria.status)
		filteredList = filteredList.filter(
			mail => criteria.isStared === null || mail.isStared === criteria.isStared
		)

		if (setSort === 'date') {
			return filteredList.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
		} else {
			return filteredList.sort((a, b) => a.subject.localeCompare(b.subject))
		}
	})
}

function _filterByStatus(mails, status) {
	if (status === 'trash') {
		return mails.filter(mail => mail.removedAt)
	} else if (status === 'starred') {
		return mails.filter(mail => mail.isStared)
	} else if (status === 'inbox') {
		return mails.filter(mail => mail.sentAt && mail.to === getUser().email && !mail.removedAt)
	} else if (status === 'sent') {
		return mails.filter(mail => mail.sentAt && mail.from === getUser().email && !mail.removedAt)
	} else if (status === 'draft') {
		return mails.filter(mail => !mail.sentAt && !mail.removedAt)
	}
}

function _filterByText(mails, search) {
	if (!search.to && !search.from && !search.subject && !search.hasWords) {
		const regex = new RegExp(search.txt, 'i')
		return mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body))
	}
	const regExpTo = new RegExp(search.to || null, 'i')
	const regExpFrom = new RegExp(search.from || null, 'i')
	const regExpSubject = new RegExp(search.subject || null, 'i')
	const regExpHas = new RegExp(search.hasWords || null, 'i')

	return mails.filter(
		mail =>
			regExpTo.test(mail.to) ||
			regExpFrom.test(mail.from) ||
			regExpSubject.test(mail.subject) ||
			regExpHas.test(mail.body)
	)
}

function getEmptyTxtFilters() {
	return {
		txt: null,
		to: null,
		from: null,
		subject: null,
		hasWords: null,
		noWords: null,
	}
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

function setSort(sort) {
	sortBy = sort
}

function _createMails() {
	let mails = utilService.loadFromStorage(MAIL_KEY)
	if (!mails || !mails.length) {
		utilService.saveToStorage(MAIL_KEY, demoMails)
	}
}
