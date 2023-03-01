export default {
  template: `
  <section class="labels">

    <ul>
      <li v-for="label in labels" @click="addLabel(label)">

      </li>
    </ul>

  </section>
  `,

  data() {
    return {
      labels: {
        important: false,
        family: false,
        work: false,
        friends: false,
        spam: false,
        memories: false,
        romantic: false,
      },
    }
  },
  methods: {
    addLabel(label) {
      label = true
    },
  },
}
