export default {
	props: ['book'],
	template: `
      <article :class="{'book-on-sale':book.listPrice.isOnSale}">
        <img :src="book.thumbnail"/>
        <h2> {{book.title}} </h2>
        <p> for only {{priceCurrency}} </p>
      </article>
  `,

	computed: {
		priceCurrency() {
			return new Intl.NumberFormat('en', {
				style: 'currency',
				currency: this.book.listPrice.currencyCode,
				maximumSignificantDigits: 5,
			}).format(this.book.listPrice.amount)
		},
	},
}
