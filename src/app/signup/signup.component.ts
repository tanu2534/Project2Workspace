import { Component , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { CompanyService } from '../services/company.service';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

interface User {
  name: string;
  email: string;
  password: string;
  company?: string;
  role: string;
  teamName?: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @ViewChild('stepper')
  stepper!: MatStepper;
  signupForm: FormGroup;
  alreadyUser: boolean = false;
  alreadyCompany: boolean = true;
  user: User = {
    name: '',
    email: '',
    password: '',
    company: '',
    role: '',
    teamName: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private companyService: CompanyService,
    private router : Router
  ) {
    this.signupForm = this.formBuilder.group({
      personalInfo: this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
     
      }),
      accountInfo: this.formBuilder.group({
        company: ['', Validators.required],
        role: ['', Validators.required],
      })
    });
  }

  get personalInfoForm(): FormGroup {
    return this.signupForm.get('personalInfo') as FormGroup;
  }

  get accountInfoForm(): FormGroup {
    return this.signupForm.get('accountInfo') as FormGroup;
  }

  async onSubmit() {
    console.log("in submit")
    if (this.signupForm.valid) {
      
      this.alreadyCompany = await this.companyLoad(this.accountInfoForm.get('company')?.value);
      if(this.accountInfoForm.get('role')?.value !== 'admin'){
        console.log("company if u r not admin",this.alreadyCompany)
        if(!this.alreadyCompany){
          window.alert('Company does not exist');
          this.stepper.selectedIndex = 0;
          return;
        }
      }else{
        console.log("company if u r admin",this.alreadyCompany)
        if(this.alreadyCompany){
          window.alert('Company already exist');
          this.stepper.selectedIndex = 0;
          return;
        }
      }


      const formValue = this.signupForm.value;
      this.user = {
        name: formValue.personalInfo.name,
        email: formValue.personalInfo.email,
        password: formValue.personalInfo.password,
        company: formValue.accountInfo.company,
        role: formValue.accountInfo.role
      };

      this.userService.register(this.user).subscribe(
        (response:any) => {
          console.log('Registration successful:', response);
          localStorage.setItem('userData', JSON.stringify(response));
          localStorage.setItem('token', response.token);
          this.stepper.selectedIndex = 2;

          this.router.navigate(['/source/board']);

          
        },
        (error) => {
          console.error('Registration failed:', error);
          window.alert(error.error.message);
          this.stepper.selectedIndex = 0;
        }
      );


    }else{
      window.alert('Please enter a valid information');
      this.stepper.selectedIndex = 0;
    }
  }

  async findCom() {
    // console.log("dfdfdffsdf", this.personalInfoForm.get('company')?.value);
    console.log("dfdfdffsdf", this.personalInfoForm.valid);
  
    if (!this.personalInfoForm.valid) {
      window.alert('Please enter a valid email and company');
    } else {
      // const company = this.personalInfoForm.get('company')?.value;
      const email = this.personalInfoForm.get('email')?.value;
  
      this.alreadyUser = await this.userLoad(email);
      // this.alreadyCompany = await this.companyLoad(company);
  
      if (this.alreadyUser) {
        window.alert('User Already Exists');
      }
  
      // if (this.alreadyCompany) {
      //   window.alert('Company does not exist');
      // }
  
      if (!this.alreadyUser) {
        console.log(this.alreadyCompany, this.alreadyUser);
        this.stepper.selectedIndex = 1;
      }
    }
  }
  
  async userLoad(email: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.userService.findOne({ email: email }).subscribe(
        (response: any) => {
          console.log(response);
          resolve(true);
        },
        (error) => {
          console.error(error);
          resolve(false);
        }
      );
    });
  }
  
  async companyLoad(company: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.companyService.findOne({ name: company }).subscribe(
        (response: any) => {
          console.log(response);
          resolve(true);
        },
        (error) => {
          console.error(error);
          resolve(false);
        }
      );
    });
  }
}