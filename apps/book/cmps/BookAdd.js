import { bookService } from '../services/book.service.js'
import { googleBookService } from '../services/google-book.service.js'

export default {
	template: `
	<section class="add-book"> 
		<h1>Type book name from google library</h1>
		<input type="search" v-model="searchKey" placeholder="Search" @input="searchDebounce"/>
 	 	<ul>
			<li v-for="data in dataList" :key="data.title">
				{{data.title}}
				<button @click="add(data)">+</button>
			</li>
 		 </ul>
	</section>
`,
	data() {
		return {
			searchKey: '',
			dataList: [],
			searchDebounce: googleBookService.debounce(this.search, 2000),
		}
	},
	methods: {
		add(data) {
			bookService.addGoogleBook(data).then(console.log)
		},
		search() {
			googleBookService.query(this.searchKey).then(res => {
				console.log(res)
				this.dataList = res
			})
		},
	},
}
