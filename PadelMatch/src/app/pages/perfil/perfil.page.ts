import { Component, ViewChild } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  logros = [
    {
      icono: 'trophy',
      titulo: 'Logro 1',
      subtitulo: 'Descripción del logro 1',
    },
    {
      icono: 'medal',
      titulo: 'Logro 2',
      subtitulo: 'Descripción del logro 2',
    },
    {
      icono: 'ribbon',
      titulo: 'Logro 3',
      subtitulo: 'Descripción del logro 3',
    },
    {
      icono: 'rocket',
      titulo: 'Logro 3',
      subtitulo: 'Descripción del logro 3',
    },
    // Agrega más logros aquí si lo necesitas
  ];

  @ViewChild('avatarImg') avatarImg: any;
  @ViewChild(IonModal)
  modal!: IonModal;

  oldPassword:string | undefined;
  newPassword:string | undefined;
  repeatNewPassword:string | undefined;

  public nombre: string = 'Sergio Varilla';
  public email: string = 'juanperez@gmail.com';
  public fotoPerfil: string = '../../../assets/slides/avatar2.jpg';
  message!: string;

  constructor(
    private toastController: ToastController,
    private modalController: ModalController
    ) { }

  async cambiarFotoPerfil() {
    if (Capacitor.isPluginAvailable('Camera')) {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt,
      });
      if (image && image.dataUrl) {
        this.fotoPerfil = image.dataUrl;
        const toast = await this.toastController.create({
          message: 'Foto de perfil cambiada con éxito',
          duration: 2000
        });
        toast.present();

        //Actualiza la imagen de avatar
        this.avatarImg.src = this.fotoPerfil;
      }
      
    } else {
      console.log('La cámara no está disponible en este dispositivo');
    }
  }
  

  onImgError() {
    this.fotoPerfil = 'assets/img/default-avatar.png';
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.oldPassword, 'confirm');
    this.modal.dismiss(this.newPassword, 'confirm');
    this.modal.dismiss(this.repeatNewPassword, 'confirm');

  }

  async onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
       if(this.oldPassword == this.newPassword){
        console.log('La contraseña antigua no puede ser igual que la nueva')
        if(this.newPassword != this.repeatNewPassword){
          console.log('Las contraseñas no son iguales')
        }else{
          const toast = await this.toastController.create({
            message: 'Contraseña cambiada!',
            duration: 2000
          });
          toast.present();
        }
      }
      
    }
  }
  
  
}
