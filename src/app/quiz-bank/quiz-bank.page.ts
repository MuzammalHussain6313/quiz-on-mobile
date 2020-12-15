import { Component, OnInit } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-quiz-bank',
  templateUrl: './quiz-bank.page.html',
  styleUrls: ['./quiz-bank.page.scss'],
})
export class QuizBankPage implements OnInit {
  quiz = [
    {
      type: 'MCQ',
      question: 'When pakistan cam into being?',
      answer: '1947'
    },
    {
      type: 'Short Question',
      question: 'Describe OOPS in your own word?',
      answer: 'OOPS is system in which we consider a program is a group of objects in RAM'
    },
    {
      type: 'True/False',
      question: 'Pakistan Become Atomic power in 2000',
      answer: 'False'
    },
    {
      type: 'Fill in the Blanks',
      question: 'Primary key of other table in a reference of record is____________',
      answer: 'Foreign key'
    }
  ];
  question: any;
  part1 = '';
  part2 = '';

  constructor(private alertCtrl: AlertController) {
  }

  ngOnInit() {
  }

  expandDonation(quiz: any) {
    quiz.show = !quiz.show;
  }

  changeValue(event) {
    this.question = event.detail.value;
  }
}
