import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  first_name: string = "";
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService) { }

  registrar() {
    const user = {
      first_name: this.first_name,
      email: this.email,
      password: this.password
    };
    this.authService.registerUser(user).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}
