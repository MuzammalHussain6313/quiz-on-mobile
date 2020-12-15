import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {UtilsService} from '../services/utils.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.page.html',
    styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {
    courseForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private navCtrl: NavController,
                private utils: UtilsService) {
    }

    ngOnInit() {
        this.formInitializer();
    }

    formInitializer() {
        this.courseForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            ch: ['', Validators.compose([Validators.required])],
            courseCode: ['', Validators.compose([Validators.required])],
            startDate: ['', Validators.compose([Validators.required])],
            endDate: ['', Validators.compose([Validators.required])]
        });
    }

    async addCourse() {
        this.utils.presentLoading('please wait...');
        const randomstring = Math.random().toString(36).slice(-8);
        const key = firebase.database().ref('courses').push().key;
        const course = this.courseForm.value;
        course.key = key;
        course.joingCode = randomstring;
        firebase.database().ref(`courses/${key}`).set(course).then(res => {
            this.utils.stopLoading();
            this.utils.presentAlert(`Course successfully created. ${randomstring} is courses code to join the course. please share this course code with students`);
            console.log('data inserted res:', res);
            this.navCtrl.back();
        }).catch(err => {
            this.utils.stopLoading();
            console.log(err);
        });
    }
}
