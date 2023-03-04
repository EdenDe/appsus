import EmailAll from '../pages/EmailAll.js'
import EmailFileFilter from '../cmps/EmailFileFilter.js'
import EmailSearchFilter from '../cmps/EmailSearchFilter.js'
import EmailCompose from '../cmps/EmailCompose.js'
import { eventBus } from '../../../services/event-bus.service.js'

export default {
	name: 'EmailIndex',
	template: `
  <section class="mail-index flex-column full" >
		<header class="flex align-center justify-between hamburger-logo-container"> 
			<button class="fa bars circle-hover" @click="toggleIconOnly">	</button>
			<img src="assets/img/gmail.jpg"/>
			<EmailSearchFilter/>
		</header>
		<main class="flex main"> 
			<aside class="mail-file-filters" :class="{'icons-only':iconsOnly}"> 
				<RouterLink to="/mail/compose" class="fa pencil btn-compose flex">
					<span>Compose</span>
				</RouterLink>
				<EmailFileFilter />
			</aside>
			<RouterView />
		</main>
  </section>
    `,
	data() {
		return {
			iconsOnly: false,
		}
	},
	methods: {
		toggleIconOnly() {
			this.iconsOnly = !this.iconsOnly
		},
	},
	computed() {},
	components: {
		EmailAll,
		EmailSearchFilter,
		EmailFileFilter,
		EmailCompose,
	},
}
