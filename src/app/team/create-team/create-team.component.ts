import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  createTeamForm: FormGroup;
  company: any;
  members: any[] = [];
  teamLeadSuggestions: any[] = [];
  memberSuggestions: any[] = [];
  selectedMembers: any[] = [];
  filteredTeamLeadSuggestions: any[] | undefined;
  filteredTeammemberSuggestions: any[] | undefined;
  mem: any[] | undefined;
  lead: any[] | undefined;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private teamService: TeamService, private router : Router) {
    this.createTeamForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      teamLeadId: ['', Validators.required],
      teamLeadName: ['', Validators.required], 
      members: [''],
      department: [''],
      status: [true],
      companyId: [this.company]
    });
  }

  ngOnInit() {
    this.company = this.userService.getCompany();
    console.log("company",this.company)
    this.userService.loadMembers({ companyId: this.company }).subscribe(
      (response: any) => {
        this.members = response.users;
        console.log("team",response)
        // Initialize team lead suggestions
        this.teamLeadSuggestions = this.members.filter(member => member.role === 'team-lead');
        // Initialize member suggestions
        this.memberSuggestions = this.members.filter(member => member.role == 'member');
      },
      (error?: any) => {
        console.log('Error fetching members:', error);
      }
    );
  }

  onSubmit() {

    console.log(this.selectedMembers, this.createTeamForm.get('teamLeadId')?.value, this.createTeamForm.get('members')?.value);
    const ids = this.selectedMembers.map(item => item._id);
    const memarray = this.createTeamForm.get('members')?.setValue(ids);
    this.createTeamForm.get('companyId')?.setValue(this.company);
    console.log(this.createTeamForm.value);
    this.teamService.createTeam(this.createTeamForm.value).subscribe(
      (response: any) => {
        console.log("to response h ",response);
        this.router.navigate([`/source/team`]);
      }
    )


  }

  selectTeamLead(member: any) {
    this.createTeamForm.get('teamLeadId')?.setValue(member._id); // Set the ID
    this.createTeamForm.get('teamLeadName')?.setValue(member.name); // Set the name
    
  }

  selectTeamMember(member: any) {
    const selectedMember = this.createTeamForm.get('members')?.value;
    if (!this.selectedMembers.includes(selectedMember)) {
      this.selectedMembers.push(member); // Push the whole member object
    }
    // Clear input field after selecting member
    this.createTeamForm.get('members')?.setValue('');
  }
  

  filterTeamLead(target: any) {
    // Filter members based on input value
    if (target.value) {
      // Filter out team members from the suggestions
      this.filteredTeamLeadSuggestions = this.members
        .filter(member =>
          member.name.toLowerCase().includes(target.value.toLowerCase()) &&
          member.role === 'team-lead' &&
          !this.selectedMembers.some(selected => selected._id === member._id) // Check if the member is not already in the team
        )
        .slice(0, 3); // Limit the suggestions to the first three
      // Assign filtered suggestions to this.lead
      this.lead = this.filteredTeamLeadSuggestions;
    } else {
      this.filteredTeamLeadSuggestions = [];
      // Clear this.lead if no input value
      this.lead = [];
    }
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
  
  removeMember(mem:any){}
  hideSuggestionsMem() {
    // Clear filtered suggestions when a suggestion is clicked
    this.mem = this.filteredTeammemberSuggestions;
    this.filteredTeammemberSuggestions = [];
  }
  hideSuggestionsLead() {
    // Clear filtered suggestions when a suggestion is clicked
    this.lead = this.filteredTeamLeadSuggestions;
    this.filteredTeamLeadSuggestions = [];
  }

}
