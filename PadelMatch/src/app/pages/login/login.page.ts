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

  iniciarSesion() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.loginUser(user).subscribe(
      (data: any) => {
        this.router.navigate(['/home']);
      },
      (error: any) => {
        this.presentToast('Error al iniciar sesión');
        console.log(error);
      }
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
