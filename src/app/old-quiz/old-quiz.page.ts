import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-old-quiz',
  templateUrl: './old-quiz.page.html',
  styleUrls: ['./old-quiz.page.scss'],
})
export class OldQuizPage implements OnInit {
    isStudent = false;
    isTeacher = true;

  constructor() { }

  ngOnInit() {
  }

}
