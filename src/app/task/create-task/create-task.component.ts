import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  createTaskForm: FormGroup;
  company: any;
  filteredTeammemberSuggestions: any[] | undefined;
  memberSuggestions: any[] = [];
  mem: any[] | undefined;
  members: any[] = [];
  selectedMembers: any[] = [];

  constructor(private formBuilder: FormBuilder,private userService: UserService, private projectService: ProjectService,  private router : Router) {
    this.createTaskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      projectId: [''],
      projectName: [''],
      assignees: [''],
      status: ['not-started'],
      startDate: [''],
      priority: ['low'],
      deadline: ['']
    });
  }


  ngOnInit() {
    // Additional initialization logic, if needed
    this.company = this.userService.getCompany();
    console.log("company",this.company)
    this.userService.loadMembers({ companyId: this.company }).subscribe(
      (response: any) => {
        this.members = response.users;
        console.log("team",response)
        // Initialize member suggestions
        this.memberSuggestions = this.members.filter(member => member.role == 'member');
      }
    );
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


  hideSuggestionsMem() {
    // Clear filtered suggestions when a suggestion is clicked
    this.mem = this.filteredTeammemberSuggestions;
    this.filteredTeammemberSuggestions = [];
  }


  selectTeamMember(member: any) {
    const selectedMember = this.createTaskForm.get('assignees')?.value;
    if (!this.selectedMembers.includes(selectedMember)) {
      this.selectedMembers.push(member); // Push the whole member object
    }
    // Clear input field after selecting member
    this.createTaskForm.get('assignees')?.setValue('');
  }


  filterTeamMember(target: any) {
    // Filter members based on input value
    if (target.value) {
      this.filteredTeammemberSuggestions = this.members
        .filter(member => member.name.toLowerCase().includes(target.value.toLowerCase()) && member.role === 'member')
        .filter(member => !this.selectedMembers.some(selected => selected.name === member.name)) // Filter out selected members
        .slice(0, 3); // Limit the suggestions to the first three
      // Assign filtered suggestions to this.mem
      this.mem = this.filteredTeammemberSuggestions;
    } else {
      this.filteredTeammemberSuggestions = [];
      // Clear this.mem if no input value
      this.mem = [];
    }
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    // Handle file upload logic here
    console.log(files);
  }
}