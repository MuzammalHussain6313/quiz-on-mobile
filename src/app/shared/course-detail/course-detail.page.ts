import {Component, OnInit} from '@angular/core';
import {ActionSheetController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../../services/data-collector.service';
import {UtilsService} from '../../services/utils.service';

@Component({
    selector: 'app-course-detail',
    templateUrl: './course-detail.page.html',
    styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

    course: any;
    olQuizzes: any = [];
    upComingQuizzes: any = [];
    const;
    quizzes: any = [];

    constructor(private navCtrl: NavController,
                private dataCollector: DataCollectorService,
                private utils: UtilsService,
                private actionCtrl: ActionSheetController) {
    }

    ngOnInit() {
        this.devidQuizzes();
    }

    devidQuizzes() {
        this.course = JSON.parse(localStorage.getItem('course'));
        this.quizzes = this.dataCollector.filterQuizzesByCourseId(this.course.key);
        if (this.quizzes) {
            const currentDte = new Date();
            this.quizzes.forEach(quiz => {
                if (quiz.date.split('T')[0] < currentDte.toISOString().split('T')[0]) {
                    this.olQuizzes.push(quiz);
                }
            });
            this.quizzes.forEach(quiz => {
                if (quiz.date.split('T')[0] > currentDte.toISOString().split('T')[0]) {
                    this.upComingQuizzes.push(quiz);
                }
            });
        }
    }

    async moreOptions() {
        const alert = await this.actionCtrl.create({
            cssClass: 'my-custom-class',
            buttons: [
                {
                    text: 'View Results',
                    icon: 'bar-chart',
                    cssClass: 'secondary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/result']);
                    }
                },
                {
                    text: 'Add Quiz',
                    icon: 'add-circle',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/add-quiz']);
                    }
                },
                {
                    text: 'Quiz Bank',
                    icon: 'home',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/quiz-bank']);
                    }
                },
                {
                    text: 'View Students',
                    icon: 'people',
                    cssClass: 'primary',
                    handler: () => {
                        this.navCtrl.navigateForward(['/students']);
                    }
                }
            ]
        });
        await alert.present();
    }

    goToDetail(quiz) {
        localStorage.setItem('oldQuiz', JSON.stringify(quiz));
        this.navCtrl.navigateForward(['/old-quiz']);
    }

    attemptQuiz(quiz) {

        const varDate = new Date(quiz.date);
        const today = new Date();
        if (varDate === today || varDate <= today) {
          localStorage.setItem('attemptQuiz', JSON.stringify(quiz));
          this.navCtrl.navigateForward(['/attempt-quiz']);
        } else {
          this.utils.presentAlert('Please wait until quiz time start. Thanks');
        }
    }
}
