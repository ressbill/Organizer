import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component"
import {AuthComponent} from "./authentication/auth/auth.component"
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component"
import {LoginComponent} from "./authentication/login/login.component"

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'authorization', component: AuthComponent},
      {path: 'login', component: LoginComponent}
    ]
  },  {
    path: '', component: MainLayoutComponent, canActivate:[], children: []
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
