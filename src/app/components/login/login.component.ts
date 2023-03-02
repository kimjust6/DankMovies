import {
	SocialAuthService,
	FacebookLoginProvider,
	GoogleLoginProvider,
	SocialUser,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	private user: SocialUser = new SocialUser();
	public isLoggedIn: boolean = false;

	public formLogin: FormGroup = this.fb.group({
		email: [
			null,
			[
				Validators.required,
				Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
			],
		],
		password: [null, [Validators.required, Validators.minLength(8)]],
	});

	public formRegister: FormGroup = this.fb.group({
		email: [
			null,
			[
				Validators.required,
				Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
			],
		],
		firstName: [null, [Validators.required]],
		lastName: [null, [Validators.required]],
		password: [null, [Validators.required, Validators.minLength(8)]],
		repeatPassword: [null, [Validators.required, Validators.minLength(8)]],
	});
	constructor(
		private fb: FormBuilder,
		private firebaseService: FirebaseService,
		private socialAuthService: SocialAuthService
	) {}

	ngOnInit(): void {
		this.socialAuthService.authState.subscribe(user => {
			this.user = user;
			this.isLoggedIn = !user;
		});
	}

	handleNormalLogin() {
		console.log(this.formLogin.value);
		// this.firebase.addUser(this.form.value);
	}

	signInWithFB(): void {
		this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
	}

	handleNormalRegister() {
		console.log(this.formRegister.value);
	}

	signOut(): void {
		this.socialAuthService.signOut();
	}
}
