import { Component } from '@angular/core';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public todos: Todo[] = [];
  public title: String = 'My todos';

  constructor() {
    this.todos.push(new Todo(1, 'caminar', false));
    this.todos.push(new Todo(2, 'ir a escola', true));
    this.todos.push(new Todo(3, 'programar', false));
  }

  removeTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
  markAsDone(todo: Todo) {}
  markAsUndone(todo: Todo) {}
}
