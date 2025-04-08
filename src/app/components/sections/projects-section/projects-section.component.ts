import { Component, OnInit, Input } from "@angular/core";
import { PortfolioService } from "../../../services/portfolio.service";
import { PortfolioData, Project } from "../../../models/portfolio.model";
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';  

@Component({
  selector: "app-projects-section",
  templateUrl: "./projects-section.component.html",
  styleUrls: ["./projects-section.component.scss"],
  imports:[TranslateModule, CommonModule]
})
export class ProjectsSectionComponent implements OnInit {
  @Input() portfolioData!: PortfolioData;
  filteredProjects: Project[] = [];
  currentTag: string = "All";
  tags: string[] = ["All"];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe((data) => {
      this.portfolioData = data;
      this.filteredProjects = data.projects;

      // Extract unique tags
      const uniqueTags = new Set<string>();
      data.projects.forEach((project) => {
        project.tags.forEach((tag) => uniqueTags.add(tag));
      });

      this.tags = ["All", ...Array.from(uniqueTags)];
    });
  }

  filterProjects(tag: string): void {
    this.currentTag = tag;

    if (tag === "All") {
      this.filteredProjects = this.portfolioData.projects;
    } else {
      this.filteredProjects = this.portfolioData.projects.filter((project) =>
        project.tags.includes(tag)
      );
    }
  }
}
