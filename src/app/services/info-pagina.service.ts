import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { infoPagina } from '../interface/info-pagina.interface';
import { equipoInterface } from '../interface/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info : infoPagina = {};
  equipo  : equipoInterface [] = [] ;
  cargada = false;

  constructor( private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo(){
    this.http.get('assets/data/data-pagina.json').subscribe((resp : infoPagina) =>{
      this.info = resp;
    })
  }
  private cargarEquipo(){
    this.http.get<equipoInterface[]>('https://angular-html-7b159-default-rtdb.firebaseio.com/equipo.json').subscribe( (resp : equipoInterface[] ) => {
      this.equipo = resp;
    })
  }
}
