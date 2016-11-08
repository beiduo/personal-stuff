import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EntryClass } from '../classes/entry';

import { JournalService } from '../service/journal';

@Component({
    selector: 'list',
    templateUrl: '../../templates/list.html'
})
export class ListComponent implements OnInit {
    list: EntryClass[] = [];
    previousPage = 0;
    nextPage = 0;
    currentPage = 1;
    error: any;

    private _handleError(error: any) {
        console.error('An error occurred', error.message || error);
    }

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _service: JournalService
    ) {}

    ngOnInit() {
        
        this._route.params.forEach((params: Params) => {
            if (typeof params['page'] !== 'undefined') {
                this.currentPage = +params['page'];
            }
        });
        this.fetchList();
    }

    fetchList() {
        this._service.getList(this.currentPage).then(results => {
            this.list = results.data;
            let current = Number(results.pagination.current);
            let total = Number(results.pagination.total);
            this.previousPage = current - 1;
            if (current === total) {
                this.nextPage = 0;
            } else {
                this.nextPage = current + 1;
            }
        }).catch(this._handleError.bind(this));
    }

    onPagination(event: any, page: number) {
        this._router.navigate(['/list', page]);
    }

    onView(event: any, alias: string) {
        this._router.navigate(['/view', alias]);
    }

}