import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
// import { MatRadioModule } from '@angular/material/radio';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_utils/auth.interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BoardComponent } from './board/board.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SideContentComponent } from './side-content/side-content.component';
import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';
import { BoardFormComponent } from './board-form/board-form.component';
import { ProjectsComponent } from './projects/projects.component';
import { EntrisReportComponent } from './entris-report/entris-report.component';
import { EntriAnalyticsComponent } from './entri-analytics/entri-analytics.component';
import { TaskTableComponent } from './task-table/task-table.component';
import { TaskComponent } from './task/task.component';
import { TeamComponent } from './team/team.component';
import { SearchComponent } from './search/search.component';
import { DeadlinesComponent } from './deadlines/deadlines.component';
import { TimedataComponent } from './timedata/timedata.component';
import { CommunicationComponent } from './communication/communication.component';
import { MatTableModule } from '@angular/material/table';
import { CalendarComponent } from './calendar/calendar.component';
import { SignupComponent } from './signup/signup.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { LoginComponent } from './login/login.component';

// import { TaskComponent } from './task/task.component';
// import { UtilityModule } from './utility/utility.module';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BoardComponent,
    MainpageComponent,
    SidebarComponent,
    SideContentComponent,
    HeaderComponent,
    TableComponent,
    BoardFormComponent,
    ProjectsComponent,
    EntrisReportComponent,
    EntriAnalyticsComponent,
    TaskTableComponent,
    TaskComponent,
    TeamComponent,
    SearchComponent,
    DeadlinesComponent,
    TimedataComponent,
    CommunicationComponent,
    CalendarComponent,
    SignupComponent,
    CreateProjectComponent,
    CreateTaskComponent,
    CreateTeamComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatIconModule,
    MatTabsModule,
    BrowserAnimationsModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
