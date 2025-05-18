import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { User } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signup',
  imports: [MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    RouterLink,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  options = ['Művész', 'Vevő', 'Mindkettő'];

  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    place: new FormControl(''),
  });

  isLoading = false;
  showForm = true;
  signupError = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Please correct any errors on the form before submitting.';
      return;
    }

    const password = this.signUpForm.get('password')?.value;
    const rePassword = this.signUpForm.get('rePassword')?.value;
    
    if (password !== rePassword) {
      this.signupError = 'The passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const userData: Partial<User> = {
      name: this.signUpForm.value.name || '',
      email: this.signUpForm.value.email || '',
      phone: this.signUpForm.value.phone || '',
      place: this.signUpForm.value.email || '',
    };

    const email = this.signUpForm.value.email || '';
    const pw = this.signUpForm.value.password || '';

    this.authService.signUp(email, pw, userData)
      .then(userCredential => {
        console.log('Registration succesful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Regisztrációs hiba:', error);
        this.isLoading = false;
        this.showForm = true;
        
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'This email already in use.';
            break;
          case 'auth/invalid-email':
            this.signupError = 'Invalid email.';
            break;
          case 'auth/weak-password':
            this.signupError = 'The password is too weak. Use at least 6 characters.';
            break;
          default:
            this.signupError = 'An error has occurred during registration. Please try again later.';
        }
      });
  }
}
