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

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AuthComponent,
    AuthLayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
