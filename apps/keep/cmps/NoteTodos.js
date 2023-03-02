export default {
  props: ['info'],
  template: `
  <ul class="todo-list">
    <li v-for="todo in info.todos" class="{done: info.todo.doneAt}">
      <button v-if="todo.doneAt"class="fa-regular checked-box" @click="toggleDone(todo)"></button>
      <button v-if="!todo.doneAt" class="fa-regular check-box" @click="toggleDone(todo)"></button>
      <textarea v-model="todo.txt" class="edit-txt edit-todo" @input="fitContent($event)"></textarea>
    </li>
  </ul>
  `,
  methods: {
    fitContent(ev) {
      ev.target.style.height = ev.target.scrollHeight + 'px'
      this.$emit('save', this.todo.txt)
    },

    toggleDone(todo) {
      if (!todo.doneAt) todo.doneAt = Date.now
      else todo.doneAt = null
    },
  },
}
