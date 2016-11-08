import { Component } from '@angular/core';

let styles = String(require('../style.css'));

@Component({
    selector: 'my-app',
    templateUrl: '../../templates/app.html',
    styles: [ styles ]
})

export class AppComponent {

}