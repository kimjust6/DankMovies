import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent implements OnInit {

  public actionText: string;
  public cancelText: string;
  public titleText: string;
  public messageText: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {
      movie: any,
      actionText: string,
      cancelText: string,
      titleText: string,
      messageText: string,
    },
  ) {
    this.data.actionText === '' ? this.actionText = 'OK': this.actionText = this.data.actionText;
    this.data.cancelText === '' ? this.cancelText = 'Cancel': this.cancelText = this.data.cancelText;
    this.data.titleText === '' ? this.titleText = 'Default Title': this.titleText = this.data.titleText;
    this.data.messageText === '' ? this.messageText = 'Default Message': this.messageText = this.data.messageText;
  }

  ngOnInit(): void {

  }

}
