import { Routes } from '@angular/router';

import { SimetricoComponent } from '../app/simetrico/simetrico.component';
import { Simetricov2Component } from '../app/simetricov2/simetricov2.component';


export const routes: Routes = [

    {
        path:'',
        redirectTo:'cifrado/simetrico',
        pathMatch:'full'
    },

    {
        path:'cifrado/simetrico',
        component: SimetricoComponent
    },

    {
        path:'cifrado/simetrico/v2',
        component: Simetricov2Component
    },

];