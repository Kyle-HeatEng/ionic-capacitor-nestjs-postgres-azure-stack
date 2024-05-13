import { HttpClient } from "@angular/common/http";
import { Component, inject } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
    selector: 'app-canvas',
    template: `<div>{{ test$ | async | json }}</div>`
})
export class CanvasComponent {
    //Temporary auth hello world
    private http = inject(HttpClient);

    test$ =  this.http.get(`${environment.apiUrl}auth/test`);
    
}