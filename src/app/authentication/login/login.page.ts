import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    constructor(private navCtrl: NavController) {
    }

    passwordType = 'password';
    passwordIcon = 'eye-off';

    ngOnInit() {
    }

    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }

    async login() {
        this.navCtrl.navigateRoot(['/tabs']);
    }

    async saveUser(id) {
    }

    registerUser() {
        this.navCtrl.navigateForward(['/signup']);
    }

    forgotPassword() {
        this.navCtrl.navigateForward(['/forget-password']);
    }
}
