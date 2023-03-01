export default {
  props: ['info'],
  template: `
  <h1>{{info.title}}</h1>
  <ul>
    <li v-for="todo in info.todos" class="{done: info.todo.doneAt}">
    {{todo.txt}}
    </li>
  </ul>

  
  `,
}
