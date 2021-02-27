import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguagesEnum } from '../../enums/languages.enum';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.scss'],
})
export class LocalizationComponent implements OnInit {

  public languageTypes = LanguagesEnum;
  public languageValue: LanguagesEnum = LanguagesEnum.En;

  constructor(private translateService: TranslateService) { }

  ngOnInit() { }

  public get currentLanguage(): LanguagesEnum {
    return this.languageValue;
  }

  public set currentLanguage(value: LanguagesEnum) {
    this.languageValue = value;
    this.onLanguageChanged();
  }

  private onLanguageChanged(): void {
    let languageName = LanguagesEnum[this.currentLanguage].toLowerCase();
    this.translateService.use(languageName);
  }

}
