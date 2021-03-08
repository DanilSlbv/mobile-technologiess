import { Component } from '@angular/core';

const maxRColorValue = 255;
const maxGColorValue = 50;
const maxBColorValue = 140;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public iconColor: string = "#000000";
  public likesCount: number = 0;

  constructor(
  ) {
  }

  public onLikeClicked(): void {
    this.likesCount += 1;

    let rColorValue = this.likesCount * 10;
    let gColorValue = this.likesCount * 1;
    let bColorValue = this.likesCount * 5;
    if (rColorValue > maxRColorValue) {
      rColorValue = maxRColorValue
    }
    if (gColorValue > maxGColorValue) {
      gColorValue = maxGColorValue
    }
    if (bColorValue > maxBColorValue) {
      bColorValue = maxBColorValue
    }
    this.iconColor = `rgba(${rColorValue},${gColorValue},${bColorValue},1)`
  }

}