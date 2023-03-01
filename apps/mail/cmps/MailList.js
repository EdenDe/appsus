import MailPreview from './MailPreview.js'

export default {
	props: ['mails'],
	template: `
      <ul class="mail-list clean-list">
        <li v-for="mail in mails" :key="mail.id">
          <RouterLink :to="'/mail/'+mail.id">
            <MailPreview :mail="mail"/>		
          </RouterLink> 
        </li>  
      </ul>
  `,
	components: {
		MailPreview,
	},
}
