import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    constructor() {
    }

    isStudent = false;
    passwordType = 'password';
    passwordIcon = 'eye-off';

    ngOnInit() {
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    async signUpUser() {
    }

    async saveUserInRealTime(uId, mail) {
    }

    mismatchedPasswords(otherControlName: string) {
    }

    decideRole(role) {
        if (role === 'student') {
            this.isStudent = true;
        } else {
            this.isStudent = false;
        }
    }

    changeOption(role) {
        this.decideRole(role.detail.value);
    }
}
