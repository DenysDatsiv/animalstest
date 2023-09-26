import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AnimalDetailComponent } from './pages/animal-detail/animal-detail.component';
import {RouterModule, Routes} from "@angular/router";
import { AnimalListComponent } from './pages/animal-list/animal-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { CardComponent } from './components/card/card.component';
import { AnimalFilterComponent } from './components/animal-filter/animal-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";

const routes: Routes = [
  { path: '', redirectTo: '/animal-list', pathMatch: 'full' },
  { path: 'animal-list', component: AnimalListComponent },
  { path: 'animal-detail/:index', component: AnimalDetailComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/page-not-found' } // Wildcard route for unknown paths
];


@NgModule({
  declarations: [
    AppComponent,
    AnimalDetailComponent,
    AnimalListComponent,
    PageNotFoundComponent,
    CardComponent,
    AnimalFilterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
