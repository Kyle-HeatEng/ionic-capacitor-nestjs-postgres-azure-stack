import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { RegisterFormComponent } from './register/components/register-form.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, RegisterFormComponent],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
