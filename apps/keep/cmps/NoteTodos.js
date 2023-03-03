export default {
  props: ['info'],
  name: 'NoteTodos',
  template: `
  <ul class="todo-list clean-list">
      <li v-for="todo in info.todos" >
        <button v-if="todo.doneAt" class="fa-regular checked-box" @click="toggleDone(todo)"></button>
        <button v-if="!todo.doneAt" class="fa-regular check-box" @click="toggleDone(todo)"></button>
        <p  contenteditable="true" :class="{done: todo.doneAt}" class="edit-txt edit-todo" @input="oninput($event)">{{todo.txt}}</p>
      </li>
  </ul>
  `,
  methods: {
    oninput(ev) {
      this.info.title = ev.target.innerText
      this.$emit('save', this.info.title)
    },

    toggleDone(todo) {
      if (!todo.doneAt) todo.doneAt = Date.now()
      else todo.doneAt = null
      this.$emit('save', this.info.todos)
    },
  },
}
