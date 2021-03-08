import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { File } from '@ionic-native/file/ngx';
import { MessageFileModel } from '../shared/models/message-file.model';

const NOT_FOUND_INDEX = -1;
@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {

  public allMessages: Array<MessageFileModel> = [];

  constructor(private file: File, private router: Router) { }

  ngOnInit() {
    this.loadMessages();
  }

  public editMessage(messageFileName: string): void {
    this.router.navigate([`create/${messageFileName}`]);
  }

  public loadMessages(): void {
    if (!this.file || !this.file.dataDirectory) {
      return;
    }
    this.file.listDir(this.file.dataDirectory, 'messages').then((fileItems) => {
      fileItems.forEach(element => {
        let text = this.file.readAsText(`${this.file.dataDirectory}messages`, `${element.name}`);
        text.then((val) => {
          if (this.allMessages.findIndex(x => x.fileName === element.name) === NOT_FOUND_INDEX) {
            let messageFileData: MessageFileModel = JSON.parse(val);
            messageFileData.fileName = element.name;
            this.allMessages.push(messageFileData);
          }
        }).finally(() => {
        }).catch((val) => {
          console.log(val);
        })
      });
    })
  }
}
