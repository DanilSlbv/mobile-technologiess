import { CreateEditFormModel } from "./create-edit-form.model"

export class MessageFileModel {
    public fileName?: string;
    public infoObject: CreateEditFormModel;
    public creationDate: Date;
    public messageText: string;
    public phoneNmber: string;
}