import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = new FormControl('');
  password = new FormControl('');
  loginError: string = '';

  constructor() {}

  login() {
    if (this.email.value === 'asd@gmail.com' && this.password.value === 'asd') {
      localStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        window.location.href = '/';
        console.log('átirányítás pipa')
      }, 3000);
    } else {
      this.loginError = 'Hibás felhasználó név vagy jelszó!';
    }
  }
}
