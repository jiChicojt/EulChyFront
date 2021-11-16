import { Component } from '@angular/core';
import {EquationModel} from "./models/equation.model";
import {SolverService} from "./services/solver.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EulChy';
  equation: EquationModel = new EquationModel('')

  constructor(private solverService: SolverService) {

  }

  solve() {
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
