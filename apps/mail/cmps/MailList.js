import MailPreview from './MailPreview.js'

export default {
	props: ['mails'],
	template: `
      <ul class="mail-list">
        <li v-for="mail in mails" :key="mail.id">
          <MailPreview :mail="mail"/>		
        </li>  
      </ul>
  `,
	components: {
		MailPreview,
	},
}
