import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class DataCollectorService {

    courses: any = [];
    students: any = [];
    teachers: any = [];
    quizBanks = [];

    constructor() {
        this.getAllCourses();
        this.getAllUsers();
        this.getAllQuizBanks();
    }

    getAllUsers() {
        firebase.database().ref('users').once('value', snapshot => {
            this.students = [];
            this.teachers = [];
            snapshot.forEach((node) => {
                const user = node.val();
                if (user.isStudent) {
                    this.students.push(user);
                } else {
                    this.teachers.push(user);
                }
            });
        });
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

    getAllQuizBanks() {
        firebase.database().ref('quizBanks').once('value', snapshot => {
            this.quizBanks = [];
            snapshot.forEach((node) => {
                const bank = node.val();
                bank.key = node.val().key;
                this.quizBanks.push(bank);
            });
        }).then(res => {
        }).catch(err => {
            console.log(err);
        });
    }
}
