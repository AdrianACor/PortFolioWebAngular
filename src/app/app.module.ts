import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClient} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { NgSelectModule } from "@ng-select/ng-select"; 

// Layout Components
import { HeaderComponent } from "./components/layout/header/header.component";
import { FooterComponent } from "./components/layout/footer/footer.component";
import { ThemeToggleComponent } from "./components/layout/theme-toggle/theme-toggle.component";

// Section Components
import { HeroSectionComponent } from "./components/sections/hero-section/hero-section.component";
import { AboutSectionComponent } from "./components/sections/about-section/about-section.component";
import { ProjectsSectionComponent } from "./components/sections/projects-section/projects-section.component";
import { SkillsSectionComponent } from "./components/sections/skills-section/skills-section.component";
import { ContactSectionComponent } from "./components/sections/contact-section/contact-section.component";

// Page Components
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ThemeToggleComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    ContactSectionComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
