import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
    this.createTeamForm = this.formBuilder.group({
      teamName: ['', Validators.required],
      teamDescription: [''],
      teamLead: ['', Validators.required],
      teamMembers: ['']
    });
  }

  ngOnInit() {
    this.company = this.userService.getCompany();
    this.userService.loadMembers({ companyId: this.company }).subscribe(
      (response: any) => {
        this.members = response.members;
        // Initialize team lead suggestions
        this.teamLeadSuggestions = this.members.filter(member => member.role === 'team lead');
        // Initialize member suggestions
        this.memberSuggestions = this.members.filter(member => member.role !== 'team lead');
      },
      (error?: any) => {
        console.log('Error fetching members:', error);
      }
    );
  }

  onSubmit() {
    if (this.createTeamForm.valid) {
      // Handle form submission logic here
      console.log(this.createTeamForm.value);
    }
  }

  selectTeamLead(member: any) {
    this.createTeamForm.get('teamLead')?.setValue(member.name);
  }

  selectTeamMember(member: any) {
    const selectedMember = this.createTeamForm.get('teamMembers')?.value;
    if (!this.selectedMembers.includes(selectedMember)) {
      this.selectedMembers.push(selectedMember);
    }
    // Clear input field after selecting member
    this.createTeamForm.get('teamMembers')?.setValue('');
  }
}
