import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      notes: ['']
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

  onFileSelected(event: any) {
    const files = event.target.files;
    // Handle file upload logic here
    console.log(files);
  }
}
