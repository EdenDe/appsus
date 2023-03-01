import LongTxt from '../../../cmps/LongTxt.js'
export default {
	props: ['mail'],
	template: `
      <article>
        <h2> {{mail.from}} </h2>
        <LongTxt :txt="mail.body"/>
        <p> <span> {{mail.subject}} </span> {{mail.sentAt}} </p>
      </article>
  `,

	computed: {},
	components: {
		LongTxt,
	},
}
