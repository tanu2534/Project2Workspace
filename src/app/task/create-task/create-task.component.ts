import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  constructor(private formBuilder: FormBuilder) {
  }


  ngOnInit() {
    // Additional initialization logic, if needed
  }

  onSubmit() {
    // if (this.createProjectForm.valid) {
    //   // Handle form submission logic here
    //   console.log(this.createProjectForm.value);
    // }
  }

  // get tasksFormArray() {
  //   // return this.createProjectForm.get('tasks') as FormArray;
  // }

  addTask() {
    // const taskGroup = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   description: [''],
    //   dueDate: [''],
    //   status: ['not-started'],
    //   assignees: ['']
    // });
    // this.tasksFormArray.push(taskGroup);
  }

  removeTask() {
    // this.tasksFormArray.removeAt(index);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    // Handle file upload logic here
    console.log(files);
  }
}