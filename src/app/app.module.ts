import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WorkListComponent } from './work-list/work-list.component';
import { SingleWorkComponent } from './work-list/single-work/single-work.component';
import { WorkFormComponent } from './work-form/work-form.component';
import { WorksService } from './services/works.service';
import { Routes, RouterModule } from '@angular/router';
import { EditWorkComponent } from './work-list/edit-work/edit-work.component';

const appRoutes: Routes = [
  { path: 'works', component: WorkListComponent },
  { path: 'works/new', component: WorkFormComponent },
  { path: 'works/:id', component: SingleWorkComponent },
  { path: 'works/edit/:id', component: EditWorkComponent },
  { path: '', redirectTo: 'works', pathMatch: 'full'},
  { path: '**', redirectTo: 'works'}
];

@NgModule({
  declarations: [
    AppComponent,
    WorkListComponent,
    SingleWorkComponent,
    WorkFormComponent,
    EditWorkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WorksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
