import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  formRegister: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    repeatPassword: [null, [Validators.required, Validators.minLength(8)]],
  });
  constructor(
    private fb: FormBuilder,
    private firebase: FirebaseService,
  ) { }

  ngOnInit(): void {

  }

  handleLogin() {
    console.log(this.formLogin.value);
    // this.firebase.addUser(this.form.value);

  }

  handleRegister() {
    console.log(this.formRegister.value);
  }

}
