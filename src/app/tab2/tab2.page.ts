import {Component} from '@angular/core';
import {ActionSheetController, AlertController, NavController} from '@ionic/angular';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    student = true;
    faculty = false;

    constructor(private actionCtrl: ActionSheetController,
                private alertCtrl: AlertController,
                private navCtrl: NavController) {
    }

    segmentChanged($event: CustomEvent) {
        this.student = !this.student;
        this.faculty = !this.faculty;
    }

    async moreOptions() {
        const alert = await this.actionCtrl.create({
            header: 'More Options !!!',
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'View Details',
                    icon: 'eye',
                    cssClass: 'secondary',
                    handler: () => {
                        // this.navCtrl.navigateForward(['/result']);
                    }
                },
                {
                    text: 'Delete',
                    icon: 'trash',
                    cssClass: 'danger',
                    handler: () => {
                        this.navCtrl.navigateForward(['/add-quiz']);
                    }
                },
                {
                    text: 'Edit',
                    icon: 'pencil-sharp',
                    cssClass: 'primary',
                    handler: () => {
                        // this.navCtrl.navigateForward(['/students']);
                    }
                }
            ]
        });
        await alert.present();
    }
}
