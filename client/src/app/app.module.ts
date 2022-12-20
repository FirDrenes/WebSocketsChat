import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbInputModule, NbButtonModule, NbTabsetModule, NbAccordionModule, NbChatModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {ReactiveFormsModule} from "@angular/forms";
import { ChatComponent } from './chat/chat.component';
import { DrawTableComponent } from './draw-table/draw-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    DrawTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'custom'}),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbTabsetModule,
    NbAccordionModule,
    NbChatModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
