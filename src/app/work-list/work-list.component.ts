import { Component, OnInit, OnDestroy } from '@angular/core';
import { Work } from 'src/app/models/work.model';
import { Subscription } from 'rxjs';
import { WorksService } from '../services/works.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.scss']
})
export class WorkListComponent implements OnInit, OnDestroy {

  works: Work[];
  worksSubscription: Subscription;

  constructor(private worksService: WorksService, private router: Router) { }

  ngOnInit() {
    this.worksSubscription = this.worksService.worksSubject.subscribe(
      (works: Work[]) => {
        this.works = works;
      }
    );
    this.worksService.getWorks();
    this.worksService.emitWorks();
  }

  onNewWork() {
    this.router.navigate(['/works', 'new']);
  }

  onDeleteWork(work: Work) {
    this.worksService.removeWork(work);
  }

  onViewWork(id: number) {
    this.router.navigate(['/works', id]);
  }

  ngOnDestroy() {
    this.worksSubscription.unsubscribe();
  }

}