import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

function initializeKeycloak(keycloak: KeycloakService){
  return () => 
    keycloak.init({
      config: {
        url:'http://localhost:8080/auth',
        realm: 'MSTeam',
        clientId:'MSTeam_Client1',
      },
      initOptions:{
        onLoad:'login-required', // allowed values 'login-required', 'check-sso'
        flow:'standard' // allowed values 'standard', 'implicit', 'hybrid'
      },
    })
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide:APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi:true,
      deps:[KeycloakService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
