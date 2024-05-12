import { Component, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { filter, map, startWith, switchMap, tap } from 'rxjs';
import { LoadState } from 'src/app/shared/types';
import { AuthService, RegisterPayload } from '../auth.service';
@Component({
  selector: 'auth-register',
  template: `
    @if(loadState$ | async; as loadState) {
      @if(loadState === 'loading'){
        <!-- TODO: convert to ion-skeleton-text https://ionicframework.com/docs/api/skeleton-text -->
        <ion-spinner style="display: block; margin: auto" name="dots" />
      } 
      @else {
        <auth-register-form [formGroup]="registrationForm" (onSubmit)="onSubmit()" />   
      }
    }
  `,
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private toastController = inject(ToastController);
  private router = inject(Router);

  formLoadingState = signal<LoadState>('idle');

  loadState$ = toObservable(this.formLoadingState).pipe(
    filter((state) => state === 'loading'),
    switchMap(() => {
      const { confirmPassword, ...payload } = this.registrationForm.value;

      return this.auth.register$(payload as RegisterPayload);
    }),
    tap(({message, success}) => {
      if(message) {
        this.toastController.create({
          message,
          duration: 2000,
          position: 'top',
        });
      }

      if (success) {
        this.router.navigate(['/auth/login']);
      }
    }),
    map(({success}) => {
      if (success) {
        this.formLoadingState.set('loaded');
        return 'loaded';
      }
      return 'error';
    }),
    startWith('idle')
  );

  registrationForm = this.auth.registrationForm;

  onSubmit() {
    this.formLoadingState.set('loading');
  }
}
