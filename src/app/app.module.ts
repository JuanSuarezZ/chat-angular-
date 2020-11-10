import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormsModule } from "@angular/forms";
//componentes
import { LoginComponent } from './components/login/login.component';
import { ChatComponent } from './components/chat/chat.component';

//servicios
import { ChatService } from "./providers/chat.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [
     AppComponent,     
     ChatComponent,
     LoginComponent 
    ],
  providers: [
    ChatService,
    AngularFireAuth,//esto falla, pero funciona con providers
    AngularFirestore
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}