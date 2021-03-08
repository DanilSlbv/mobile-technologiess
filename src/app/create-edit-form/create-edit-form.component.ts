import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SMS } from '@ionic-native/sms/ngx';
import { CreateEditFormModel } from '../shared/models/create-edit-form.model';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { MessageFileModel } from '../shared/models/message-file.model';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-edit-form.component.html',
  styleUrls: ['./create-edit-form.component.scss'],
})
export class CreateFormComponent implements OnInit {

  private _messageFileName: string = "";
  
  public createEditForm: FormGroup

  public get isCanRemoveMessage(): boolean {
    if (this._messageFileName) {
      return true;
    }
    return false;
  }

  constructor(
    public toastController: ToastController,
    private sms: SMS,
    private fileService: FileService,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
    private androidPermissions: AndroidPermissions,
    private translateService: TranslateService) { }

  async ngOnInit() {
    this.checkRoute();
  }

  private checkRoute(): void {
    this.route.params.subscribe(params => {
      this._messageFileName = params["messageFileName"];
      this.initialize();
    })
  }

  public checkPermission(): void {
    this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SEND_SMS).then(() => {
      this.sendMessage();
    }).catch((err) => {
      alert(JSON.stringify(err));
    });
  }

  public removeMessage() {
    if (!this.isCanRemoveMessage) {
      return;
    }
    this.fileService.removeMessage(this._messageFileName).then(() => {
      this.createEditForm.reset();
      this.showNotification(this.translateService.instant('create-form.message-remove-success'), true);
    }).catch(() => {
      this.showNotification(this.translateService.instant('create-form.message-remove-error'), false);
    })
  }

  private initialize(): void {
    this.initiateForm();
    this.fileService.getMessageFileAsText(this._messageFileName).then((fileString: string) => {
      let messageFileModel: MessageFileModel = JSON.parse(fileString);
      this.initiateForm(messageFileModel);
    });
  }

  private sendMessage(): void {
    let createFormObject: CreateEditFormModel = {
      name: this.createEditForm.controls.name.value,
      address: this.createEditForm.controls.address.value,
      percent: this.createEditForm.controls.percent.value,
      paymentSum: this.createEditForm.controls.paymentSum.value
    };
    let message = this.getMessageText(createFormObject);

    this.sms.send(this.createEditForm.controls.phoneNumber.value.internationalNumber, message, {
      replaceLineBreaks: true
    }).then(() => {
      let messageFileModel: MessageFileModel = {
        infoObject: createFormObject,
        creationDate: new Date,
        messageText: message,
        phoneNmber: this.createEditForm.controls.phoneNumber.value.internationalNumber
      };
      this.createEditForm.reset();
      this.checkDirAndSave(JSON.stringify(messageFileModel));
      this.showNotification(this.translateService.instant('create-form.message-send-success'), true);
    }).catch((error) => {
      this.showNotification(this.translateService.instant('create-form.message-send-error'), false);
    });
  }

  private checkDirAndSave(value: string): void {
    this.fileService.checkMessagesDir().then(() => {
      this.saveFile(value);
    }).catch(err => {
      this.fileService.createMessagesDir().then(() => {
        this.saveFile(value);
      }).catch((error) => {
        alert('Can not create messages directory');
      })
    });
  }

  private saveFile(messageString: string): void {
    this.fileService.listMessageDir().then((value) => {
      let fileName = `message-${value.length}`;
      this.fileService.writeMessageFile(fileName, messageString);
    })
  }

  private async showNotification(message: string, isSuccess: boolean): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 1000,
      color: isSuccess ? 'success' : 'warning'
    });
    toast.present();
  }

  private getMessageText(createFormObject: CreateEditFormModel): string {
    return `HELLO, ${createFormObject.name ? `${createFormObject.name},` : ''}
    ${createFormObject.address ? `${createFormObject.address},` : ''}
    ${createFormObject.percent ? `PERCENT:${createFormObject.percent}%,` : ''}
    ${createFormObject.paymentSum ? `SUM:$${createFormObject.paymentSum}.` : ''}. BILLING INFO`;
  }

  private initiateForm(messageFileModel?: MessageFileModel): void {
    let pn = '+380 668386892'
    this.createEditForm = new FormGroup({
      name: new FormControl(messageFileModel ? messageFileModel.infoObject.name : ""),
      address: new FormControl(messageFileModel ? messageFileModel.infoObject.address : ""),
      percent: new FormControl(messageFileModel ? messageFileModel.infoObject.percent : ""),
      paymentSum: new FormControl(messageFileModel ? messageFileModel.infoObject.paymentSum : ""),
      phoneNumber: new FormControl({ value: pn })
    });
  }

}
