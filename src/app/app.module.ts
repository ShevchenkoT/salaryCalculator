import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SortByDatePipe } from './shared/sort-by-date.pipe';
const routes: Routes = [
  { path: '', component: MainComponent, },
  { path: 'admin', component: AdminComponent, }
];
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AdminComponent,
    SortByDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
