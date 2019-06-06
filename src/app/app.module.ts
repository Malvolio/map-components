import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';

import { MatMapModule, MapOptions } from '../map';
import { MatMapCredentials } from '../map';

/**
 * not checked in.  Should be of the form:
 * export const mapApiKey = 'AIzablahblahblahblahblahblah';
 */
import { mapApiKey } from './map-api.key';  


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
        mapApiKey,
      }
    },
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }

