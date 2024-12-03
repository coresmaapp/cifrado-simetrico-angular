import { Routes } from '@angular/router';

import { SimetricoComponent } from '../app/simetrico/simetrico.component';



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

];