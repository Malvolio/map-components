import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

import { MatMapModule } from '../map';
import { MatMapCredentials } from '../map';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatMenuModule,
    MatMapModule,
  ],
  providers: [
    {
      provide: MatMapCredentials,
      useValue: {
        mapApiKey: 'AIzaSyATPX1NvLfpQj-l8bSTnYdcknLAPjw0xPI',
      }
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

