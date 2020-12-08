import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ResultPageRoutingModule} from './result-routing.module';

import {ResultPage} from './result.page';
import {ChartsModule} from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChartsModule,
        ResultPageRoutingModule
    ],
    declarations: [ResultPage]
})
export class ResultPageModule {
}
