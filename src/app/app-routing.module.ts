import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BoardComponent } from './board/board.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ProjectsComponent } from './projects/projects.component';
import { EntrisReportComponent } from './entris-report/entris-report.component';
import { EntriAnalyticsComponent } from './entri-analytics/entri-analytics.component';
import { TaskComponent } from './task/task.component';
import { TeamComponent } from './team/team.component';
import { DeadlinesComponent } from './deadlines/deadlines.component';
import { CommunicationComponent } from './communication/communication.component';
import { SignupComponent } from './signup/signup.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { CreateTeamComponent } from './team/create-team/create-team.component';
import { LoginComponent } from './login/login.component';
import { ViewProjectComponent } from './projects/view-project/view-project.component';
import { ViewTeamComponent } from './team/view-team/view-team.component';
import { ViewTaskComponent } from './task/view-task/view-task.component';
import { ViewMemberComponent } from './view-member/view-member.component';

const routes: Routes = [
 {
  path:'',
  component:WelcomeComponent
 },
 {
  path: 'register',
  component: SignupComponent
 },
 {
  path: 'login',
  component: LoginComponent
 },
 {
  path:'source',
  component:MainpageComponent,
  children:[
    {
      path:'board',
      component:BoardComponent
    },
    {
      path:'projects',
      component: ProjectsComponent,
      children:[
        {
          path: 'project-report',
          component: EntrisReportComponent
        },
        {
          path: 'project-analitics',
          component: EntriAnalyticsComponent
        }
      ]
    },
    {
      path: 'project-create',
      component: CreateProjectComponent
    },
    {
      path: 'view-project/:id',
      component: ViewProjectComponent
    },
    {
      path: 'team-create',
      component: CreateTeamComponent
    },
    {
      path: 'view-team/:id',
      component: ViewTeamComponent
    },
    {
      path: 'task',
      component: TaskComponent
    },
    {
      path: 'view-task/:id',
      component: ViewTaskComponent
    },
    {
      path: 'task-create',
      component: CreateTaskComponent
    },
    {
      path: 'team',
      component: TeamComponent
    },
    {
      path:'deadline',
      component: DeadlinesComponent
    },
    {
      path: 'communication',
      component: CommunicationComponent
    },
    {
      path: 'view-member/:id',
      component: ViewMemberComponent

    }
  ]
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
