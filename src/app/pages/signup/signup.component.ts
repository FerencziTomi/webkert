import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  options = ['Művész', 'Vevő', 'Mindkettő'];

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(11)]),
    place: new FormControl('', [Validators.required, Validators.maxLength(40)]),
  });
  error="";
  
  constructor(private router: Router) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.error = 'Please correct the form errors before submitting.';
      return;
    }

    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      return;
    }

    //this.isLoading = true;
    //this.showForm = false;

    const newUser: User = {
      name: this.signUpForm.value.name || '',
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      phone: this.signUpForm.value.phone || '',
      place: this.signUpForm.value.place || ''
    };

    console.log('New user:', newUser);
    console.log('Form value:', this.signUpForm.value);

    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 2000);
  }
}
