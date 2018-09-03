import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { InputsComponent } from './inputs/inputs.component';
import { StatisticsComponent } from './statistics/statistics.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        InputsComponent,
        StatisticsComponent
    ],
    providers: [
    ],
    bootstrap: [
        AppComponent
    ],
})

export class AppModule {
}
