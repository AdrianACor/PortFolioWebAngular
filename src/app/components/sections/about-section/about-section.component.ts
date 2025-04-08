import { Component, OnInit, Input } from "@angular/core";
import { PortfolioService } from "../../../services/portfolio.service";
import { PortfolioData } from "../../../models/portfolio.model";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-about-section",
  templateUrl: "./about-section.component.html",
  styleUrls: ["./about-section.component.scss"],
  imports:[TranslateModule, CommonModule]
})
export class AboutSectionComponent implements OnInit {
  @Input() portfolioData!: PortfolioData;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getPortfolioData().subscribe((data) => {
      this.portfolioData = data;
    });
  }
}
