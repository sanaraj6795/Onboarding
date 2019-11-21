import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class DashBoardService {

    constructor(private httpClient: HttpClient) {
    }

    getData(): Observable<any> {
        var apiURL = "https://cognizantonline.sharepoint.com/sites/TestWeb/_api/lists/getbytitle('PlanSummary')/items";
        return this.httpClient.get(apiURL).pipe(map((resspone: any) => {
            console.log(resspone);
            const summaryDetails = resspone.value.map(x=>x.OnboardingStatus);
            return of(summaryDetails);
        }));
    }
}