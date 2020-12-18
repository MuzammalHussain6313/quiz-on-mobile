import {Component} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../services/data-collector.service';
import {UtilsService} from '../services/utils.service';
import * as firebase from 'firebase';
import {UserService} from '../services/user.service';

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
                private utils: UtilsService,
                private service: UserService,
                private navCtrl: NavController) {
        // this.user.isTeacher = true;
        this.user = service.getUser();
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
            header: 'Join New Course !!!',
            inputs: [
                {
                    name: 'code',
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
                    handler: (data) => {
                        this.joinCourseInDatabase(data.code);
                        console.log('Confirm Ok');
                    }
                }
            ]
        });
        await alert.present();
    }

    joinCourseInDatabase(code) {
        const course = this.courses.filter((c) => c.courseCode === code);
        if (course.length) {
            const key = firebase.database().ref('student_course').push().key;
            firebase.database().ref(`student_course/${key}`).set({
                courseKey: course[0].key,
                courseCode: course[0].courseCode,
                studentId: this.user.uid
            });
        } else {
            this.utils.presentToast('Enter Correct course code...');
            this.joinClass();
        }
    }

    addCourse() {
        this.navCtrl.navigateForward(['/add-course']);
    }

    goToDetail(course) {
        localStorage.setItem('course', JSON.stringify(course));
        this.navCtrl.navigateForward(['/course-detail']);
    }
}
