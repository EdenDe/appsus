export default {
  props: ['note'],
  template: `
      <article>
         <p> {{ note.info.txt}} </p>
      </article>
  `,

  computed: {},
}
