import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { HomeComponent } from './home/home.component';
import { FilmshowDetailsComponent } from './filmshow/filmshow-details/filmshow-details.component';
import { FilmshowPreviewComponent } from './filmshow/filmshow-preview/filmshow-preview.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MovieDetailsComponent } from './movie/movie-details/movie-details.component';
import { MovieListComponent } from './movie/movie-list/movie-list.component';
import { MovieFormNewComponent } from './movie/movie-form-new/movie-form-new.component';
import { DescTruncatePipe } from './core/pipes/desc-truncate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FilmshowDetailsComponent,
    FilmshowPreviewComponent,
    PageNotFoundComponent,
    MovieDetailsComponent,
    MovieListComponent,
    MovieFormNewComponent,
    DescTruncatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
