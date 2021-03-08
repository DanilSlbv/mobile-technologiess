import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {

  public navigate =
    [
      {
        title: "All",
        url: "/"
      },
      {
        title: "Create",
        url: "/create"
      }
    ]

  constructor(
    private translate: TranslateService,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.translate.setDefaultLang('en');
    this.screenOrientation.unlock();
    this.screenOrientation.onChange().subscribe(
      () => {
        console.log("Orientation Changed");
      }
    );
  }
}