import {Component} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../services/data-collector.service';
import * as firebase from 'firebase';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    courses: any = [];
    user: any = {};
    courseName = 'Data Mining';

    constructor(private alertController: AlertController,
                private dataColloector: DataCollectorService,
                private navCtrl: NavController) {
        this.user.isTeacher = true;
        this.getAllCourses();
    }

    getAllCourses() {
        firebase.database().ref('courses').once('value', snapshot => {
            this.courses = [];
            snapshot.forEach((node) => {
                const course = node.val();
                this.courses.push(course);
            });
            console.log(this.courses);
        });
    }

    async joinClass() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Join ' + this.courseName + ' !!!',
            inputs: [
                {
                    name: 'join',
                    type: 'text',
                    placeholder: 'Enter Class Code'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Ok',
                    handler: () => {
                        console.log('Confirm Ok');
                    }
                }
            ]
        });
        await alert.present();
    }

    addCourse() {
        this.navCtrl.navigateForward(['/add-course']);
    }
}
