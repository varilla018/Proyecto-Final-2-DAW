import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email: string = "";
  password: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    public toastController: ToastController
  ) { }

  login() {
    const user = {
      email: this.email,
      password: this.password
    };
    this.authService.loginUser(user).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('user_id', data.user_id);
        this.router.navigate(['/home']);
      },
      error => {
        console.log(error);
        this.presentToast('Error al iniciar sesión');
      }
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
