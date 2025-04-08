import { Component, OnInit, Input } from "@angular/core";
import { PortfolioService } from "../../../services/portfolio.service";
import { PortfolioData } from "../../../models/portfolio.model";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';  

@Component({
  selector: "app-hero-section",
  templateUrl: "./hero-section.component.html",
  styleUrls: ["./hero-section.component.scss"],
  imports:[TranslateModule, CommonModule]
})
export class HeroSectionComponent implements OnInit {
  @Input() portfolioData!: PortfolioData;
  isMenuOpen = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe((data) => {
      this.portfolioData = data;
    });
  }

  scrollToContact(): void {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      this.isMenuOpen = false;
    }
  }
}
