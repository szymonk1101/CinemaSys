import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header.component';
import { FooterComponent } from './layout/footer.component';
import { HomeComponent } from './home/home.component';
import { FilmshowDetailsComponent } from './filmshow/filmshow-details/filmshow-details.component';
import { FilmshowPreviewComponent } from './filmshow/filmshow-preview/filmshow-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FilmshowDetailsComponent,
    FilmshowPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
