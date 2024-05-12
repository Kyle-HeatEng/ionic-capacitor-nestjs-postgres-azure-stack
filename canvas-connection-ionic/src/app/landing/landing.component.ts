import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  template: `
    <ion-content>
      <div class="container">
        <h1>Welcome to Canvas Connection</h1>
        <p>Canvas Connection is a social network for artists and art lovers. Connect with other artists, share your work, and get inspired.</p>
        <ion-button routerLink="/auth/register" color="primary">Get Started</ion-button>
      </div>
    </ion-content>
  `,

})
export class LandingComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
