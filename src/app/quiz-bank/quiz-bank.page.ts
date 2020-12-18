import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UtilsService} from '../services/utils.service';

@Component({
    selector: 'app-quiz-bank',
    templateUrl: './quiz-bank.page.html',
    styleUrls: ['./quiz-bank.page.scss'],
})
export class QuizBankPage implements OnInit {
    questionBank: any = [];
    question = {
        type: '',
        answer: '',
        options: [],
        question: '',
        marks: '',
        part1: '',
        part2: '',
        blank: '',
        getReason: '',
        reason: '',
    };

    constructor(private alertCtrl: AlertController,
                private utils: UtilsService,
                private navCtrl: NavController) {
    }

    ngOnInit() {
    }

    expandDonation(quiz: any) {
        quiz.show = !quiz.show;
    }

    changeValue(event) {
        this.question.type = event.detail.value;
    }

    addQuestion() {
        console.log(this.question);
        this.questionBank.push(this.question);
        this.question = {
            type: '', answer: '', options: [], question: '', marks: '',
            part1: '', part2: '', blank: '', getReason: '', reason: ''
        };
    }

    addQuestionBank() {
      this.utils.presentLoading('please wait...');
      const course = JSON.parse(localStorage.getItem('course'));
      this.questionBank.courseKey = course.key;
      const key = firebase.database().ref('/quizBanks').push().key;
      firebase.database().ref(`quizBanks/${key}`).set(this.questionBank).then(res => {
        console.log(res);
        this.utils.stopLoading();
        this.utils.presentToast('Quiz bank successfully Added.');
        this.navCtrl.back();
      }).catch(err => {
        this.utils.stopLoading();
        console.log(err);
      });
    }
}
