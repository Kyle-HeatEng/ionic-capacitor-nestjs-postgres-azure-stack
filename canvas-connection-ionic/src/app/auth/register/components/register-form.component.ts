import { Component, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'auth-register-form',
  template: `
    <form [formGroup]="formGroup()" (ngSubmit)="submit()">
      <ion-item class="ion-invalid">
        <ion-label position="floating" for="email">Email</ion-label>
        <ion-input formControlName="email" id="email" type="email"></ion-input>
      </ion-item>
      <ion-note *ngIf="formGroup().get('email')?.dirty && formGroup().get('email')?.errors" color="danger">
        @if(formGroup().get('email')?.errors?.['required']) { Email is required } 
        @if(formGroup().get('email')?.errors?.['email']) { Invalid email format }
      </ion-note>

      <ion-item>
        <ion-label position="floating" for="name">Name</ion-label>
        <ion-input formControlName="name" id="name"></ion-input>
        <ion-note *ngIf="formGroup().get('name')?.dirty && formGroup().get('name')?.errors" color="danger">
          @if(formGroup().get('name')?.errors?.['required']) { Name is required }
        </ion-note>
      </ion-item>

      <ion-item>
        <ion-label position="floating" for="password">Password</ion-label>
        <ion-input formControlName="password" type="password" id="password"></ion-input>
        <ion-note *ngIf="formGroup().get('password')?.dirty && formGroup().get('password')?.errors" color="danger">
          @if(formGroup().get('password')?.errors?.['required']) { Password is required } 
          @if(formGroup().get('password')?.errors?.['pattern']) { Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character }
        </ion-note>
      </ion-item>

      <ion-item>
        <ion-label position="floating" for="confirmPassword">Confirm Password</ion-label>
        <ion-input formControlName="confirmPassword" type="password" id="confirmPassword"></ion-input>
        <ion-note *ngIf="formGroup().get('confirmPassword')?.dirty" color="danger">
          @if(formGroup().get('confirmPassword')?.errors?.['required']) { Confirm Password is required }
          @if(formGroup().errors?.['mismatch']) { Passwords do not match }
        </ion-note>
      </ion-item>

      <ion-button expand="block" type="submit" [disabled]="!formGroup().valid">
        Register
      </ion-button>
   </form>
`,
})
export class RegisterFormComponent {
  formGroup = input.required<FormGroup<any>>();
  onSubmit = output<any>();
  
  submit = () => {
    this.onSubmit.emit(null);
  }
}
