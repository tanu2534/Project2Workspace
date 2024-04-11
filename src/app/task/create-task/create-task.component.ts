import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray, FormControl} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
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
  projects: any;
  filteredProjectsSuggestions: any[] = [];
  minDate: any;

  constructor(private formBuilder: FormBuilder,private userService: UserService, private projectService: ProjectService,  private router : Router, private taskService : TaskService

  ) {
    this.createTaskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      projectId: ['', Validators.required],
      projectName: ['', Validators.required],
      assignees: ['', Validators.required],
      assigneesName: ['', Validators.required],
      status: ['in-progress'],
      startDate: [''],
      priority: ['low'],
      companyId: [''],
      deadline: ['', [Validators.required]]
    });

    const today = new Date();
    this.minDate = this.formatDate(today);
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
    this.projectService.getAllProjects({ companyId: this.company, status: 'in-progress' }).subscribe(
      (response: any) => {
        // this.filteredTeammemberSuggestions = response.projects;
        this.projects = response
        console.log("project",response)
      }
    )
  }


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  noFutureDateValidator(control: FormControl) {
    const today = new Date();
    const selectedDate = new Date(control.value);
  
    if (selectedDate < today) {
      return { noFutureDate: true };
    }
  
    return null;
  }

  onSubmit() {
    if(this.createTaskForm.valid){
      const sd = new Date();
      this.createTaskForm.get('startDate')?.setValue(sd.toISOString());
      const deadline = this.createTaskForm.get('deadline')?.value;
      const dd = new Date(deadline);
      this.createTaskForm.get('deadline')?.setValue(dd.toISOString());
      this.createTaskForm.get('companyId')?.setValue(this.company)
      console.log( "create task",this.createTaskForm.value);

      this.taskService.createTask(this.createTaskForm.value).subscribe(
        (response: any) => {
          console.log("to response h ",response);
          this.router.navigate(['/source/task']);
        }
      )
    }
    // if (this.createProjectForm.valid) {
    //   // Handle form submission logic here
    //   console.log(this.createProjectForm.value);
    // }
  }
  get tasks(): FormArray {
    return this.createTaskForm.get('tasks') as FormArray;
  }

  // get tasksFormArray() {
  //   // return this.createProjectForm.get('tasks') as FormArray;
  // }

  addTask() {
    console.log("add task",this.createTaskForm.value);
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
  hideSuggestionsPro() {
    this.filteredProjectsSuggestions = [];
  }

filterProjects(target: any){
console.log("a",target);
if (target.value) {
  this.filteredProjectsSuggestions = this.projects
    .slice(0, 3); // Limit the suggestions to the first three
  // Assign filtered suggestions to this.mem
  this.mem = this.filteredProjectsSuggestions;
} else {
  this.filteredProjectsSuggestions = [];
  // Clear this.mem if no input value
  this.mem = [];
}
}


  selectTeamMember(member: any) {
    this.createTaskForm.get('assignees')?.setValue(member._id); // Set the ID
    this.createTaskForm.get('assigneesName')?.setValue(member.name); // Set the name
  }

  selectProjects(member: any) {
    this.createTaskForm.get('projectId')?.setValue(member._id); // Set the ID
    this.createTaskForm.get('projectName')?.setValue(member.name); // Set the name
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