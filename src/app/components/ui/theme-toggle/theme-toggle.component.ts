import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  imports:[CommonModule]
})
export class ThemeToggleComponent implements OnInit {
  isDarkTheme: boolean = false;
  
  constructor(private themeService: ThemeService) { }
  
  ngOnInit(): void {
    this.themeService.theme$.subscribe(theme => {
      this.isDarkTheme = theme === 'dark';
    });
  }
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}