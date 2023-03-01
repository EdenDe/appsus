export default {
  props: ['note'],
  template: `
      <article>
         <p> {{ note.info.txt}} </p>

         <button @click="toggleChoseColor">Change Color</button>
         <div v-if="isChoseColor" class="pick-color">

           <button class="btn-pick-color btn-red" @click="setBgColor('#e6c9a8', note.id)"></button>
           <button class="btn-pick-color btn-pink" @click="setBgColor('#fdcfe8', note.id)"></button>
           <button class="btn-pick-color btn-purple" @click="setBgColor('#d7aefb', note.id)"></button>
           <button class="btn-pick-color btn-blue" @click="setBgColor('#aecbfa', note.id)"></button>
           <button class="btn-pick-color btn-green" @click="setBgColor('#ccff90', note.id)"></button>
         </div>
      </article>
  `,
  data() {
    return {
      isChoseColor: false,
    }
  },
  methods: {
    toggleChoseColor() {
      this.isChoseColor = !this.isChoseColor
    },
    setBgColor(color, noteId) {
      this.toggleChoseColor()
      this.$emit('setBgColor', color, noteId)
    },
  },
  computed: {},
}
