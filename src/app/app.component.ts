import { Component, OnInit } from "@angular/core";
import { ThemeService } from "./services/theme.service";
import { TranslateService, TranslateModule } from "@ngx-translate/core";
import { HeaderComponent } from "./components/layout/header/header.component";
import { RouterModule } from "@angular/router";
import { FooterComponent } from "./components/layout/footer/footer.component";
import translationEs from '../assets/i18n/es.json';
import translationEn from '../assets/i18n/en.json';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  imports:[HeaderComponent, RouterModule, FooterComponent, TranslateModule],
})
export class AppComponent implements OnInit {
  title = "Developer Portfolio";

  constructor(
    private themeService: ThemeService,
    private translate: TranslateService
  ) {
    this.translate.setTranslation('en', translationEn);
    this.translate.setTranslation('es', translationEs);
    this.translate.setDefaultLang("en");
    // this.translate.use("en");
    // this.translate.addLangs(["es", "en"]);
  }

  ngOnInit(): void {
    this.themeService.initTheme();
  }
}
