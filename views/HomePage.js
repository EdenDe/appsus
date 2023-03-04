import { utilService } from '../services/util.service.js'

export default {
  template: `        
    <div class="home-page full">
      <h1>Relax 
        <span class="home-page-txt">We will take care of your 
        <RouterLink :to="link" >
         <div ref="dynamicTitle" class="dynamic">{{wordToShow}} </div>
        </RouterLink>
        </span>
       
      </h1>
    </div>             
    `,
  data() {
    return {
      words: ['emails', 'notes', 'books'],
      word: 'emails',
      links: ['/mail', '/note', '/book'],
      link: '/mail',
      counter: 1,
      intervalId: 0,
    }
  },
  created() {
    this.intervalId = setInterval(() => {
      if (this.counter === 3) this.counter = 0
      this.word = this.words[this.counter]
      this.link = this.links[this.counter]
      this.counter++
      utilService.animateCSS(this.$refs.dynamicTitle, 'fadeIn')
    }, 2000)
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
