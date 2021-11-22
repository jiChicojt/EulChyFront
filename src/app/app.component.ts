import {Component, OnInit} from '@angular/core';
import {EquationModel} from "./models/equation.model";
import {SolverService} from "./services/solver.service";
import {Form, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";


// @ts-ignore
const validateCauchyEuler:  ValidatorFn = (fGroup: FormGroup) =>{
  console.log("paso1");
  // @ts-ignore
  const equation1 = fGroup.get('equ').value;
  const equation2 = equation1.replace("-","+");
  const equationList = equation2.split("+");
  let verification;

  for (let i =0; i<(equationList.length-1);i++){
    console.log("paso2")
    const quotes= (equationList[i].match(/'/g)||[]).length
    const number = "("+quotes.toString()+")"
    const exponent = (equationList[i].match(new RegExp(number, "g"))||[])
    console.log(parseInt(exponent))
    if(parseInt(exponent)=== quotes){
      console.log("correcto")
      verification = null;
    } else {
      console.log("incorrecto")
      verification = {equals:true};
      break;
    }
  }
  console.log(verification)
  return verification;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  equationForm = this.formBuilder.group({
     equ:["",Validators.compose([Validators.required,Validators.pattern("^[-0-9A-Za-zñÑáéíóúÁÉÍÓÚ_ +\^=*()/.,']+$")])]
    },{validator: validateCauchyEuler});
  title = 'EulChy';
  equation: EquationModel = new EquationModel('')
  Hi = new FormControl("")

  validationMessages ={
    equ:[
      {type: 'required', message: 'Es obligatorio ingresar la ecuación'},
      {type: 'pattern', message: 'La ecuación ingresada contiene caracteres inválidos'}
    ]
  }

  constructor(private solverService: SolverService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(){

  }

  solve() {
    this.equation.equation = this.equationForm.get('equ')?.value
    // Verificaciones
    this.solverService.getSolution(this.equation).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }
}
