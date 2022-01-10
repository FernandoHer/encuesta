import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
      nombreEvaluador: ['',Validators.required],
      personasAEvaluar: this.fb.array ([
      ['Juan Perez',[ Validators.required,Validators.minLength(3)]],
      ['Anita Corozo',[ Validators.required,Validators.minLength(3)]],
      ['Tamara Gomez',[ Validators.required,Validators.minLength(3)]],
      ['Katty Megrano',[ Validators.required,Validators.minLength(3)]],
      ['Mario Fuentes',[ Validators.required,Validators.minLength(3)]]
        
      ])
    }
  )
  
  tipoEvaluacion:string[] =[];
  personasAEvaluar:string[] =[];
  nombreEvaluador:string[] =[];
  nuevoPersonasAEvaluar: FormControl =this.fb.control('',Validators.required);

  get personasAEvaluarArr(){
    return this.miFormulario.get('personasAEvaluar') as FormArray;
  }


  index:number = 0


  constructor(private fb:FormBuilder) { }

  

  ngOnInit(): void {
    this.tipoEvaluacion = [
      'Auto Evaluacion', 'Evaluar un Profesor', 'Evaluar un Directivo'
    ];

    // Persona a Evaluar
    this.nombreEvaluador =[
      'Carlos Perez','Juan Alvarez', 'Ricardo Zapata'
    ];

  
  }

  agregarFavorito(){
    if(this.nuevoPersonasAEvaluar.invalid){
      return;
    }
    // this.favoritosArr.push(new FormControl(this.nuevoFavorito.value,[Validators.required,Validators.minLength(3)]));
    this.personasAEvaluarArr.push(this.fb.control(this.nuevoPersonasAEvaluar.value,[Validators.required,Validators.minLength(3)]));
    this.nuevoPersonasAEvaluar.reset();
  }

  borrar(index:number){
    console.log(this.miFormulario.controls['personasAEvaluar'].value[index]);
    this.personasAEvaluarArr.removeAt(index);
  };
  

  guardar(){
    console.log(this.miFormulario.value);
  }

  
}
