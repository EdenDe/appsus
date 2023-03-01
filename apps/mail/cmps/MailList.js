import MailPreview from './MailPreview.js'

export default {
	props: ['mails'],
	template: `
      <ul class="mail-list clean-list">
        <template v-if="showRoute"> 
			    <RouterLink to="/mail" @click="showRoute=false">back</RouterLink>
          <RouterView />
        </template>
        <li v-for="mail in mails" :key="mail.id" v-else>
          <RouterLink :to="'/mail/'+mail.id" @click="showRoute=true">
            <MailPreview :mail="mail"/>		
          </RouterLink>         
        </li>  
      </ul>
      
  `,
	data() {
		return {
			showRoute: false,
		}
	},
	components: {
		MailPreview,
	},
}
