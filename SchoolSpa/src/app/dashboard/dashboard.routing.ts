import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AttendancesComponent } from './attendances/attendances.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { CitiesComponent } from './cities/cities.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { CountriesComponent } from './countries/countries.component';
import { CoursesComponent } from './courses/courses.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DocumentRequestsComponent } from './document-requests/document-requests.component';
import { ExamsComponent } from './exams/exams.component';
import { GradesComponent } from './grades/grades.component';
import { MainComponent } from './main/main.component';
import { ModulesComponent } from './modules/modules.component';
import { RoomsComponent } from './rooms/rooms.component';
import { SchoolsComponent } from './schools/schools.component';
import { SessionsComponent } from './sessions/sessions.component';
import { StatesComponent } from './states/states.component';
import { StudentsComponent } from './students/students.component';
import { SubModulesComponent } from './sub-modules/sub-modules.component';
import { TasksComponent } from './tasks/tasks.component';
import { TeachersComponent } from './teachers/teachers.component';
import { TrainingsComponent } from './trainings/trainings.component';
import { UsersComponent } from './users/users.component';

export const AppRoutes: Routes= [
    { path : "" , component : MainComponent},
    { path : "assignments" , component : AssignmentsComponent},
    { path : "attendances" , component : AttendancesComponent},
    { path : "chapters" , component : ChaptersComponent},
    { path : "cities" , component : CitiesComponent},
    { path : "classrooms" , component : ClassroomsComponent},
    { path : "countries" , component : CountriesComponent},
    { path : "courses" , component : CoursesComponent},
    { path : "departments" , component : DepartmentsComponent},
    { path : "document-requests" , component : DocumentRequestsComponent},
    { path : "exams" , component : ExamsComponent},
    { path : "grades" , component : GradesComponent},
    { path : "modules" , component : ModulesComponent},
    { path : "rooms" , component : RoomsComponent},
    { path : "schools" , component : SchoolsComponent},
    { path : "sessions" , component : SessionsComponent},
    { path : "states" , component : StatesComponent},
    { path : "students" , component : StudentsComponent},
    { path : "sub-modules" , component : SubModulesComponent},
    { path : "teachers" , component : TeachersComponent},
    { path : "trainings" , component : TrainingsComponent},
    { path : "tasks" , component : TasksComponent},
    { path : "projects" , component : UsersComponent},
]

@NgModule({
  imports: [RouterModule.forChild(AppRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule{
}