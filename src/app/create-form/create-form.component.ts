import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SMS } from '@ionic-native/sms/ngx';
import { CreateFormModel } from '../shared/models/create-form.model';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesEnum } from '../shared/enums/languages.enum';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {

  public createForm: FormGroup = new FormGroup({
    name: new FormControl(""),
    address: new FormControl(""),
    percent: new FormControl(""),
    paymentSum: new FormControl(""),
    phoneNumber: new FormControl("")
  });

  constructor(
    public toastController: ToastController,
    private sms: SMS,
    private androidPermissions: AndroidPermissions,
    private translateService: TranslateService) { }

  ngOnInit() { }

  public checkPermission(): void {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      this.sendMessage();
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  private sendMessage(): void {
    let createFormObject: CreateFormModel = {
      name: this.createForm.controls.name.value,
      address: this.createForm.controls.address.value,
      percent: this.createForm.controls.percent.value,
      paymentSum: this.createForm.controls.paymentSum.value
    };
    let message: string = `HELLO, ${createFormObject.name ? createFormObject.name : ''}
    ${createFormObject.address ? `${createFormObject.address}` : ''}
    ${createFormObject.percent ? `PERCENT:${createFormObject.percent}%.` : ''}
    ${createFormObject.paymentSum ? `SUM:$${createFormObject.paymentSum}` : ''}. BILLING INFO`;

    this.sms.send(this.createForm.controls.phoneNumber.value.internationalNumber, message, {
      replaceLineBreaks: true
    }).then(() => {
      this.createForm.reset();
      this.showNotification(this.translateService.instant('create-form.message-send-success'), true);
    }).catch(() => {
      this.showNotification(this.translateService.instant('create-form.message-send-success'), false);
    });
  }

  public async showNotification(message: string, isSuccess: boolean): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: isSuccess ? 'success' : 'warning'
    });
    toast.present();
  }

}
