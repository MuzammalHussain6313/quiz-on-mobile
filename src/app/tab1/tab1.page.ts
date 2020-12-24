import {Component, OnInit} from '@angular/core';
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
export class Tab1Page implements OnInit {

    allCourses: any;
    courses: any;
    user: any = {};
    courseName = 'Data Mining';

    constructor(private alertController: AlertController,
                private dataCollector: DataCollectorService,
                private utils: UtilsService,
                private service: UserService,
                private navCtrl: NavController) {
        this.user = service.getUser();
        setTimeout(() => {
            if (this.user.isStudent) {
                this.courses = this.dataCollector.getCoursesByStudentId(this.user.uid);
                console.log('courses', this.courses);
            } else {
                this.courses = this.dataCollector.getCoursesByTeacherId(this.user.uid);
            }
        }, 5000);
    }

    ngOnInit() {

    }

    getAllCourses() {
        firebase.database().ref('courses').once('value', snapshot => {
            this.allCourses = [];
            snapshot.forEach((node) => {
                const course = node.val();
                this.allCourses.push(course);
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
        const course = this.allCourses.filter((c) => c.courseCode === code);
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
