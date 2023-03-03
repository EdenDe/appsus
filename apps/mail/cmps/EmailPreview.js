import LongTxt from '../../../cmps/LongTxt.js'
import { eventBus } from '../../../services/event-bus.service.js'
export default {
	props: ['mail'],
	name: 'EmailPreview',
	template: ` 
  <article :class="{'mail-preview':true,'unread-mail':!mail.isRead}">
		<button :class="starIcon" class="btn-star circle-hover tooltip" @click.prevent="setStar">
			<span> {{mail.isStared? '' : 'not '}} starred</span>
		</button>
    <p class="email-from"> {{mail.from}} </p>
    <p class="email-subject"> {{mail.subject}} </p>
		<p class="mail-body"> {{mail.body}} </p>
    <p class="email-date"> {{dateFormatted}} </p>
		<div class="preview-email-options">
			<button class="fa trash-can circle-hover tooltip" @click.prevent="remove">
				<span>Delete</span>
			</button>
			<button class="fa-regular envelop circle-hover tooltip" @click.prevent="toggleRead"> 
				<span>Mark as {{mail.isRead? 'unread' : 'read'}}</span>
			</button>
		</div>
  </article>
  `,
	data() {
		return {
			isStar: this.mail.isStared,
		}
	},
	methods: {
		setStar() {
			this.isStar = !this.isStar
			eventBus.emit('toggleStar', this.mail.id)
		},
		remove() {
			eventBus.emit('removeMail', this.mail)
		},
		toggleRead() {
			eventBus.emit('toggleRead', this.mail.id)
		},
	},
	computed: {
		dateFormatted() {
			if (!this.mail.sentAt) return ''
			const date = new Date(this.mail.sentAt)

			if (date.getFullYear() < new Date().getFullYear()) {
				return date.getFullYear()
			} else if (date.toLocaleDateString() === new Date().toLocaleDateString()) {
				return new Intl.DateTimeFormat('en-He', { timeStyle: 'short', hour12: true }).format(date)
			} else {
				return new Intl.DateTimeFormat('en-He', { month: 'short', day: 'numeric' }).format(date)
			}
		},
		starIcon() {
			return this.isStar ? 'fa filledStar' : 'fa-regular star'
		},
	},

	components: {
		LongTxt,
	},
}
