import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Cliente } from '../modelo/cliente.model';


@Injectable()
export default class ClienteServicio {
  clientesColeccion: AngularFirestoreCollection<Cliente>;
  clientesDoc!: AngularFirestoreDocument<Cliente>;
  clientes!: Observable<Cliente[]>;
  cliente!: Observable<Cliente>;
  constructor(private db: AngularFirestore) {
    this.clientesColeccion = db.collection('clientes', (ref) =>
      ref.orderBy('nombre', 'asc')
    );
  }
  getClientes(): Observable <Cliente[]> {
    //obtener clientes
    this.clientes = this.clientesColeccion?.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.id;
          return datos;
        });
      })
    );
     this.clientes;
  }
}

//configurando cliente servicios
