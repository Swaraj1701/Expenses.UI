import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

loginForm: FormGroup;
errorMessage: string | null = null;

constructor(private fb: FormBuilder,
  private authService: AuthService,
  private router: Router
) {

  this.loginForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    }
  )
}

hasError(controlName: string, errorName: string): boolean{
  const control = this.loginForm.get(controlName);
  return (control?.touched || control?.dirty) && control.hasError(errorName) || false;
}

onSubmit() {
  this.errorMessage = null;
if(this.loginForm.valid)
{
  const logIn = this.loginForm.value;
  this.authService.login(logIn).subscribe({
    next: () => {
      this.router.navigate(['/transactions']);
    },
    error: (error)=>{
      console.log('Error - ', error);
      this.errorMessage = error.error?.message || 'An error occured during login, please try again'
    }
  })
}
}
}
