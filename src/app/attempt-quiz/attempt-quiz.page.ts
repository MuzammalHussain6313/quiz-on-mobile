import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-attempt-quiz',
    templateUrl: './attempt-quiz.page.html',
    styleUrls: ['./attempt-quiz.page.scss'],
})
export class AttemptQuizPage implements OnInit {

    questions = [
        {
        type: 'mcq',
        question: 'When pakistan cam into being?',
        correctAnswer: '1947',
        options: ['1946', '1947', '1949', '1948']
    }, {
        type: 'fillInTheBlank',
        part1: 'Pakistan become an atomic power in ',
        correctAnswer: '1998',
        part2: null
    }, {
        type: 'short',
        question: 'When pakistan cam into being?',
        correctAnswer: '1947',
    }, {
        type: 'trueFalse',
        question: 'Pakistan cam into being in 1987',
        correctAnswer: 'false',
    }, {
        type: 'fillInTheBlank',
        part1: 'OOPS stand for Object Oriented',
        correctAnswer: 'Programming',
        part2: 'System'
      }, {
        type: 'fillInTheBlank',
        part1: null,
        correctAnswer: 'Typescript',
        part2: 'is supper set of javascript'
      },
    ];

    quizForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.formInitializer();
    }

    formInitializer() {
        this.quizForm = this.formBuilder.group({});
        for (let i = 0; i < this.questions.length; i++) {
            const questionNo = 'q' + (i + 1) + '';
            this.quizForm.addControl(questionNo, this.formBuilder.control('', Validators.required));
        }
        console.log(this.quizForm.value);
    }

    submitQuiz() {
        console.log(this.quizForm.value);
    }
}
