import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { combineLatest, Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import {Animal} from "../interfaces/global.interface";


@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private catDataApi = 'https://6511dee4b8c6ce52b395258c.mockapi.io/cats';
  private dogDataApi = 'https://6511dee4b8c6ce52b395258c.mockapi.io/dogs';

  private animalsWithGender$: Observable<Animal[]>;

  constructor(private http: HttpClient) { }

  getAnimalsWithGender(): Observable<Animal[]> {
    if (!this.animalsWithGender$) {
      this.animalsWithGender$ = this.fetchAnimalsWithGender().pipe(shareReplay(1));
    }
    return this.animalsWithGender$;
  }

  getAnimalByIndex(index: number): Observable<Animal | { error: string }> {
    return this.getAnimalsWithGender().pipe(
      map(allAnimals => {
        if (index >= 0 && index < allAnimals.length) {
          return allAnimals[index];
        } else {
          return { error: 'Index out of bounds' };
        }
      }),
      catchError(error => {
        return of({ error: 'Something went wrong; please try again later.' });
      })
    );
  }

  private fetchAnimalsWithGender(): Observable<Animal[]> {
    return combineLatest([
      this.http.get<Animal[]>(this.catDataApi).pipe(catchError(this.handleError)),
      this.http.get<Animal[]>(this.dogDataApi).pipe(catchError(this.handleError))
    ]).pipe(
      map(([cats, dogs]) => {
        const catsWithGender = cats.map(cat => ({
          ...cat,
          type: 'cat',
          gender: this.getRandomGender()
        }));

        const dogsWithGender = dogs.map(dog => ({
          ...dog,
          type: 'dog',
          gender: this.getRandomGender()
        }));

        const allAnimals = [...catsWithGender, ...dogsWithGender];

        for (let i = allAnimals.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [allAnimals[i], allAnimals[j]] = [allAnimals[j], allAnimals[i]];
        }

        return allAnimals;
      })
    );
  }

  private getRandomGender(): string {
    return Math.random() < 0.5 ? 'Male' : 'Female';
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
