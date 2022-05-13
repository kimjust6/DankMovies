import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { Page404Component } from './components/page-404/page-404.component';
const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: '**', pathMatch: 'full', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
