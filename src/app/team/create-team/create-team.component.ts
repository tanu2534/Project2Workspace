import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent {
  createTeamForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createTeamForm = this.formBuilder.group({
      teamName: ['', Validators.required],
      teamDescription: [''],
      teamLead: ['', Validators.required],
      teamMembers: ['']
    });
  }

  ngOnInit() {
    // Additional initialization logic, if needed
  }

  onSubmit() {
    if (this.createTeamForm.valid) {
      // Handle form submission logic here
      console.log(this.createTeamForm.value);
    }
  }
}
