import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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
  toggleDone(todo: Todo) {
    console.log(this.form.controls['activity'].pristine);
    todo.done = !todo.done;
  }
}
