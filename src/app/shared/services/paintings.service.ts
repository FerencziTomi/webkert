import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Painting } from '../models/painting';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaintingsService {
  private collectionName = 'Paintings';

  constructor(private afs: AngularFirestore) { }

  getAll(): Observable<Painting[]> {
    return this.afs.collection<Painting>(this.collectionName).valueChanges({ idField: 'id' });
  }

  create(painting: Omit<Painting, 'id'>): Promise<any> {
    return this.afs.collection<Omit<Painting, 'id'>>(this.collectionName).add(painting);
  }

  update(painting: Painting): Promise<void> {
    return this.afs.collection<Painting>(this.collectionName).doc(painting.id.toString()).update(painting);
  }

  delete(id: string): Promise<void> {
    return this.afs.collection<Painting>(this.collectionName).doc(id.toString()).delete();
  }
}