import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
