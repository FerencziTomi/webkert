import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Painting } from '../models/painting';
import { empty, firstValueFrom, from, map, Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, getDocs, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { User } from '@angular/fire/auth';
import { User as MyUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class PaintingsService {
  private readonly PAINTINGS_COLLECTION = 'Paintings';
  private readonly USERS_COLLECTION = 'Users';

  constructor(private authService: AuthService, private firestore: Firestore) { }

  
  async addPainting(paintings: Omit<Painting, 'id'>): Promise<Painting> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }

      const PaintingsCollection = collection(this.firestore, this.PAINTINGS_COLLECTION);
      
      const PaintingToSave = {
        ...paintings
      };
      
      const docRef = await addDoc(PaintingsCollection, PaintingToSave);
      const PaintingId = docRef.id;
      
      await updateDoc(docRef, { id: PaintingId });
      
      const newPainting = {
        ...PaintingToSave,
        id: PaintingId
      } as Painting;

      
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as MyUser;
        const paintings = userData.paintings || [];
        paintings.push(PaintingId);
        await updateDoc(userDocRef, { paintings });
      }

      return newPainting;
    } catch (error) {
      console.error('Error adding Painting:', error);
      throw error;
    }
  }

  // READ
  getAllPaintings(): Observable<Painting[]> {
    return this.authService.currentUser.pipe(
      switchMap(async user => {
        if (!user) {
          return of([]);
        }
        try {
          const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
          console.log(userDocRef)
          const userDoc = await getDoc(userDocRef);
          console.log(userDocRef)
          if (!userDoc.exists()) {
            return of([]);
          }
          const userData = userDoc.data() as MyUser;
          const PaintingIds = userData.paintings || [];
          if (PaintingIds.length === 0) {
            return of([]);
          }

          const PaintingsCollection = collection(this.firestore, this.PAINTINGS_COLLECTION);
          const Paintings: Painting[] = [];
          const batchSize = 10;

          for (let i = 0; i < PaintingIds.length; i += batchSize) {
            const batch = PaintingIds.slice(i, i + batchSize);
            const q = query(PaintingsCollection, where('__name__', 'in', batch));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
              Paintings.push({ ...doc.data(), id: doc.id } as Painting);
            });
          }

          return of(Paintings.sort((a, b) => {
            return a.year.toString().localeCompare(b.year.toString());
          }));
        } catch (error) {
          console.error('Error fetching Paintings:', error);
          return of([]);
        }
      }),
      switchMap(Paintings => Paintings)
    );
  }

  async getPaintingById(PaintingId: string): Promise<Painting | null> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        return null;
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        return null;
      }
      const userData = userDoc.data() as MyUser;
      if (!userData.paintings || !userData.paintings.includes(PaintingId)) {
        return null;
      }

      const PaintingDocRef = doc(this.firestore, this.PAINTINGS_COLLECTION, PaintingId);
      const PaintingSnapshot = await getDoc(PaintingDocRef);
      if (PaintingSnapshot.exists()) {
        return { ...PaintingSnapshot.data(), id: PaintingId } as Painting;
      }
      return null;
    } catch (error) {
      console.error('Error fetching Painting:', error);
      return null;
    }
  }

  // UPDATE
  async updatePainting(PaintingId: string, updatedData: Partial<Painting>): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const userData = userDoc.data() as MyUser;
      if (!userData.paintings || !userData.paintings.includes(PaintingId)) {
        throw new Error('Painting does not belong to the user');
      }

      const dataToUpdate: any = { ...updatedData };
      const PaintingDocRef = doc(this.firestore, this.PAINTINGS_COLLECTION, PaintingId);
      return updateDoc(PaintingDocRef, dataToUpdate);
    } catch (error) {
      console.error('Error updating Painting:', error);
      throw error;
    }
  }


  // DELETE
  async deletePainting(PaintingId: string): Promise<void> {
    try {
      const user = await firstValueFrom(this.authService.currentUser.pipe(take(1)));
      if (!user) {
        throw new Error('No authenticated user found');
      }
      const userDocRef = doc(this.firestore, this.USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User not found');
      }
      const userData = userDoc.data() as MyUser;
      if (!userData.paintings || !userData.paintings.includes(PaintingId)) {
        throw new Error('Painting does not belong to the user');
      }

      const PaintingDocRef = doc(this.firestore, this.PAINTINGS_COLLECTION, PaintingId);
      await deleteDoc(PaintingDocRef);

      const updatedPaintings = userData.paintings.filter(id => id !== PaintingId);
      return updateDoc(userDocRef, { Paintings: updatedPaintings });
    } catch (error) {
      console.error('Error deleting Painting:', error);
      throw error;
    }
  }

  // ÖSSZETETT LEKÉRDEZÉSEK valódi Firebase query-kkel
   // Magas prioritású, befejezetlen feladatok
  getPaintingsByPainter(): Observable<Painting[]> {
    return this.authService.currentUser.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        
        return from(this.getUserPaintingIds(user.uid)).pipe(
          switchMap(paintingIds => {
            if (paintingIds.length === 0) {
              return of([]);
            }
            
            const paintingsCollection = collection(this.firestore, this.PAINTINGS_COLLECTION);
            const painterNameQuery = query(
              paintingsCollection,
              orderBy('painter', 'asc')
            );
            
            return from(getDocs(painterNameQuery)).pipe(
              map(querySnapshot => {
                const paintings: Painting[] = [];
                querySnapshot.forEach(doc => {
                  if (paintingIds.includes(doc.id)) {
                    paintings.push({...doc.data(), id: doc.id} as Painting);
                  }
                });
                return paintings;
              })
            );
          })
        );
      })
    );
  }

  getPaintingsByYear(): Observable<Painting[]> {
    return this.authService.currentUser.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        
        return from(this.getUserPaintingIds(user.uid)).pipe(
          switchMap(paintingIds => {
            if (paintingIds.length === 0) {
              return of([]);
            }
            
            const paintingsCollection = collection(this.firestore, this.PAINTINGS_COLLECTION);
            const painterNameQuery = query(
              paintingsCollection,
              orderBy('year', 'desc')
            );
            
            return from(getDocs(painterNameQuery)).pipe(
              map(querySnapshot => {
                const paintings: Painting[] = [];
                querySnapshot.forEach(doc => {
                  if (paintingIds.includes(doc.id)) {
                    paintings.push({...doc.data(), id: doc.id} as Painting);
                  }
                });
                return paintings;
              })
            );
          })
        );
      })
    );
  }

   getPaintingsWherePlaceSzeged(): Observable<Painting[]> {
    return this.authService.currentUser.pipe(
      switchMap(user => {
        if (!user) {
          return of([]);
        }
        
        return from(this.getUserPaintingIds(user.uid)).pipe(
          switchMap(paintingIds => {
            if (paintingIds.length === 0) {
              return of([]);
            }
            
            const paintingsCollection = collection(this.firestore, this.PAINTINGS_COLLECTION);
            const painterNameQuery = query(
              paintingsCollection,
              where('place', '==', 'Szeged'),
              orderBy('year', 'desc')
            );
            
            return from(getDocs(painterNameQuery)).pipe(
              map(querySnapshot => {
                const paintings: Painting[] = [];
                querySnapshot.forEach(doc => {
                  if (paintingIds.includes(doc.id)) {
                    paintings.push({...doc.data(), id: doc.id} as Painting);
                  }
                });
                return paintings;
              })
            );
          })
        );
      })
    );
  }

  private async getUserPaintingIds(userId: string): Promise<string[]> {
    const userDocRef = doc(this.firestore, this.USERS_COLLECTION, userId);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      return [];
    }
    
    const userData = userDoc.data() as MyUser;
    return userData.paintings || [];
  }

}