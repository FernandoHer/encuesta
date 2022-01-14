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
  
  tipoEvaluacion1:string[] =['Auto Evaluacion', 'Evaluar un Profesor', 'Evaluar un Directivo','Option 4'];
  teacher1:string[] =['Juan Perez', 'Anita Corozo', 'Tamara Gomez', 'Katty Megrano', 'Mario Fuentes'];
  teacher2:string[] =['Andrea Tipán', 'Francisco Peralta', 'Gualberto Intriago','Karla Keiloz', 'Lucia Loma' ];
  teacher3:string[] =['Daniel Duran', 'Ernesto Eguiguren', 'Humberto Haro', 'Ignacio Intriago', 'Jadira Jaen'];
  nombreEvaluador1:string[] =['Maria Montes','Sandra Zuleta','Carlos Perez','Juan Alvarez', 'Ricardo Zapata'];
  nuevoPersonasAEvaluar: FormControl =this.fb.control('',Validators.required);
  optionList:string[] = [];
  listPersons:string[] = [];

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

    if(this.personasAEvaluarArr.value.includes(selectedOption)){
      return console.log('Lo siento esta persona ya fue seleccionada')
    }
    this.personasAEvaluarArr.push(this.fb.control(selectedOption,[Validators.required,Validators.minLength(3)]));
    this.nuevoPersonasAEvaluar.reset();
  }

   borrar(index:number){
    console.log(this.miFormulario.controls['personasAEvaluar'].value[index]);
    this.personasAEvaluarArr.removeAt(index);
  };

  

  setAndFilterOptionList(e: KeyboardEvent){

    let inputValue = this.nuevoPersonasAEvaluar.value;
    this.listPersons = [];
    
    if(this.miFormulario.get('tipoEvaluacion')?.value === 'Evaluar un Profesor' ){
        this.listPersons = this.teacher1;
      } else if(this.miFormulario.get('tipoEvaluacion')?.value === 'Evaluar un Directivo' ){
            this.listPersons = this.teacher2;
              } else if(this.miFormulario.get('tipoEvaluacion')?.value === 'Option 4' ){
                  this.listPersons = this.teacher3;
                } 

    this.optionList = this.listPersons.filter((opt:string) => {
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
    this.personasAEvaluarArr.clear();
    this.miFormulario.setValue({
      tipoEvaluacion: '',
      nombreEvaluador: '',
      personasAEvaluar: []
    });
    this.listPersons=[];
    this.optionList=[];
      
  }

  
}
