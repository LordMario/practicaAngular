import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { producto } from '../interface/producto.interface';
import { datosProducto } from '../interface/datosproducto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos : producto []=[];
  productosBusqueda : producto []=[];
  producto  : datosProducto  | undefined ;
  cargando =true;
  cargandoItem = true;

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }


  private cargarProductos(){
    return new Promise<void>((resolve,reject)=>{
      this.http.get<producto []>('https://angular-html-7b159-default-rtdb.firebaseio.com/productos_idx.json').subscribe((resp : producto [])=>{
        this.productos= resp;
        this.cargando=false;
        resolve();
      })
    })
   
  }

  productosBusquedaTermino ( termino : string){
    if(this.productos.length==0){
      this.cargarProductos().then(()=>{
        //se ejecuta despues de tener los productos
        this.filtarProductos(termino);
      })
    }else{
      this.filtarProductos(termino);
    }
  }

  private filtarProductos(termino : string){
    this.productosBusqueda=[];
    termino=termino.toLowerCase();
    this.productos.filter(produc =>{
      if(produc.categoria.toLowerCase().indexOf(termino)>= 0 || produc.titulo.toLowerCase().indexOf(termino)>= 0  ){
        this.productosBusqueda.push(produc);
        console.log("entrooo");
      }
    });
  }

  productoPorId(id : string){
    this.cargandoItem = false;
    return this.http.get<datosProducto>(`https://angular-html-7b159-default-rtdb.firebaseio.com/productos/${id}.json`);
  }
}
