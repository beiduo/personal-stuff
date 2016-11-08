import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { JournalClass } from '../classes/journal';
import { api_journal_list, api_journal_item } from '../constants/api';

@Injectable()
export class JournalService {
    private _apiList = api_journal_list;
    private _apiJournal = api_journal_item;
    constructor(private _http: Http) {}
    
    private handleError(error: any) {
        return Promise.reject(error);
    }

    getList(page: number) {
        return this._http.get(this._apiList + '/page/' + (page || 0))
                    .toPromise()
                    .then(res => {
                        let response = res.json();
                        if (typeof response.error === 'string') {
                            throw new Error(response.error);
                        }

                        return response.results;
                    })
                    .catch(this.handleError);
    }

    getJournal(alias: string) {
        return this._http.get(this._apiJournal + '/' + alias)
                    .toPromise()
                    .then(res => {
                        let response = res.json();
                        if (typeof response.error === 'string') {
                            throw new Error(response.error);
                        }

                        return response.results;
                    })
                    .catch(this.handleError);
    }

    postJournal(data: Object) {
        return this._http.post(this._apiJournal, data)
                    .toPromise()
                    .then(res => {
                        let response = res.json();
                        if (typeof response.error === 'string') {
                            throw new Error(response.error);
                        }

                        return response.results;
                    })
                    .catch(this.handleError);
    }

    putJournal(data: Object) {
        return this._http.put(this._apiJournal, data)
                    .toPromise()
                    .then(res => {
                        let response = res.json();
                        if (typeof response.error === 'string') {
                            throw new Error(response.error);
                        }

                        return response.results;
                    })
                    .catch(this.handleError);
    }

    deleteJournal(alias: string) {
        return this._http.delete(this._apiJournal + '/' + alias)
                    .toPromise()
                    .then(res => {
                        let response = res.json();
                        if (typeof response.error === 'string') {
                            throw new Error(response.error);
                        }

                        return response;
                    })
                    .catch(this.handleError);
    }

}
