export default {
  props: ['info'],
  template: `
  <div v-if="!isEdited"></div>
  <div v-if="isEdited"></div>
  <h1>{{info.title}}</h1>
  <input v-model="info.title"/>

  `,
}
