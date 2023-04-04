import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { producto } from '../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos : producto []=[];
  cargando =true;

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }


  private cargarProductos(){
    this.http.get<producto []>('https://angular-html-7b159-default-rtdb.firebaseio.com/productos_idx.json').subscribe((resp : producto [])=>{
      this.productos= resp;
      this.cargando=false;
    })
  }
}
