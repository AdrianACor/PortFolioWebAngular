import { Component, OnInit, Input } from "@angular/core";
import { PortfolioService } from "../../../services/portfolio.service";
import { PortfolioData, Skill } from "../../../models/portfolio.model";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-skills-section",
  templateUrl: "./skills-section.component.html",
  styleUrls: ["./skills-section.component.scss"],
  imports:[TranslateModule, CommonModule]
})
export class SkillsSectionComponent implements OnInit {
  @Input() portfolioData!: PortfolioData;
  skillsVisible: boolean = false;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe((data) => {
      this.portfolioData = data;
    });

    // Add intersection observer to trigger animation when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.skillsVisible = true;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    setTimeout(() => {
      const section = document.getElementById("skills");
      if (section) {
        observer.observe(section);
      }
    }, 500);
  }
}
