import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterLink } from '@angular/router';
import { FilmshowDetailsComponent } from './filmshow/filmshow-details/filmshow-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'filmshow/details/:id',
    component: FilmshowDetailsComponent    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, RouterLink]
})
export class AppRoutingModule { }
