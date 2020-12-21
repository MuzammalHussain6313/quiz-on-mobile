import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {DataCollectorService} from '../services/data-collector.service';
import {UtilsService} from '../services/utils.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-add-quiz',
    templateUrl: './add-quiz.page.html',
    styleUrls: ['./add-quiz.page.scss'],
})
export class AddQuizPage implements OnInit {

    questions: any = [];
    quizForm: FormGroup;
    mcqForm: FormGroup;
    shortQForm: FormGroup;
    FIBForm: FormGroup;
    TFForm: FormGroup;
    type: string;

    constructor(private alertCtrl: AlertController,
                private navCtrl: NavController,
                private utils: UtilsService,
                private formBuilder: FormBuilder,
                private dataCollector: DataCollectorService) {
    }

    ngOnInit() {
        this.formInitializer();
        this.questionFormInitializer();
    }

    formInitializer() {
        this.quizForm = this.formBuilder.group({
            title: [null, [Validators.required]],
            totalMarks: [null, [Validators.required]],
            date: [null, [Validators.required]],
            time: [null, [Validators.required]],
            questions: [null, [Validators.required]]
        });
    }

    questionFormInitializer() {
        this.mcqForm = this.formBuilder.group({
            type: ['mcqs', [Validators.required]],
            answer: [null, [Validators.required]],
            optionA: [null, [Validators.required]],
            optionB: [null, [Validators.required]],
            optionC: [null, [Validators.required]],
            optionD: [null, [Validators.required]],
            question: [null, [Validators.required]],
            marks: [null, [Validators.required]],
        });
        this.shortQForm = this.formBuilder.group({
            type: ['shortQuestions', [Validators.required]],
            answer: [null, [Validators.required]],
            question: [null, [Validators.required]],
            marks: [null, [Validators.required]],
        });
        this.TFForm = this.formBuilder.group({
            type: ['trueFalse', [Validators.required]],
            answer: [null, [Validators.required]],
            optionA: ['True', [Validators.required]],
            optionB: ['False', [Validators.required]],
            question: [null, [Validators.required]],
            marks: [null, [Validators.required]],
            getReason: [null, [Validators.required]]
        });
        this.FIBForm = this.formBuilder.group({
            type: ['fillInBlanks', [Validators.required]],
            marks: [null, [Validators.required]],
            part1: [null, [Validators.required]],
            part2: [null, [Validators.required]],
            blank: [null, [Validators.required]]
        });
    }

    ionViewDidEnter() {
        const questions = JSON.parse(localStorage.getItem('selectedQuestions'));
        if (questions.length) {
            for (const q of questions) {
                this.questions.push(q);
            }
            console.log(this.questions);
        }
    }

    expandDonation(quiz: any) {
        quiz.show = !quiz.show;
    }

    changeValue(event) {
        this.type = event.detail.value;
        // this.questionForm.controls.question.setValue(null);
        // this.questionForm.controls.marks.setValue(null);
        // this.questionForm.controls.answer.setValue(null);
        // if (this.question.type === 'mcqs') {
        //     this.questionForm.controls.part1.setValue('');
        //     this.questionForm.controls.part2.setValue('');
        //     this.questionForm.controls.blank.setValue('');
        //     this.questionForm.controls.getReason.setValue('');
        //     this.questionForm.controls.reason.setValue('');
        //     this.questionForm.controls.optionA.setValue(null);
        //     this.questionForm.controls.optionB.setValue(null);
        //     this.questionForm.controls.optionC.setValue(null);
        //     this.questionForm.controls.optionD.setValue(null);
        // } else if (this.question.type === 'shortQuestions') {
        //     this.questionForm.controls.part1.setValue('');
        //     this.questionForm.controls.part2.setValue('');
        //     this.questionForm.controls.blank.setValue('');
        //     this.questionForm.controls.getReason.setValue('');
        //     this.questionForm.controls.reason.setValue('');
        //     this.questionForm.controls.optionA.setValue('');
        //     this.questionForm.controls.optionB.setValue('');
        //     this.questionForm.controls.optionC.setValue('');
        //     this.questionForm.controls.optionD.setValue('');
        // } else if (this.question.type === 'trueFalse') {
        //     this.questionForm.controls.part1.setValue('');
        //     this.questionForm.controls.part2.setValue('');
        //     this.questionForm.controls.blank.setValue('');
        //     this.questionForm.controls.getReason.setValue(null);
        //     this.questionForm.controls.reason.setValue(null);
        //     this.questionForm.controls.optionA.setValue('True');
        //     this.questionForm.controls.optionB.setValue('False');
        //     this.questionForm.controls.optionC.setValue('');
        //     this.questionForm.controls.optionD.setValue('');
        // } else {
        //     this.questionForm.controls.part1.setValue(null);
        //     this.questionForm.controls.part2.setValue(null);
        //     this.questionForm.controls.blank.setValue(null);
        //     this.questionForm.controls.optionA.setValue('');
        //     this.questionForm.controls.optionB.setValue('');
        //     this.questionForm.controls.optionC.setValue('');
        //     this.questionForm.controls.optionD.setValue('');
        //     this.questionForm.controls.getReason.setValue('');
        //     this.questionForm.controls.reason.setValue('');
        // }
    }

    async presentAlert(question: any) {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: question?.question,
            message: '<strong>Ans: </strong>' + question?.answer,
            buttons: [{
                text: 'Okay',
                handler: () => {
                }
            }]
        });
        await alert.present();
    }

    addQuestion() {
        debugger
        console.log(this.shortQForm.value);
        console.log(this.FIBForm.value);
        console.log(this.TFForm.value);
        console.log(this.mcqForm.value);
        // console.log(this.questionForm.value);
        // this.marks = this.marks + this.question.marks;
        // if (this.marks > this.quiz.totalMarks) {
        //     this.marks = this.marks - this.question.marks;
        //     this.utils.presentAlert('Marks Limit Exceeded. Please increase the total marks to add more questions.');
        // } else {
        //     this.checkQuestionValid();
        //     if (this.questionValid) {
        //         this.quiz.questions.push(this.question);
        //         this.question = {
        //             type: '', answer: '', options: [], question: '', marks: 0,
        //             part1: '', part2: '', blank: '', getReason: '', reason: ''
        //         };
        //     } else {
        //         this.utils.presentAlert('Please select all required values.');
        //     }
        // }
    }

    addFromBank() {
        this.navCtrl.navigateForward(['/quiz-bank']);
    }

    addQuiz() {
        debugger
        console.log(this.quizForm.value);
        // this.utils.presentLoading('please wait...');
        // const key = firebase.database().ref('/quizzes').push().key;
        // this.quiz.key = key;
        // const course = JSON.parse(localStorage.getItem('course'));
        // this.quiz.courseKey = course.key;
        // firebase.database().ref(`/quizzes/${key}`).set(this.quiz).then(res => {
        //     localStorage.setItem('selectedQuestions', null);
        //     this.utils.stopLoading();
        //     this.utils.presentToast('Quiz Added successfully. Thanks For using Quiz App.');
        // }).catch(err => {
        //     console.log(err);
        //     this.utils.stopLoading();
        // });
    }

    addMCQ() {

    }

    addFIB() {

    }

    addSQ() {

    }

    addTF() {

    }

    checkSpace() {

    }
}
