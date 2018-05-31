import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectComponent implements OnInit {

  // 标题
  title: string;
  coverImages = [];
  form: FormGroup;

  constructor(
    @Inject(MD_DIALOG_DATA) private data,
    private dialogRef: MdDialogRef<NewProjectComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    if (this.data.project) {
      this.form = this.fb.group({
        name:     [this.data.project.name, Validators.required],
        desc:     [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = '修改项目';
    } else {
      this.form = this.fb.group({
        name:     ['', Validators.required],
        desc:     [],
        coverImg: [this.data.img]
      });
      this.title = '创建项目';
    }
  }

  // 保存
  onSubmit({value, valid}, ev: Event): void {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

}
