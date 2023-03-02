import EmailPreview from './EmailPreview.js'

export default {
	props: ['mails'],
	template: `
      <ul class="mail-list clean-list">
        <li v-for="mail in mails" :key="mail.id" >
          <RouterLink :to="'/mail/'+mail.id" @remove="remove">
            <EmailPreview :mail="mail"/>		
          </RouterLink>         
        </li>  
      </ul>
      
  `,
	data() {
		return {}
	},
	methods: {
		remove(id) {
			console.log(id)
		},
	},
	components: {
		EmailPreview,
	},
}
