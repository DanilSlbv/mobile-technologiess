import { Injectable } from '@angular/core';
import { File, RemoveResult, Entry, DirectoryEntry } from '@ionic-native/file/ngx';
const messagesDirName = "messages";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private file: File) { }


  public checkMessagesDir(): Promise<boolean> {
    return this.file.checkDir(this.file.dataDirectory, messagesDirName);
  }

  public createMessagesDir(): Promise<DirectoryEntry> {
    return this.file.createDir(this.file.dataDirectory, messagesDirName, false);
  }

  public listMessageDir(): Promise<Entry[]> {
    return this.file.listDir(this.file.dataDirectory, messagesDirName);
  }

  public writeMessageFile(fileName: string, messageString): void {
    this.file.writeFile(`${this.file.dataDirectory}${messagesDirName}`, fileName, messageString);
  }

  public getMessageFileAsText(fileName: string): Promise<string> {
    return this.file.readAsText(`${this.file.dataDirectory}${messagesDirName}`, fileName);
  }

  public removeMessage(messageFileName: string): Promise<RemoveResult> {
    return this.file.removeFile(`${this.file.dataDirectory}messages`, messageFileName);
  }
}
