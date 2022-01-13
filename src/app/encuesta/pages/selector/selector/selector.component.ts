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
      personasAEvaluar: this.fb.array ([ ])
    }
  )
  
  tipoEvaluacion1:string[] =['Auto Evaluacion', 'Evaluar un Profesor', 'Evaluar un Directivo'];
  personasAEvaluar1:string[] =['Juan Perez', 'Anita Corozo', 'Tamara Gomez', 'Katty Megrano', 'Mario Fuentes'];
  nombreEvaluador1:string[] =['Carlos Perez','Juan Alvarez', 'Ricardo Zapata'];
  nuevoPersonasAEvaluar: FormControl =this.fb.control('',Validators.required);
  optionList:string[] = [];

  get personasAEvaluarArr(){
    return this.miFormulario.get('personasAEvaluar') as FormArray;
  }


  index:number = 0


  constructor(private fb:FormBuilder) { }

  

  ngOnInit(): void {

    
    // this.personasAEvaluarArr.push(this.fb.control(this.personasAEvaluar1,[Validators.required,Validators.minLength(3)]));
  
  }

  campoNoEsValido(campo:string){
    return this.miFormulario.controls[campo].value !== 'Auto Evaluacion' 
            && this.miFormulario.controls[campo].value !== ''
    // return this.miFormulario.controls[campo].errors
    //       && this.miFormulario.controls[campo].touched
  };

  agregarFavorito(selectedOption:string){

    this.personasAEvaluarArr.push(this.fb.control(selectedOption,[Validators.required,Validators.minLength(3)]));
    this.nuevoPersonasAEvaluar.reset();
  }

   borrar(index:number){
    console.log(this.miFormulario.controls['personasAEvaluar'].value[index]);
    this.personasAEvaluarArr.removeAt(index);
  };

  

  setAndFilterOptionList(e: KeyboardEvent){

    let inputValue = this.nuevoPersonasAEvaluar.value;

    this.optionList = this.personasAEvaluar1.filter((opt:string) => {
      return opt.toLocaleLowerCase().indexOf(inputValue.toLocaleLowerCase()) > -1
    })
      
   }

  

  guardar(){
    if( this.miFormulario.invalid){ return };
    if(this.miFormulario.get('tipoEvaluacion')?.value === 'Auto Evaluacion' ){
      this.personasAEvaluarArr.clear();
      this.personasAEvaluarArr.push(this.miFormulario.controls['nombreEvaluador']);
      
    }
    console.log (this.miFormulario.value);
    this.miFormulario.setValue({
      tipoEvaluacion: '',
      nombreEvaluador: '',
      personasAEvaluar: ['']
    });
      
  }

  
}
