import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  termino : string='';

  constructor(private route : ActivatedRoute, public productoService : ProductosService) { }

  ngOnInit(): void {
    this.route.params.subscribe( resp =>{
      this.termino =resp.termino;

      this.productoService.productosBusquedaTermino(this.termino);
    })
  }

}
