import EmailAll from '../pages/EmailAll.js'
import EmailFileFilter from '../cmps/EmailFileFilter.js'
import EmailSearchFilter from '../cmps/EmailSearchFilter.js'
import EmailCompose from '../cmps/EmailCompose.js'

export default {
	template: `
  <section class="mail-index flex-column full" >
		<header class="flex align-center justify-between hamburger-logo-container"> 
			<button class="fa bars circle-hover" @click="toggleIconOnly">	</button>
			<img src="../../../assets/img/gmail.jpg"/>
			<span>Email</span>
			<EmailSearchFilter @setFilter="setFilter"/>
		</header>
		<main class="flex main"> 
			<aside class="mail-file-filters" :class="{'icons-only':iconsOnly}"> 
				<RouterLink to="/mail/compose" class="form-back">
					<button class="fa pencil btn-compose flex">
						<span>Compose</span>
				</button>
				</RouterLink>
				<EmailFileFilter @setFilter="setFilter" />
			</aside>
			<RouterView :criteria="criteria"/>
		</main>
  </section>
    `,
	data() {
		return {
			criteria: {
				status: 'inbox',
				txt: '',
				isRead: null,
				isStared: null,
				lables: [],
			},
			iconsOnly: false,
		}
	},
	methods: {
		setFilter(filters) {
			for (let filter in filters) {
				this.criteria[filter] = filters[filter]
			}
			this.criteria = { ...this.criteria }
		},
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
