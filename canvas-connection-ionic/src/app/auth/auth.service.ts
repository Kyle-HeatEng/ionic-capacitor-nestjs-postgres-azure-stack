import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
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
