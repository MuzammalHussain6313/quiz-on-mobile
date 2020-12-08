import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, NavController} from '@ionic/angular';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {

  constructor(private navCtrl: NavController,
              private actionCtrl: ActionSheetController) { }

  ngOnInit() {
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
}
