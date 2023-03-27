import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit{

  heroe: HeroeModel = new HeroeModel();

  constructor( private heroesServices: HeroesService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    // const id = this.route.params.subscribe(  (param: any) => param.id );
    const id = this.route.snapshot.paramMap.get('id')!;
    
    if( id !== 'nuevo' )  {
      this.heroesServices.getHeroe( id )
          .subscribe(( resp: any) => {
            this.heroe = resp;
            this.heroe.id = id;
          });
    }


  }

  guardar( form: NgForm) {

    if( form.invalid ) {
      console.log('Formulario no valido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando informacion',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion: Observable<any>

    if( this.heroe.id ){
      peticion = this.heroesServices.actualizarheroe( this.heroe );

    } else {

      peticion =  this.heroesServices.crearHeroe( this.heroe );
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizo correctamente',
        icon: 'success'
      })
    } )
    
  }

}
