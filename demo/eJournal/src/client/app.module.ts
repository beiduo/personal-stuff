import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, XHRBackend } from '@angular/http';

import { JournalService } from './service/journal';

import { routing } from './constants/routing';

import { AppComponent } from './components/app';
import { ListComponent } from './components/list';
import { ViewComponent } from './components/view';
import { EditComponent } from './components/edit';
import { NotFoundComponent } from './components/notFound';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule
    ],
    declarations: [
        AppComponent,
        ListComponent,
        ViewComponent,
        EditComponent,
        NotFoundComponent
    ],
    providers: [
        JournalService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {};