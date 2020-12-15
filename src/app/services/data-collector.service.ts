import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class DataCollectorService {

    courses: any = [];
    users: any = [];

    constructor() {
        this.getAllCourses();
        this.getAllUsers();
    }

    getAllUsers() {
        firebase.database().ref('users').once('value', snapshot => {
            this.users = [];
            snapshot.forEach((node) => {
                const user = node.val();
                this.users.push(user);
            });
            console.log(this.users);
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
}
