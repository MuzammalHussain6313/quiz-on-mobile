import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-add-quiz',
    templateUrl: './add-quiz.page.html',
    styleUrls: ['./add-quiz.page.scss'],
})
export class AddQuizPage implements OnInit {
    quizs: any;
    question: any;
    part1 = '';
    part2 = '';
    constructor() {
    }

    ngOnInit() {
    }

    expandDonation(quiz: any) {

    }

    changeValue(event) {
      this.question = event.detail.value;
    }
}
