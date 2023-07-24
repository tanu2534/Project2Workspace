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

const routes: Routes = [
 {
  path:'',
  component:WelcomeComponent
 },
 {
  path:'admin/:id',
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
      path: 'task',
      component: TaskComponent
    },
    {
      path: 'team',
      component: TeamComponent
    },
    {
      path:'deadline',
      component: DeadlinesComponent
    }
  ]
 }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
