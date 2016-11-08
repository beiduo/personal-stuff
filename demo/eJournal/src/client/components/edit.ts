import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

import { JournalClass } from '../classes/journal';

import { JournalService } from '../service/journal';

@Component({
    selector: 'edit',
    templateUrl: '../../templates/edit.html'
})
export class EditComponent implements OnInit {
    journal: JournalClass;
    isEditing = false;

    private _handleError(error: any) {
        console.error('An error occurred', error.message || error);
    }

    private _handleResponse(response: any) {
        let navigationExtras: NavigationExtras = {
            fragment: 'is_saved'
        };
        try {
            this._router.navigate([
                '/view',
                response.alias
            ], navigationExtras);
        } catch(e) {
            throw new Error(e);
        }
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _service: JournalService
    ) {}

    ngOnInit() {
        this.journal = new JournalClass();
        this._route.params.forEach((params: Params) => {
            if (typeof params['alias'] === 'string') {
                this.journal.alias = this.journal.original_alias = params['alias'];
                this.isEditing = true;
                this.fetchItem();
            } else {
                this.isEditing = false
            }
        });
    }

    fetchItem() {

        this._service.getJournal(this.journal.alias).then(results => {
            this.journal.id = results._id;
            this.journal.title = results.title;
            this.journal.update = results.update;
            this.journal.create = results.create;
            this.journal.content = results.content;
        }).catch(this._handleError.bind(this));
    }

    onCancel(event: any) {
        event.preventDefault();
        if (this.isEditing) {
            this._router.navigate(['/view', this.journal.original_alias]);
        } else {
            window.history.back();
        }
    }

    onSave(event: any) {
        event.preventDefault();
        let data = {
            title: this.journal.title,
            alias: this.journal.alias,
            content: this.journal.content
        };

        if (this.isEditing) {
            console.log(this.journal.id);
            this._service.putJournal(Object.assign({}, data, {
                id: this.journal.id,
                original_alias: this.journal.original_alias
            }))
                .then(this._handleResponse.bind(this))
                .catch(this._handleError.bind(this));
        } else {
            this._service.postJournal(data)
                .then(this._handleResponse.bind(this))
                .catch(this._handleError.bind(this));
        }

    }
}