import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
let marked = require('marked');

import { JournalClass } from '../classes/journal';

import { JournalService } from '../service/journal';

@Component({
    selector: 'view',
    templateUrl: '../../templates/view.html'
})
export class ViewComponent implements OnInit {
    journal: JournalClass;
    error: any;

    isSaved = false;

    private _handleError(error: any) {
        console.error('An error occurred', error.message || error);
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _service: JournalService
    ) {}

    ngOnInit() {
        this.journal = new JournalClass();
        this._route.fragment.forEach(fragment => {
            if (fragment === 'is_saved') {
                this.isSaved = true;
            }
        });
        this._route.params.forEach((params: Params) => {
            if (typeof params['alias'] === 'string') {
                this.journal.alias = params['alias'];
            }
        });

        this.fetchItem();
    }

    fetchItem() {
        this._service.getJournal(this.journal.alias).then(results => {
            this.journal.title = results.title;
            this.journal.update = results.update;
            this.journal.create = results.create;
            this.journal.content = marked(results.content);
        }).catch(this._handleError.bind(this));
    }

    onEdit(event: any) {
        event.preventDefault();
        this._router.navigate(['/edit', this.journal.alias]);
    }

    onDelete(event: any) {
        event.preventDefault();
        this._service.deleteJournal(this.journal.alias).then(response => {
            window.history.back();
        }).catch(this._handleError.bind(this));
    }
    
}