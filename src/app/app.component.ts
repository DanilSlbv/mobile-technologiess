import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public toogleValue1: boolean = false;
  public toogleValue2: boolean = false;
  public toogleValue3: boolean = false;

  constructor(
  ) {
  }

}