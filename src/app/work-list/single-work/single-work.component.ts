import { Component, OnInit } from '@angular/core';
import { Work } from 'src/app/models/work.model';
import { ActivatedRoute, Router } from '@angular/router';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-single-work',
  templateUrl: './single-work.component.html',
  styleUrls: ['./single-work.component.scss']
})
export class SingleWorkComponent implements OnInit {

  work: Work;
  id: number;

  constructor(private route: ActivatedRoute,
              private worksService: WorksService,
              private router: Router) { }

  ngOnInit() {
    this.work = new Work('', '', '');
    const id = this.route.snapshot.params['id'];
    this.id = id;
    this.worksService.getSingleWork(+id).then(
      (work: Work) => {
        this.work = work;
      }
    );
  }

  onEditWork(id: number) {
    this.router.navigate(['/works', 'edit', id]);
  }

  onBack() {
    this.router.navigate(['/works']);
  }

}
