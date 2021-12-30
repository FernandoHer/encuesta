import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styles: [
  ]
})
export class SelectorComponent implements OnInit {

  miFormulario:FormGroup = this.fb.group(
    {
      tipoEvaluacion: ['',Validators.required],
      nombreEvaluado: ['',Validators.required],
      respuesta: ['', Validators.required]
    }
  )
  
  tipoEvaluacion:string[] =[];
  nombreEvaluado:string[] =[];
  index:number = 0


  constructor(private fb:FormBuilder) { }

  

  ngOnInit(): void {
    this.tipoEvaluacion = [
      'Auto Evaluacion', 'Evaluar un Profesor', 'Evaluar un Directivo'
    ];

    // codigo del Alunmo la primera posicion
    this.nombreEvaluado =[
      'A1','Carlos Perez','Juan Alvarez', 'Ricardo Zapata'
    ];
   
  }

  

  guardar(){
    console.log(this.miFormulario.value);
  }

  
}
