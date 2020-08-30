import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorksService } from 'src/app/services/works.service';
import { Router } from '@angular/router';
import { Work } from 'src/app/models/work.model';

@Component({
  selector: 'app-work-form',
  templateUrl: './work-form.component.html',
  styleUrls: ['./work-form.component.scss']
})
export class WorkFormComponent implements OnInit {

  workForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder,
              private worksService: WorksService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.workForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      year: ['', Validators.required]
    });
  }

  onSaveWork() {
    const title = this.workForm.get('title').value;
    const author = this.workForm.get('author').value;
    const year = this.workForm.get('year').value;
    const newWork = new Work(title, author, year);
    if(this.fileUrl && this.fileUrl !== '') {
      newWork.picture = this.fileUrl;
    }
    this.worksService.createNewWork(newWork);
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
    this.router.navigate(['/works']);
  }

}