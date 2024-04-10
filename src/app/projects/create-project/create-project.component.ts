import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormArray} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ProjectService } from 'src/app/services/project.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  createProjectForm: FormGroup;
  company: any
  members: any;
  teamLeadSuggestions: any;
  filteredTeamLeadSuggestions: any;
  selectedMembers: any;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private projectService: ProjectService,  private router : Router) {
    this.createProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      companyId: ['', Validators.required],
      description: [''],
      startDate: [''],
      status: ['not-started', Validators.required],
      priority: ['low'],
      teamLeadId: ['', Validators.required],
      teamLeadName: ['', Validators.required],
      tag: [''],
      notes: ['']
    });
  }


  ngOnInit() {
    this.company = this.userService.getCompany();
    console.log("company",this.company)
    this.createProjectForm.get('companyId')?.setValue(this.company);
    this.userService.loadMembers({ companyId: this.company }).subscribe(
      (response: any) => {
        this.members = response.users;
        console.log("team",response)
        // Initialize team lead suggestions
        this.teamLeadSuggestions = this.members.filter((member: any) => member.role === 'team-lead');
      },
      (error?: any) => {
        console.log('Error fetching members:', error);
      }
    );
  }

  onSubmit() {
    if (this.createProjectForm.valid) {
      // Get the start date from the form
      const startDate = this.createProjectForm.get('startDate')?.value;
      const sd = new Date(startDate);
      this.createProjectForm.get('startDate')?.setValue(sd.toISOString());
  
      // Get the current date
      const currentDate = new Date();
  
      // Check the status based on the start date and current date
      let status = 'not-started';
      if (startDate && currentDate >= new Date(startDate)) {
        if(this.createProjectForm.get('status')?.value === 'completed'){
          this.createProjectForm.get('status')?.setValue('completed'); // Set 'completed'
          status = 'completed';
        }
        else{
          this.createProjectForm.get('status')?.setValue('in-progress'); // Set 'completed'
          status = 'in-progress';
        }
        // status = 'in-progress';
      }
  
      // Update the status in the form
      this.createProjectForm.get('status')?.setValue(status);
  
      // Handle form submission logic here
      console.log(this.createProjectForm.value);
      
      this.projectService.createProject(this.createProjectForm.value).subscribe(
        (response: any) => {
          console.log("to response h ",response);
          this.router.navigate([`/source/projects`]);
        }
      )

    }
  }

  get tasksFormArray() {
    return this.createProjectForm.get('tasks') as FormArray;
  }

  hideSuggestionsLead() {
    // Clear filtered suggestions when a suggestion is clicked
    this.filteredTeamLeadSuggestions = [];
  }

  selectTeamLead(member: any) {
    this.createProjectForm.get('teamLeadId')?.setValue(member._id); // Set the ID
    this.createProjectForm.get('teamLeadName')?.setValue(member.name); // Set the name
    
  }

  filterTeamLead(target: any) {
    // Filter members based on input value
    if (target.value) {
      // Get the IDs of team leads who already have projects assigned to them
      const assignedTeamLeadIds = this.members.map((project: any) => project.project);
  
      // Filter out team members from the suggestions
      this.filteredTeamLeadSuggestions = this.members
        .filter((member: any) =>
          member.name.toLowerCase().includes(target.value.toLowerCase()) &&
          member.role === 'team-lead' &&
          !member.project &&
          !this.selectedMembers?.some((selected: any) => selected._id === member._id) && // Exclude already selected members
          !assignedTeamLeadIds?.includes(member._id) // Exclude team leads with already assigned projects
        )
        .slice(0, 3); // Limit the suggestions to the first three
  
      // Assign filtered suggestions to this.filteredTeamLeadSuggestions
      console.log("filtered", this.filteredTeamLeadSuggestions);
    } else {
      this.filteredTeamLeadSuggestions = [];
      // Clear this.filteredTeamLeadSuggestions if no input value
    }
  }
  
  

}
