import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//firebase autenticacion
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';//este no se esta usandoxd


//interface
import { Mensaje } from "../interface/mensaje.interface";

@Injectable()


export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor( private afs: AngularFirestore, 
              public afAuth: AngularFireAuth ) {
                        
                this.afAuth.authState.subscribe( user => {

                  console.log( 'estado del usuario: ', user );
                  
                  if( !user ){
                    return;
                  } 
                   
                  this.usuario.nombre = user.displayName;
                  this.usuario.uid = user.uid;
                  this.usuario.urlImg = user.photoURL;
                })
             }
  
    login( proveedor: string) {
      if( proveedor == 'google'){
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
      }else{
        this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
      }
      
    }
    logout() {
      this.usuario = {};
      this.afAuth.auth.signOut();
    }
  

  cargarMensajes(){
    this.itemsCollection = this.afs.collection<Mensaje>('chats', ref => ref.orderBy('fecha','desc')
                                                                           .limit(7));
    return this.itemsCollection.valueChanges()
                                .map( (mensajes: Mensaje[]) => {
                                  console.log( mensajes );
                                  this.chats = [];
                                  for(let mensaje of mensajes){
                                    this.chats.unshift(mensaje);
                                  }

                                  //this.chats = mensajes;
                                })
  }

  agregarMensaje( texto: string){
    //falta el uid del user 
    let mensaje : Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    return this.itemsCollection.add( mensaje );
  }

  
  
  
}
