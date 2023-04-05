import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { datosProducto } from 'src/app/interface/datosproducto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  producto : datosProducto | undefined ;
  id : string="";
  constructor(private route : ActivatedRoute, public productoService : ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe(resp=>{
      this.id =  resp.id;
    });
    this.productoService.productoPorId(this.id).subscribe((resp: datosProducto)=>{
      this.producto=resp;
    });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.productoService.cargandoItem=true;
    this.id="";
  }

}
