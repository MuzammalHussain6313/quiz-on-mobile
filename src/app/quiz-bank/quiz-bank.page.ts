import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import * as firebase from 'firebase';
import {UtilsService} from '../services/utils.service';
import {DataCollectorService} from '../services/data-collector.service';

@Component({
    selector: 'app-quiz-bank',
    templateUrl: './quiz-bank.page.html',
    styleUrls: ['./quiz-bank.page.scss'],
})
export class QuizBankPage implements OnInit {
    selectedQuestions: any = [];
    questions: any = [];
    questionBank: any = {};
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

    bank: any;

    constructor(private alertCtrl: AlertController,
                private dataCollector: DataCollectorService,
                private utils: UtilsService,
                private navCtrl: NavController) {
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        const course = JSON.parse(localStorage.getItem('course'));
        const quizBanks = this.dataCollector.quizBanks;
        this.bank = quizBanks.filter((element) => element.courseKey === course.key)[0];
        if (this.bank) {
            this.questions = this.bank.questions;
            for (let i = 0; i < this.questions; i++) {
                this.questions[i].selected = false;
            }
        }
    }

    expandDonation(quiz: any) {
        quiz.show = !quiz.show;
    }

    changeValue(event) {
        this.question.type = event.detail.value;
    }

    addQuestion() {
        console.log(this.question);
        this.questions.push(this.question);
        this.question = {
            type: '', answer: '', options: [], question: '', marks: '',
            part1: '', part2: '', blank: '', getReason: '', reason: ''
        };
    }

    addToCart(question, i) {
        this.questions[i].selected = true;
        this.selectedQuestions.push(question);
    }

    removeFromCart(question, i) {
        this.questions[i].selected = false;
        const index = this.selectedQuestions.indexOf(question);
        this.selectedQuestions.splice(i, 1);
    }

    addQuestionBank() {
        this.utils.presentLoading('please wait...');
        const course = JSON.parse(localStorage.getItem('course'));
        this.questionBank.questions = this.questions;
        this.questionBank.courseKey = course.key;
        let key;
        if (this.bank) {
            key = this.bank.key;
        } else {
            key = firebase.database().ref('/quizBanks').push().key;
        }
        this.questionBank.key = key;
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

    saveSelectedQuestions() {
        localStorage.setItem('selectedQuestions', JSON.stringify(this.selectedQuestions));
        this.navCtrl.back();
    }
}
