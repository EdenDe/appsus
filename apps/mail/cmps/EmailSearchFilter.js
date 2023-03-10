import { eventBus } from '../../../services/event-bus.service.js'
import { emailService } from '../services/email.service.js'

export default {
	template: `
  <section class="search-filter "> 
    <div class="fa magnifying-glass flex align-center justify-center circle-hover"></div>
    <input v-model="search.txt" @input="onSearch"/>
		<div
			class="search-rule-filter flex align-center tooltip justify-center circle-hover"
			@click="onToggleShow"
		>
			<span>search options</span>
			<img src="assets/img/searchFilter.png"/>
		</div>
		<form @submit.prevent="onFilter" class="rules-options" :class="{'show-list':showTxtRules}">
			<label>	To
				<input v-model="search.to"/>
			</label>
			<label>	From
				<input v-model="search.from"/>
			</label>
			<label>	Subject
				<input v-model="search.subject"/>
			</label>
			<label>	Has the words
				<input v-model="search.hasWords"/>
			</label>
			<div class="flex justify-center align-center"> 
				<button type="submit"> Search </button>
				<button type="button" @click="onClearFilters"> Clear filters </button>
			</div>
		</form>
  </section>
`,

	data() {
		return {
			search: {
				txt: '',
				to: null,
				from: null,
				subject: null,
				hasWords: null,
			},
			showTxtRules: false,
		}
	},
	methods: {
		onSearch() {
			eventBus.emit('setFilter', { search: this.search })
		},
		onClearFilters() {
			this.search = emailService.getEmptyTxtFilters()
		},
		onFilter() {
			this.showTxtRules = false
			this.onSearch()
		},
		onToggleShow() {
			this.showTxtRules = !this.showTxtRules
			if (!this.showTxtRules) this.onSearch()
		},
	},
}
