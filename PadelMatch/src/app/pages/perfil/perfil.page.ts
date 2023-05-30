import { Component, ViewChild, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

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
  public fotoPerfil: string = '../../../assets/slides/avatar2.jpg';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getUserDetails().subscribe((data) => {
      this.nombre = data.first_name; // Asegúrate de que 'first_name' es el campo correcto
    }, (error) => {
      console.error("Failed to fetch user details:", error);
    });
  }
}
