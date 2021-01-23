import {Injectable} from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
    providedIn: 'root'
})
export class DataCollectorService {

    courses: any = [];
    students: any = [];
    teachers: any = [];
    quizzes: any;
    quizBanks = [];
    attemptQuizez: any = [];
    studentCourses: any = [];
    teacherCourses: any = [];
    myAttemptQuizez: any = [];

    constructor() {
        this.getStudentCurse();
        this.getTeacherCurse();
        this.getAllCourses();
        this.getAllUsers();
        this.getAllQuizBanks();
        this.getAllQuizzes();
        this.getAllAttemptedQuizez();
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

    getStudentCurse() {
        firebase.database().ref('student_course').once('value', snapshot => {
            this.studentCourses = [];
            snapshot.forEach((node) => {
                const sc = node.val();
                sc.key = node.val().key;
                this.studentCourses.push(sc);
            });
        }).then(res => {
        }).catch(err => {
            console.log(err);
        });
    }

    getTeacherCurse() {
        firebase.database().ref('teacher_course').once('value', snapshot => {
            this.teacherCourses = [];
            snapshot.forEach((node) => {
                const tc = node.val();
                tc.key = node.val().key;
                this.teacherCourses.push(tc);
            });
        }).then(res => {
        }).catch(err => console.log(err));
    }

    getCoursesByStudentId(studentId) {
        const cources: any = [];
        this.studentCourses.filter(sc => {
            if (sc.studentId === studentId) {
                const course = this.courses.find(c => c.key === sc.courseKey);
                cources.push(course);
            }
        });
        return cources;
    }

    getCoursesByTeacherId(teacherId) {
        const cources: any = [];
        this.teacherCourses.filter(sc => {
            if (sc.teacherId === teacherId) {
                const course = this.courses.find(c => c.key === sc.courseKey);
                cources.push(course);
            }
        });
        return cources;
    }

    getAllQuizzes() {
        firebase.database().ref('quizzes').once('value', snapshot => {
            this.quizzes = [];
            snapshot.forEach((node) => {
                const q = node.val();
                q.key = node.val().key;
                this.quizzes.push(q);
            });
        }).then(res => {
        }).catch(err => {
            console.log(err);
        });
    }

    filterQuizzesByCourseId(key) {
        return this.quizzes.filter(q => q.courseKey === key);
    }

    getAllAttemptedQuizez() {
        firebase.database().ref('attemptQuizzes').once('value', snapshot => {
            this.attemptQuizez = [];
            const user: any = JSON.parse(localStorage.getItem('user'));
            snapshot.forEach((node) => {
                const q = node.val();
                q.key = node.val().key;
                this.attemptQuizez.push(q);
                if (q.studentId === user.uid) {
                    this.myAttemptQuizez.push(q);
                }
                console.log('---------------', this.myAttemptQuizez);
            });
        }).then(res => {
        }).catch(err => {
            console.log(err);
        });
    }
}
