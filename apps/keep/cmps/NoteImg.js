export default {
  props: ['info'],
  name: 'NoteImg',
  template: `
  <img :src="info.url" alt="Picture">
  `,
}
