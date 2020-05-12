import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {MainLayoutComponent} from './layouts/main-layout/main-layout.component'
import {AppRoutingModule} from "./app-routing.module"
import {AuthComponent} from './authentication/auth/auth.component'
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component'
import {LoginComponent} from './authentication/login/login.component'
import {ReactiveFormsModule} from "@angular/forms"
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http"
import {ErrorInterceptor} from "../shared/error-interceptor"
import {ErrorComponent} from "../shared/error-component/error.component"
import {MatDialogModule} from "@angular/material/dialog"
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {OverviewComponent} from './overview/overview.component'
import {CostsComponent} from './wallet/costs/costs.component'
import {IncomeComponent} from './wallet/income/income.component'
import {TasksComponent} from './tasks/tasks.component'
import {AnalyticsComponent} from './analytics/analytics.component'
import {WalletComponent} from './wallet/wallet/wallet.component'
import {TokenInterceptor} from "./authentication/token-interceptor"
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatIconModule} from "@angular/material/icon"
import {MatNativeDateModule} from "@angular/material/core"
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SideNavComponent } from './layouts/main-layout/side-nav/side-nav.component'
import {MatMenuModule} from "@angular/material/menu"
import {MatCardModule} from "@angular/material/card"
import {MatCheckboxModule} from "@angular/material/checkbox"
import {MatTooltipModule} from "@angular/material/tooltip"


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthComponent,
    AuthLayoutComponent,
    LoginComponent,
    ErrorComponent,
    OverviewComponent,
    CostsComponent,
    IncomeComponent,
    TasksComponent,
    AnalyticsComponent,
    WalletComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatMenuModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule {
}
