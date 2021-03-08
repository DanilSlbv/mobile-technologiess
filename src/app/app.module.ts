import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateFormComponent } from './create-edit-form/create-edit-form.component';
import { SMS } from '@ionic-native/sms/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LocalizationComponent } from './shared/components/localization/localization.component';
import { File } from '@ionic-native/file/ngx';
import { MessagesListComponent } from './messages-list/messages-list.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    LocalizationComponent,
    MessagesListComponent
  ],
  entryComponents: [],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    SMS,
    File,
    ScreenOrientation,
    AndroidPermissions,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
