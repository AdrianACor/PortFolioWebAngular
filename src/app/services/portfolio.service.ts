import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { PortfolioData, ContactFormData } from "../models/portfolio.model";
import { TranslateService } from "@ngx-translate/core";
@Injectable({
  providedIn: "root",
})
export class PortfolioService {
  private baseUrl = "/api";
  private portfolioData: PortfolioData = {
    name: "Adrian",
    fullName: "Adrian Cordova",
    title: "Developer",
    summary: "Building digital experiences with code and creativity",
    bio: "I'm a software developer that adapts to the needs of the project, for this reason i'm not specialized in a specific language, although i have more experience in Java and i have OCJP6 certification, also i have projects in other languages.",
    projects: [
      {
        id: 1,
        title: "Basic Gym Management",
        description:
          "This project try to manage All the basic functions of a gym like members register, in and outs of members, payments of membership, etc.",
        image: "./assets/Gym.jpg",
        tags: ["C#", "MySQL", "Visual Studio Forms"],
        demo: "",
        github: "",
        featured: false,
      },
      {
        id: 2,
        title: "CarRegister v2.0",
        description:
          "This project was made during my stay in the engineering, was made in Delphi (Object Pascal) and i updated it doing it completely with Java and a MySQL database.",
        image: "./assets/CarRegisterV2.0.jpg",
        tags: ["Java", "Java Forms", "MySQL", "Delphi"],
        demo: "",
        github: "https://github.com/AdrianACor/CarRegister",
        featured: false,
      },
      {
        id: 3,
        title: "ToDo List",
        description:
          "This is a simple web app that i realized for training my knowledge in Angular and Java SpringBoot, is a basic To Do List that implements a interaction with a CRUD APIs and a MySQL database.",
        image: "./assets/ToDoList.jpg",
        tags: ["Angular", "API Integration", "Java Spring Boot", "MySQL"],
        demo: "",
        github: "https://github.com/AdrianACor/TodoList",
        featured: false,
      },
    ],
    frontendSkills: [
      { name: "HTML", percentage: 95, icon: "fab fa-html5" },
      { name: "CSS", percentage: 88, icon: "fab fa-css3-alt" },
      { name: "JavaScript", percentage: 92, icon: "fab fa-js-square" },
      { name: "TypeScript", percentage: 88, icon: "fab fa-js-square" },
      { name: "React", percentage: 90, icon: "fab fa-react" },
      { name: "Angular", percentage: 85, icon: "fab fa-angular" },
      { name: "NextJs (React Framework)", percentage: 80, icon: "fab fa-react" },
      { name: "Ionic (Angular Framework)", percentage: 92, icon: "./assets/icons/ionic.svg" },
    ],
    backendSkills: [
      { name: "Node.js", percentage: 90 , icon: "fab fa-node"},
      { name: "Java", percentage: 88 , icon: "fab fa-java"},
      { name: "C#", percentage: 85 , icon: "fas fa-laptop-code"},
      { name: "PHP", percentage: 82 , icon: "fab fa-php"},
      { name: "REST API Design", percentage: 90 , icon: "fas fa-code-branch"},
      { name: "Python", percentage: 78 , icon: "fab fa-python"},
      { name: "Java Springboot", percentage: 75 , icon: "fas fa-cogs"},
      { name: "Oracle PL/SQL", percentage: 70 , icon: "fas fa-database"},
    ],
    databases: [
      { name: "MySQL", icon: "./assets/icons/mysql.svg"},
      { name: "SQL Server", icon: "./assets/icons/sql-server.png"},
      { name: "Oracle SQL", icon: "./assets/icons/oracle.svg"},
    ],
    tools: [
      { name: "Git", icon: "fab fa-git-alt", color: "#F05032" },
      { name: "VS Code", icon: "fas fa-code", color: "#007ACC" },
      { name: "npm", icon: "fab fa-npm", color: "#CB3837" },
      { name: "GitHub", icon: "fab fa-github", color: "#181717" },
      { name: "Power Bi", icon:"fas fa-chart-simple", color: "#ffd700" },
      { name: "Terminal", icon: "fas fa-terminal", color: "#4D4D4D" }
    ],
    education: [
      {
        degree: "Systems Engineering with Robotic speciality",
        institution: "Instituto técnologico de Chihuahua II",
        year: "2006 - 2011",
        icon: "fas fa-graduation-cap",
      },
      {
        degree: "Computer Maintenance and digital control",
        institution:
          "Colegio Nacional de Educacion Profesional Técnica Chihuahua II (CONALEP Chihuahua II)",
        year: "2001 - 2005",
        icon: "fas fa-graduation-cap",
      },
      {
        degree: "Certificate",
        institution: 'Escuela secundaria estata "Heroes Ferrocarrileros 3024"',
        year: "1997-2000",
        icon: "fas fa-graduation-cap",
      },
    ],
    experience: [
      {
        position: "Developer",
        company: "PCD IT Solutions & Consulting",
        period: "October 2024 - Present",
        icon: "fas fa-briefcase",
      },
      {
        position: "E-Commerce Developer",
        company: "Avance y Tecnología en Plasticos",
        period: "January 2020 - June 2024",
        icon: "fas fa-briefcase",
      },
      {
        position: "Tecnichal consultant",
        company: "Tecnología de Gestión y Comunicación TGC",
        period: "April 2019 - December 2020",
        icon: "fas fa-briefcase",
      },
      {
        position: "Support Engineer",
        company: "Tecnología de Gestión y Comunicación TGC",
        period: "December 2012 - April 2019",
        icon: "fas fa-briefcase",
      }
    ],
    contactInfo: {
      email: "adrian.cordovamoreno@gmail.com",
      location: "Chihuahua, Chihuahua, Mexico",
      socials: {
        github: "https://github.com/AdrianACor",
        linkedin: "https://linkedin.com/in/adrian-cordova-20079564",
        twitter: "",
        dribbble: "",
      },
    },
    resumeLink: "./assets/",
  };

  constructor(private http: HttpClient, private translate: TranslateService) {}

  translateData() {
    if (!this.portfolioData) return;

    const translateKeys = [
      'title',
      'summary',
      'bio',
      'projects.titleGym',
      'projects.descriptionGym',
      'projects.titleCar',
      'projects.descriptionCar',
      'projects.titleToDo',
      'projects.descriptionToDo',
      'education.degreeEngineer',
      'education.degreeManagment',
      'education.degreeCertificate',
      'experience.positionDeveloper',
      'experience.period2024',
      'experience.positionEcommerce',
      'experience.period2020',
      'experience.positionTechnician',
      'experience.period219',
      'experience.positionSupport',
      'experience.period2012',
    ];

    this.translate.get(translateKeys).subscribe((translations) => {
      
      this.portfolioData.title = translations['title'];
      this.portfolioData.summary = translations['summary'];
      this.portfolioData.bio = translations['bio'];

      this.portfolioData.projects[0].title = translations['projects.titleGym'];
      this.portfolioData.projects[0].description = translations['projects.descriptionGym'];
      this.portfolioData.projects[1].title = translations['projects.titleCar'];
      this.portfolioData.projects[1].description = translations['projects.descriptionCar'];
      this.portfolioData.projects[2].title = translations['projects.titleToDo'];
      this.portfolioData.projects[2].description = translations['projects.descriptionToDo'];

      this.portfolioData.education[0].degree = translations['education.degreeEngineer'];
      this.portfolioData.education[1].degree = translations['education.degreeManagment'];
      this.portfolioData.education[2].degree = translations['education.degreeCertificate'];

      this.portfolioData.experience[0].position = translations['experience.positionDeveloper'];
      this.portfolioData.experience[0].period = translations['experience.period2024'];
      this.portfolioData.experience[1].position = translations['experience.positionEcommerce'];
      this.portfolioData.experience[1].period = translations['experience.period2020'];
      this.portfolioData.experience[2].position = translations['experience.positionTechnician'];
      this.portfolioData.experience[2].period = translations['experience.period219'];
      this.portfolioData.experience[3].position = translations['experience.positionSupport'];
      this.portfolioData.experience[3].period = translations['experience.period2012'];
      console.log('translations: ',translations);
    });
  }

  getPortfolioData(): Observable<PortfolioData> {
    // In a real application, we would fetch from the API
    // return this.http.get<PortfolioData>(`${this.baseUrl}/portfolio`).pipe(
    //   catchError(this.handleError<PortfolioData>('getPortfolioData'))
    // );
    // console.log('portfolio: ',this.portfolioData);
    // For now, return the mock data
    // this.translate.use("en").subscribe(()=>{
    //   this.translateData();
    // });
    // console.log('translate: ',this.translate);
    // console.log('portfolioTranslate: ',this.portfolioData);
    return of(this.portfolioData);
  }

  submitContactForm(formData: ContactFormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/contact`, formData).pipe(
      catchError((error) => {
        console.error("Error submitting contact form:", error);
        return throwError(
          () => new Error("Failed to send message. Please try again later.")
        );
      })
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      // Return empty result to keep app running
      return of(result as T);
    };
  }
}
