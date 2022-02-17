import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public mode: String = 'list';
  public todos: Todo[] = [];
  public title: String = 'My todos';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      activity: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
    });
    this.loadTodosOfLocalStorage();
  }

  removeTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.saveInLocalStorage();
  }

  addTodo() {
    const activity = this.form.controls['activity'].value;
    const id = this.todos.length
      ? +this.todos[this.todos.length - 1].id + 1
      : 1;
    this.todos.push(new Todo(id, activity, false));
    this.saveInLocalStorage();
    this.clearForm();
    this.changeMode('list');
  }

  clearForm() {
    this.form.reset();
  }

  toggleDone(todo: Todo) {
    console.log(this.form.controls['activity'].pristine);
    todo.done = !todo.done;
    this.saveInLocalStorage();
  }

  saveInLocalStorage() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  loadTodosOfLocalStorage() {
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }
  changeMode(mode: String) {
    this.mode = mode;
  }
}
