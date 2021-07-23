import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard.routing';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
// Material Form Controls
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
// Material Navigation
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Material Layout
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
// Material Popups & Modals
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Material Data tables
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentsModule } from './assignments/assignments.module';
import { AttendancesModule } from './attendances/attendances.module';
import { ChaptersModule } from './chapters/chapters.module';
import { CitiesModule } from './cities/cities.module';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { CountriesModule } from './countries/countries.module';
import { CoursesModule } from './courses/courses.module';
import { DepartmentsModule } from './departments/departments.module';
import { DocumentRequestsModule } from './document-requests/document-requests.module';
import { ExamsModule } from './exams/exams.module';
import { GradesModule } from './grades/grades.module';
import { ModulesModule } from './modules/modules.module';
import { RoomsModule } from './rooms/rooms.module';
import { SchoolsModule } from './schools/schools.module';
import { SessionsModule } from './sessions/sessions.module';
import { StatesModule } from './states/states.module';
import { StudentsModule } from './students/students.module';
import { SubModulesModule } from './sub-modules/sub-modules.module';
import { TeachersModule } from './teachers/teachers.module';
import { TrainingsModule } from './trainings/trainings.module';
import { UsersModule } from './users/users.module';
import { MainComponent } from './main/main.component';
import { AbsenceJustificationsComponent } from './absence-justifications/absence-justifications.component';
import { HomeworksComponent } from './homeworks/homeworks.component';
import { MailsComponent } from './mails/mails.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { AbsenceJustificationsModule } from './absence-justifications/absence-justification.module';
import { HomeworksModule } from './homeworks/homeworks.module';
import { MailsModule } from './mails/mails.module';
import { ProjectsModule } from './projects/project.module';
import { TasksModule } from './tasks/tasks.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatTreeModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    AssignmentsModule,
    AttendancesModule,
    ChaptersModule,
    CitiesModule,
    ClassroomsModule,
    CountriesModule,
    CoursesModule,
    DepartmentsModule,
    DocumentRequestsModule,
    ExamsModule,
    GradesModule,
    ModulesModule,
    RoomsModule,
    SchoolsModule,
    SessionsModule,
    StatesModule,
    StudentsModule,
    SubModulesModule,
    TeachersModule,
    TrainingsModule,
    UsersModule,
    AbsenceJustificationsModule,
    HomeworksModule,
    MailsModule,
    ProjectsModule,
    DashboardRoutingModule

  ],
  providers: [
  ]
})
export class DashboardModule { }
