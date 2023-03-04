export default {
	template: `
    <section class="book-filter" >
      <input v-model="filterBy.title" @input="setFilter" placeholder="Search by name" type="text"/>
      <input v-model="filterBy.amount" @input="setFilter" placeholder="Search by price" type="number"/>
    </section>
  `,
	data() {
		return {
			filterBy: { title: '', amount: null },
		}
	},
	methods: {
		setFilter() {
			this.$emit('onSetFilter', { ...this.filterBy })
		},
	},
}
