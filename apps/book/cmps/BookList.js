import BookPreview from './BookPreview.js'

export default {
	props: ['books'],
	template: `
      <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-preview">
          <BookPreview :book="book"/>
					<RouterLink :to="'/books/'+book.id">...more</RouterLink> 
					<div class="btn-top-container"> 
					<button @click="onRemove(book.id)" class="btn-remove fa trash-can">	</button>	
					<RouterLink class="fa edit" :to="'/books/edit/'+book.id">	</RouterLink> 				
					</div>
        </li>  
      </ul>
  `,
	methods: {
		onRemove(bookId) {
			this.$emit('remove', bookId)
		},
	},
	components: {
		BookPreview,
	},
}
