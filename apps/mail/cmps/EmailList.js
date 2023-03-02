import EmailPreview from './EmailPreview.js'

export default {
	props: ['mails'],
	template: `
      <ul class="mail-list clean-list">
        <li v-for="mail in mails" :key="mail.id" >
          <RouterLink :to="'/mail/'+mail.id">
            <EmailPreview :mail="mail" @setToggleStar="setToggleStar"/>		
          </RouterLink>         
        </li>  
      </ul>
      
  `,
	data() {
		return {}
	},
	methods: {
		setToggleStar(id) {
			this.$emit('toggleStar', id)
		},
	},
	components: {
		EmailPreview,
	},
}
