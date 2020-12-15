import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.page.html',
  styleUrls: ['./add-course.page.scss'],
})
export class AddCoursePage implements OnInit {
    courseForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formInitializer();
  }

  formInitializer() {
    this.courseForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      ch: ['', Validators.compose([Validators.required])],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])]
    });
  }

  addCourse() {

  }
}
