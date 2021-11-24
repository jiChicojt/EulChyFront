import {Component, OnInit} from '@angular/core';
import {EquationModel} from "./models/equation.model";
import {SolverService} from "./services/solver.service";
import {Form, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";


let grado=0;
// @ts-ignore
const validateCauchyEuler:  ValidatorFn = (fGroup: FormGroup) =>{
  console.log("paso1");
  // @ts-ignore
  const equation1 = fGroup.get('equ').value.split("=");
  const sinIgual = equation1[0]
  console.log(sinIgual)
  const equation2 = sinIgual.replace("-","+");
  const equationList = equation2.split("+");
  let verification;
  grado = (equationList.length-1)

  for (let i =0; i<(equationList.length-1);i++){
    console.log("paso2")
    const quotes= (equationList[i].match(/'/g)||[]).length
    console.log(quotes)
    const exponent = (equationList[i].match(new RegExp("("+quotes.toString()+")", "g"))||[])
    console.log(exponent)
    //console.log(parseInt(exponent))
    if(parseInt(exponent)=== quotes){
      //console.log("correcto")
      verification = null;
    } else {
      //console.log("incorrecto")
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
  respuesta = '';
  mostrar = true;
  grad = '';
  sust ='';
  auxEq = '';
  answ = '';

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
        this.mostrar = false;
        this.grad = grado.toString()
        const derivadas = data.steps.derivatives.reverse();
        for(let i =0; i<(data.steps.derivatives.length-1);i++){
          const deriv = i+1
          this.respuesta += deriv + "° derivada: " + derivadas[deriv] + '\n';
        };
        this.sust = data.steps.substitution;
        this.auxEq = data.steps.auxEq + "\n= " + data.steps.xAuxEq;
        for(let i =0; i<(data.steps.solutions.length); i++){
          this.answ += "m = "+ data.steps.solutions[i]+'\n';
        }
        console.log(this.answ)
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }
}
