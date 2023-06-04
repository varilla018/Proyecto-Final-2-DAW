import { Component, ViewChild, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Plugins } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  logros = [
    {
      icono: 'trophy',
      titulo: 'Logro 1',
      subtitulo: 'Descripción del logro 1',
    },
    // Agrega más logros aquí si lo necesitas
  ];

  public nombre: string = '';
  public fotoPerfil: SafeResourceUrl = '../../../assets/slides/avatar2.jpg';

  constructor(
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.authService.getUserDetails().subscribe(
      (data) => {
        this.nombre = data.first_name; // Asegúrate de que 'first_name' es el campo correcto
      },
      (error) => {
        console.error('Failed to fetch user details:', error);
      }
    );

    const storedFotoPerfil = localStorage.getItem('fotoPerfil');
    if (storedFotoPerfil) {
      this.fotoPerfil = this.sanitizer.bypassSecurityTrustResourceUrl(storedFotoPerfil);
    }
  }

  async cambiarFotoPerfil() {
    try {
      const image = await Camera['getPhoto']({
        quality: 90,
        allowEditing: false,
        resultType: 'dataUrl',
        source: 'photos',
      });

      if (image && image.dataUrl) {
        this.fotoPerfil = this.sanitizer.bypassSecurityTrustResourceUrl(image.dataUrl);
        localStorage.setItem('fotoPerfil', image.dataUrl);
      }
    } catch (error) {
      console.error('Failed to get photo:', error);
    }
  }
}
