import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppRocketsComponent} from "./page/app-rockets/app-rockets.component";
import {AppRocketDetailsComponent} from "./page/app-rocket-details/app-rocket-details.component";

const routes: Routes = [
  {path: 'rockets', component: AppRocketsComponent},
  {path: 'rockets/:id', component: AppRocketDetailsComponent},
  {path: '**', redirectTo: '/rockets', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
