import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../../services/portfolio.service';
import { PortfolioData, ContactFormData } from '../../../models/portfolio.model';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss'],
  imports:[TranslateModule, ReactiveFormsModule, CommonModule]
})
export class ContactSectionComponent implements OnInit {
  @Input() portfolioData!: PortfolioData;
  
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private portfolioService: PortfolioService,
    private dialog: MatDialog
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      emailFrom: ['', [Validators.required, Validators.email]],
      // subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  ngOnInit(): void {
  }
  
  onSubmit(): void {
    if (this.contactForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    // this.isSubmitting = true;
    // this.submitSuccess = false;
    // this.submitError = null;
    
    const formData: ContactFormData = this.contactForm.value;
    
    // console.log('formData: ',formData);
    this.portfolioService.submitContactForm(formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.contactForm.reset();
        // Reset form validation state
        Object.keys(this.contactForm.controls).forEach(key => {
          const control = this.contactForm.get(key);
          control?.setErrors(null);
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitError = error.message || 'There was an error sending your message. Please try again.';
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          this.submitError = null;
        }, 5000);
      }
    });
    
    
  }
  
}