import { Component } from '@angular/core';
import { UserDataModel } from './shared/models/userData.model';

const maxRColorValue = 255;
const maxGColorValue = 50;
const maxBColorValue = 140;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public usersData: Array<UserDataModel> = [
    {
      'name': 'Grace',
      'lastName': 'Hopper',
      'likesCount': 0,
      'heartColor': "#000000"
    },
    {
      'name': 'Dunder',
      'lastName': 'Mifflin',
      'likesCount': 0,
      'heartColor': "#000000"
    },
    {
      'name': 'Jenna',
      'lastName': 'Fisher',
      'likesCount': 0,
      'heartColor': "#000000"
    }
  ]

  constructor(
  ) {
  }

  public onLikeClicked(index: number): void {
    this.usersData[index].likesCount += 1;

    let rColorValue = this.usersData[index].likesCount * 10;
    let gColorValue = this.usersData[index].likesCount * 1;
    let bColorValue = this.usersData[index].likesCount * 5;
    if (rColorValue > maxRColorValue) {
      rColorValue = maxRColorValue
    }
    if (gColorValue > maxGColorValue) {
      gColorValue = maxGColorValue
    }
    if (bColorValue > maxBColorValue) {
      bColorValue = maxBColorValue
    }
    this.usersData[index].heartColor = `rgba(${rColorValue},${gColorValue},${bColorValue},1)`
  }

}