import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  first_name: string = "";
  email: string = "";
  password: string = "";

  constructor(private authService: AuthService, private router: Router, public toastController: ToastController) { }

  registrar() {
    const user = {
      first_name: this.first_name,
      email: this.email,
      password: this.password
    };
    this.authService.registerUser(user).subscribe(
      data => {
        console.log(data);
        if (data.hasOwnProperty('email_taken') && data.email_taken) {
          this.presentToast('Ya existe una cuenta con este email.');
        } else {
          this.presentToast('Registrado correctamente.');
          this.router.navigate(['/login']);
        }
      },
      error => console.log(error)
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
