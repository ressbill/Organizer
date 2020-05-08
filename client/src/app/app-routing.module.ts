import {NgModule} from "@angular/core"
import {RouterModule, Routes} from "@angular/router"
import {MainLayoutComponent} from "./layouts/main-layout/main-layout.component"
import {AuthComponent} from "./authentication/auth/auth.component"
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component"
import {LoginComponent} from "./authentication/login/login.component"
import {AuthGuard} from "./authentication/auth/auth-guard"
import {OverviewComponent} from "./overview/overview.component"
import {AnalyticsComponent} from "./analytics/analytics.component"
import {TasksComponent} from "./tasks/tasks.component"
import {WalletComponent} from "./wallet/wallet/wallet.component"
import {CostsComponent} from "./wallet/costs/costs.component"
import {IncomeComponent} from "./wallet/income/income.component"

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'authorization', component: AuthComponent},
      {path: 'login', component: LoginComponent}
    ]
  },  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard],  children: [
      {path: 'overview', component: OverviewComponent},
      {path: 'analytics', component: AnalyticsComponent},
      {path: 'tasks', component: TasksComponent},
      {path: 'wallet', component: WalletComponent},
      {path: 'wallet/costs', component: CostsComponent},
      {path: 'wallet/income', component: IncomeComponent},
    ]
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
