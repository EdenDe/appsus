export default {
	template: `
  <section class="labels">
    <button @click="toggleLabels">Labels</button>
   
  <template v-if="showLabels">
    <input type="search" placeholder="Pick a label" v-model="searchKey"/>
    <ul>
      <li v-for="label in labelsToShow"  @click="addLabel(label)" :key="label.title">
        <span>  {{label.title}}</span>
        <span :class="{'fa check':label.isSelected}"></span>
      </li>
    </ul>
    </template>

  </section>
  `,

	data() {
		return {
			labels: [
				{
					title: 'important',
					isSelected: false,
				},
				{
					title: 'family',
					isSelected: false,
				},
				{
					title: 'work',
					isSelected: false,
				},
				{
					title: 'friends',
					isSelected: false,
				},
				{
					title: 'spam',
					isSelected: false,
				},
				{
					title: 'romantic',
					isSelected: false,
				},
			],
			showLabels: false,
			searchKey: '',
		}
	},
	methods: {
		addLabel(label) {
			label.isSelected = !label.isSelected
		},
		toggleLabels() {
			this.showLabels = !this.showLabels
		},
	},
	computed: {
		labelsToShow() {
			let regex = new RegExp(this.searchKey, 'i')
			return this.labels.filter(label => regex.test(label.title))
		},
	},
}
