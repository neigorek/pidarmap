import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { TrackingComponent } from './modules/tracking/tracking.component';
import { AdminComponent } from './modules/admin/admin.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GroupsComponent } from './modules/tracking/groups/groups.component';
import { MainDotsComponent } from './modules/tracking/main-dots/main-dots.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TrackingComponent,
    AdminComponent,
    GroupsComponent,
    MainDotsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyByOQ1tHFjLrXlYtDVUAqI5WRNUzNZZtsE',
      libraries: ['drawing']
    }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule 
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
