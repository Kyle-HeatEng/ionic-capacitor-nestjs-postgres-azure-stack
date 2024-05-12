import { Component, inject, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { filter, map, startWith, switchMap, tap } from "rxjs";
import { LoadState } from "src/app/shared/types";
import { AuthService } from "../auth.service";

@Component({
  selector: 'auth-login',
  template: `
  @if(loadState$ | async; as loadState) {
      <auth-login-form [formGroup]="loginForm" (onSubmit)="onSubmit()" />
    }
      `,
})
export class LoginComponent {
  private auth = inject(AuthService);
  private toastController = inject(ToastController);
  private router = inject(Router);

  private formLoadingState = signal<LoadState>('idle');

  loginForm = this.auth.loginForm;

  loadState$ = toObservable(this.formLoadingState).pipe(
    filter((state) => state === 'loading'),
    switchMap(() => {
      return this.auth.login$(
        this.loginForm.value as { email: string; password: string }
      );
    }),
    tap(({ success, message }) => {
      if (message) {
        this.toastController.create({
          message,
          duration: 2000,
          position: 'top',
        });
      }

      if (success) {
        this.loginForm.reset();
        this.router.navigate(['/canvas']);
      }
    }),
    map(({ success }) => {
      if (success) {
        this.formLoadingState.set('loaded');
        return 'loaded';
      }
      return 'error';
    }),
    startWith('idle')
  );

  onSubmit = () => {
    this.formLoadingState.set('loading');
  };
}