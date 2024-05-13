import { Component, input, output } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'auth-login-form',
  template: `
    <form [formGroup]="formGroup()" (ngSubmit)="submit()">
      <ion-item class="ion-invalid">
        <ion-label position="floating" for="email">Email</ion-label>
        <ion-input formControlName="email" id="email" type="email"></ion-input>
      </ion-item>
      <ion-note
        *ngIf="
          formGroup().get('email')?.dirty && formGroup().get('email')?.errors
        "
        color="danger"
      >
        @if(formGroup().get('email')?.errors?.['required']) { Email is required
        } @if(formGroup().get('email')?.errors?.['email']) { Invalid email
        format }
      </ion-note>

      <ion-item>
        <ion-label position="floating" for="password">Password</ion-label>
        <ion-input
          formControlName="password"
          type="password"
          id="password"
        ></ion-input>
        <ion-note
          *ngIf="
            formGroup().get('password')?.dirty &&
            formGroup().get('password')?.errors
          "
          color="danger"
        >
          @if(formGroup().get('password')?.errors?.['required']) { Password is
          required }
        </ion-note>
      </ion-item>

      <ion-button expand="block" type="submit" [disabled]="!formGroup().valid">
        Register
      </ion-button>
    </form>
  `,
})
export class LoginFormComponent {
  formGroup = input.required<FormGroup<any>>();
  onSubmit = output<any>();

  submit = () => {
    this.onSubmit.emit(null);
  };
}