import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EncuestaService } from '../../../services/encuesta.service';

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
  
 
  teacher1:string[] =[];
  teacher2:string[] =[];
  teacher3:string[] =[];

  nuevoPersonasAEvaluar: FormControl =this.fb.control('',Validators.required);
  optionList:string[] = [];
  listPersons:string[] = [];
  tipoEvaluacion1:string[] = [];
  nombreEvaluador1:string[] = [];

  get personasAEvaluarArr(){
    return this.miFormulario.get('personasAEvaluar') as FormArray;
  }


  index:number = 0


  constructor(private fb:FormBuilder,
              private encuestaService: EncuestaService) { }

  

  ngOnInit(): void {
    this.encuestaService.getData('tipoEvaluacion1').subscribe(tipo => this.tipoEvaluacion1 = tipo);
    this.encuestaService.getData('nombreEvaluador1').subscribe(nombre => this.nombreEvaluador1 = nombre);
    this.encuestaService.getData('teacher1').subscribe(teach =>this.teacher1 = teach);
    this.encuestaService.getData('teacher2').subscribe(teach =>this.teacher2 = teach);
    this.encuestaService.getData('teacher3').subscribe(teach =>this.teacher3 = teach);
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
    // this.listPersons = [];
    
    if(this.miFormulario.get('tipoEvaluacion')?.value === 'Evaluar un Profesor' ){
        this.listPersons = this.teacher1
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
