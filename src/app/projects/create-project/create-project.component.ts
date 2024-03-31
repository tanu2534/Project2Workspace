import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  createProjectForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createProjectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectDescription: [''],
      startDate: [''],
      endDate: [''],
      projectStatus: ['not-started'],
      projectPriority: ['low'],
      projectOwner: ['', Validators.required],
      teamLead: ['', Validators.required],
      tags: [''],
      notes: [''], 
      tasks: this.formBuilder.array([])
    });
  }


  ngOnInit() {
    // Additional initialization logic, if needed
  }

  onSubmit() {
    if (this.createProjectForm.valid) {
      // Handle form submission logic here
      console.log(this.createProjectForm.value);
    }
  }

  get tasksFormArray() {
    return this.createProjectForm.get('tasks') as FormArray;
  }

  addTask() {
    const taskGroup = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: [''],
      status: ['not-started'],
      assignees: ['']
    });
    this.tasksFormArray.push(taskGroup);
  }

  removeTask(index: number) {
    this.tasksFormArray.removeAt(index);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    // Handle file upload logic here
    console.log(files);
  }
}
