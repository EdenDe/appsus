export default {
  template: `
        
            <div class="hero full">
        	    <h1>Relax <span>We will take care of your's <span class="dynamic">{{wordToShow}}</span></span></h1>
            </div>             
    `,
  data() {
    return {
      words: ['emails', 'notes', 'books'],
      word: 'emails',
      counter: 1,
      intervalId: 0,
    }
  },
  created() {
    this.intervalId = setInterval(() => {
      if (this.counter === 3) this.counter = 0
      this.word = this.words[this.counter]
      this.counter++
    }, 3000)
  },
  computed: {
    wordToShow() {
      return this.word
    },
  },
  unmounted() {
    this.intervalId = clearInterval()
  },
}
