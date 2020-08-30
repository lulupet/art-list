import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorksService } from 'src/app/services/works.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Work } from 'src/app/models/work.model';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrls: ['./edit-work.component.scss']
})
export class EditWorkComponent implements OnInit {

  work: Work;
  id: number;
  editWork: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
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
    this.initForm();
  }

  initForm() {
    this.editWork = this.formBuilder.group({
      title: [this.work.title, Validators.required],
      author: [this.work.author, Validators.required],
      year: ['', Validators.required]
    });
  }

  onEditWork(existingTitle: string, existingAuthor: string, existingSummary: string) {
    this.worksService.removeWork(this.work);
    const title = this.editWork.get('title').value || existingTitle;
    const author = this.editWork.get('author').value || existingAuthor;
    const year = this.editWork.get('year').value || existingSummary;
    const editedWork = new Work(title, author, year);
    if(this.fileUrl && this.fileUrl !== '') {
      editedWork.picture = this.fileUrl;
    }
    this.worksService.createNewWork(editedWork);
    this.router.navigate(['/works']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.worksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onBack() {
    this.router.navigate(['/works', this.id]);
  }

}