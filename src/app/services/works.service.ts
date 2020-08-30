import { Injectable } from '@angular/core';
import { Work } from 'src/app/models/work.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable()
export class WorksService {

  works: Work[] = [];
  worksSubject = new Subject<Work[]>();

  constructor() { }

  emitWorks() {
    this.worksSubject.next(this.works);
  }

  saveWorks() {
    firebase.database().ref('/works').set(this.works);
  }
  
  getWorks() {
    firebase.database().ref('/works').on(
      'value', (data) => {
        this.works = data.val() ? data.val() : [];
        this.emitWorks();
      }
    );
  }

  getSingleWork(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/works/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewWork(newWork: Work) {
    this.works.push(newWork);
    this.saveWorks();
    this.emitWorks();
  }

  removeWork(work: Work) {
    if(work.picture) {
      const storageRef = firebase.storage().refFromURL(work.picture);
      storageRef.delete().then(
        () => {
          console.log('Picture deleted');
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      )
    }
    const workIndexToRemove = this.works.findIndex(
      (workEl) => {
        if(JSON.stringify(workEl) === JSON.stringify(work)) {
          return true;
        }
      }
    );
    this.works.splice(workIndexToRemove, 1);
    this.saveWorks();
    this.emitWorks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Loading...');
          },
          (error) => {
            console.log(error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    )
  }
}
