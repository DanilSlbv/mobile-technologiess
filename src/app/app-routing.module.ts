import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './create-edit-form/create-edit-form.component';
import { MessagesListComponent } from './messages-list/messages-list.component';

const routes: Routes = [
  {
    path: '',
    component: MessagesListComponent,
  },
  {
    path: 'create',
    component: CreateFormComponent,
  },
  {
    path: "create/:messageFileName",
    component: CreateFormComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
