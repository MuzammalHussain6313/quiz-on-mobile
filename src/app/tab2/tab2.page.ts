import {Component, OnInit} from '@angular/core';
import {ActionSheetController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../services/data-collector.service';
import {filter} from 'rxjs/operators';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    student = true;
    faculty = false;
    facultySearch: any;
    studentSearch: any;
    filteredStudents = [];
    filteredTeachers = [];
    students = [];
    teachers = [];

    constructor(private actionCtrl: ActionSheetController,
                private dataCollector: DataCollectorService,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        debugger
        this.students = this.dataCollector.students;
        this.filteredStudents = this.dataCollector.students;
        this.teachers = this.dataCollector.teachers;
        this.filteredTeachers = this.dataCollector.teachers;
    }

    ionViewDidLoad() {
        this.students = this.dataCollector.students;
        this.filteredStudents = this.dataCollector.students;
        this.teachers = this.dataCollector.teachers;
        this.filteredTeachers = this.dataCollector.teachers;
    }
    segmentChanged($event: CustomEvent) {
        this.student = !this.student;
        this.faculty = !this.faculty;
    }

    search(nameKey, myArray) {
        return myArray.filter((element) => element.email.includes(nameKey));
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
                        // this.navCtrl.navigateForward(['/add-quiz']);
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

    searchStudents() {
        if (this.studentSearch) {
            this.filteredStudents = this.search(this.studentSearch, this.students);
        } else {
            this.filteredStudents = this.students;
        }
    }

    searchTeachers() {
        if (this.facultySearch) {
            this.filteredTeachers = this.search(this.facultySearch, this.teachers);
        } else {
            this.filteredTeachers = this.teachers;
        }
    }

    clearSearch() {
        this.studentSearch = '';
        this.filteredStudents = this.students;
        this.facultySearch = '';
        this.filteredTeachers = this.teachers;
    }
}

