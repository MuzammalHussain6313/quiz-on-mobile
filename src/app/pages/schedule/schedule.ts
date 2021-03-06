import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AlertController, Config, IonList, IonRouterOutlet, LoadingController, ModalController, ToastController} from '@ionic/angular';

import {ScheduleFilterPage} from '../schedule-filter/schedule-filter';
import {ConferenceData} from '../../providers/conference-data';
import {UserData} from '../../providers/user-data';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', {static: true}) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  showSearchbar: boolean;
  form: FormGroup;
  list = [];
  obj: any = {};
  updating = false;
  index;
  constructor(
    public alertCtrl: AlertController,
    public confData: ConferenceData,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public user: UserData,
    public config: Config,
    public fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.updateSchedule();
    this.ios = this.config.get('mode') === 'ios';
    this.formInitializer();
  }

  formInitializer() {
    this.form = this.fb.group({
      time: [null, [Validators.required]],
      day: [null, [Validators.required]]
    });
  }

  addData() {
    const time = this.form.value.time;
    const day = this.form.value.day;
    if (time && day && this.updating === false) {
      this.obj.time = time;
      this.obj.day = day;
      this.list.push(this.obj);
      this.obj = {};
      this.form.controls.time.setValue(null);
      this.form.controls.day.setValue(null);
    }
  }

  done() {
    this.updating = false;
    this.list[this.index].time = this.form.value.time;
    this.list[this.index].day = this.form.value.day;
    this.form.controls.time.setValue(null);
    this.form.controls.day.setValue(null);
  }

  updateValue(index: any) {
    this.updating = true;
    this.index = index;
    this.form.controls.time.setValue(this.list[index].time);
    this.form.controls.day.setValue(this.list[index].day);
  }

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    if (this.scheduleList) {
      this.scheduleList.closeSlidingItems();
    }

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ScheduleFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {excludedTracks: this.excludeTracks}
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateSchedule();
    }
  }

  async addFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any) {
    if (this.user.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // Add as a favorite
      this.user.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }

  }

  async removeFavorite(slidingItem: HTMLIonItemSlidingElement, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async openSocial(network: string, fab: HTMLIonFabElement) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }
}
