export default {
	template: `
  <section class="search-filter"> 
    <div class="fa magnifying-glass flex align-center justify-center circle-hover"></div>
  <input v-model="search.txt"  @input="onSearch"/>
  </section>
`,

	data() {
		return {
			search: {
				txt: '',
			},
		}
	},
	methods: {
		onSearch() {
			this.$emit('setFilter', this.search)
		},
	},
	computed: {},
	created() {},
	components: {},
	emits: [],
}
