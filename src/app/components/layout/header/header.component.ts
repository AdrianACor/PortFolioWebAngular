import { Component, OnInit, Injectable } from "@angular/core";
import { PortfolioService } from "../../../services/portfolio.service";
import { PortfolioData } from "../../../models/portfolio.model";
import { TranslateService } from "@ngx-translate/core";
import { TranslateModule } from "@ngx-translate/core";
import { ThemeToggleComponent } from "../../ui/theme-toggle/theme-toggle.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from "@angular/common";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports:[TranslateModule, ThemeToggleComponent, MatFormFieldModule, MatSelectModule, CommonModule, MatButtonModule, MatMenuModule]
})
export class HeaderComponent implements OnInit {
  portfolioData!: PortfolioData;
  isMenuOpen = false;
  langs: string[] = [];
  langIcons: Array<{code: string, name: string, icon: string}> = [];
  selectedLang: string = "";

  private currentLanguage = new BehaviorSubject<string>(this.translate.getDefaultLang());
  currLang$ = this.currentLanguage.asObservable();

  iconMap:{[key:string]: string} = {
    'es':'fi fi-mx',
    'en':'fi fi-us'
  }

  constructor(private portfolioService: PortfolioService, private translate: TranslateService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe((data) => {
      this.portfolioData = data;
    });

    this.selectedLang = this.translate.getDefaultLang();
    this.getLanguages();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      this.isMenuOpen = false;
    }
  }

  changeLang(lang: string){
    this.selectedLang = lang;
    this.currentLanguage.next(lang);
    this.translate.use(lang).subscribe(()=>{
        this.portfolioService.translateData();
      });
    
  }

  getIcon(value:string): string{
    return this.iconMap[value] || '';
  }

  getLanguages(){
    this.langs = this.translate.getLangs();
    this.langs.forEach(lang => {
      this.langIcons.push(lang == 'es'? {code: lang, name:'Español', icon:'fi fi-mx'} :{code: lang, name: 'Ingles',icon:'fi fi-us'});
    });

    // console.log('langIcons',this.langIcons);
  }
}
