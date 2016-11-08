import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'list',
    templateUrl: '../../templates/notFound.html'
})
export class NotFoundComponent implements OnInit {
    path: string;
    constructor(private _route: ActivatedRoute) {}
    ngOnInit() {
        this.path = this._route.toString().split('\'')[1];
    }

    goBack() {
        window.history.back();
    }
}