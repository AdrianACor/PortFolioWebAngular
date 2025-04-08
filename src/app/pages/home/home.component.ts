import { Component, OnInit, Input } from "@angular/core";
import { PortfolioService } from "../../services/portfolio.service";
import { PortfolioData } from "../../models/portfolio.model";
import { HeroSectionComponent } from "src/app/components/sections/hero-section/hero-section.component";
import { AboutSectionComponent } from "src/app/components/sections/about-section/about-section.component";
import { ProjectsSectionComponent } from "src/app/components/sections/projects-section/projects-section.component"; 
import { SkillsSectionComponent } from "src/app/components/sections/skills-section/skills-section.component";
import { ContactSectionComponent } from "src/app/components/sections/contact-section/contact-section.component";
import { CommonModule } from '@angular/common';  

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports:[ HeroSectionComponent,
    AboutSectionComponent,
    ProjectsSectionComponent,
    SkillsSectionComponent,
    ContactSectionComponent,
  CommonModule]
})
export class HomeComponent implements OnInit {
  @Input() portfolioData!: PortfolioData;
  loading = true;
  error: string | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.fetchPortfolioData();
  }

  fetchPortfolioData(): void {
    this.loading = true;
    this.portfolioService.getPortfolioData().subscribe({
      next: (data) => {
        this.portfolioData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error fetching portfolio data:", err);
        this.error = "Failed to load profile data. Please try again later.";
        this.loading = false;
      },
    });
  }
}
