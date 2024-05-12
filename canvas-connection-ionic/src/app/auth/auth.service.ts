import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../shared/types';

export type RegisterPayload = {
  email: string;
  name: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  //Login
  public login$ = (payload: { email: string; password: string }) =>
    this.http
      .post<ApiResponse<{ access_token: string }>>(
        `${environment.apiUrl}auth/login`,
        payload
      )
      .pipe(
        tap(({ data, success }) => {
          if (success) {
            localStorage.setItem('access_token', data[0].access_token);
          }
        }),
        map(({ success, data }) => ({ success, data })),
        catchError(({ error }) => of(error))
      );

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  //Register
  public register$ = (payload: RegisterPayload) =>
    this.http
      .post<ApiResponse<null>>(`${environment.apiUrl}auth/register`, payload)
      .pipe(
        map(({ success, message }) => ({ success, message })),
        catchError(({ error }) => of(error))
      );

  public registrationForm = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: [
        this.confirmPasswordValidator('password', 'confirmPassword'),
      ],
    }
  );

  private passwordValidator() {
    return Validators.pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
    );
  }

  private confirmPasswordValidator(
    passwordKey: string,
    confirmPasswordKey: string
  ): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey);

      const confirmPassword = group.get(confirmPasswordKey);

      if (password?.value !== confirmPassword?.value) {
        return { mismatch: true };
      }

      return null;
    };
  }
}
