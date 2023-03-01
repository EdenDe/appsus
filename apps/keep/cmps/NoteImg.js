export default {
  props: ['info'],
  template: `
  <h1>{{info.title}}</h1>
  <img :src="info.url" alt="Flowers">
  `,
}
