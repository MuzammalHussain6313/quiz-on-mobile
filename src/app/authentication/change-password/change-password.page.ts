import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.page.html',
    styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

    constructor() {
    }

    passwordType = 'password';
    passwordIcon = 'eye-off';

    ngOnInit() {
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    async changePassword() {
    }

    async updatePassword(newPassword) {
    }

    mismatchedPasswords(otherControlName: string) {
    }
}
