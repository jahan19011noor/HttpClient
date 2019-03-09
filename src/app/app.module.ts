import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataServiceService } from './in-memory-data-service.service'

import { HttpErrorHandlerService } from './http-error-handler.service';
import { MessageService } from './message.service';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryDataServiceService)
  ],
  providers: [
    HttpErrorHandlerService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
