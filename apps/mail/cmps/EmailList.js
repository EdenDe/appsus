import EmailPreview from './EmailPreview.js'

export default {
	props: ['mails'],
	name: 'EmailList',
	template: `
      <ul class="mail-list clean-list">
        <li v-for="mail in mails" :key="mail.id" >
          <RouterLink :to="'/mail/'+mail.id">
            <EmailPreview :mail="mail"/>		
          </RouterLink>         
        </li>  
      </ul>
  `,
	components: {
		EmailPreview,
	},
}
