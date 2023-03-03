import { utilService } from '../../../services/util.service.js'
import { emailService } from '../services/Email.service.js'

export default {
	template: `
		<section class="email-compose" >
			<header class="flex justify-between align-center" @click="minimize=!minimize"> 
				<h3>New message</h3>
				<div class="btns-compose-options flex justify-center align-center">
					<button class="fa minimize" @click.stop="minimize=!minimize"></button>
					<button class="fa close" @click="save"></button>
				</div>
			</header>
			<form v-if="!minimize" @submit.prevent="send">
				<input type="text" v-model="formData.to" placeholder="Recipients" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" required>
				<input type="text" v-model="formData.subject" placeholder="Subject" required>
				<textarea type="text" v-model="formData.body" rows="5" required></textarea>
				<div class="flex justify-between"> 
					<button type="submit">Send</button>
					<button class="fa trash-can" @click="remove"></button>
				</div>
			</form>
		</section>
	`,
	data() {
		return {
			formData: emailService.getEmptyMail(),
			minimize: false,
		}
	},
	created() {
		this.formData.body = utilService.getValFromParam('body') || ''
		this.formData.subject = utilService.getValFromParam('subject') || ''
		utilService.deleteQueryParam('body')
		utilService.deleteQueryParam('subject')
	},
	methods: {
		send() {
			this.formData.sentAt = Date.now()
			this.save()
		},
		save() {
			emailService.save(this.formData)
			this.closeCompose()
		},
		remove() {
			this.formData.removedAt = Date.now()
			this.save()
		},
		closeCompose() {
			this.formData = emailService.getEmptyMail()
			this.$router.push('/mail')
		},
	},
}
