import {Component, Inject}          from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { MaterialService }          from '@r-material/material.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


}
