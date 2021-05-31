import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import { EventPageComponent } from './event-page/event-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {
    path: 'registerPage',
    component: RegisterPageComponent
  },
  {
    path: 'loginPage',
    component: LoginPageComponent
  },
  {
    path: 'eventPage',
    component: EventPageComponent
  },
  {
    path: 'addEditEvent/:id',
    component: AddEditEventComponent
  },
  {
    path: '',
    redirectTo: 'loginPage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
