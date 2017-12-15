import { Injectable, Inject, Component }  from '@angular/core';
import { Observable }                     from 'rxjs/Observable';
import { MatSnackBar }                    from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent }                from './dialog/dialog.component';

@Injectable()
export class MaterialService {

  constructor(
    private matSnackBar:        MatSnackBar,
    private matDialog:          MatDialog
  ) { }

  /**
   * Open message
   * @param message
   * @param action
   */
  public snackBar(message: string, action: string): void {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'left'
    });
  }

  public error(message: string, error: any) {
    console.log(message, error);
    this.snackBar(`${message}. Detalhes no console (F12).`, 'OK');
  }

  /**
   * Open dialog to confirm
   * @param Any item
   * @param string title
   * @param string text
   * @param string falseButton
   * @param string trueButton
   */
  public openDialog(item: any, title: string, text: string, falseButton: string, trueButton: string): Observable<any> {
    const dialogRef = this.matDialog.open(DialogComponent, {
      data: {
        item:         item,
        title:        title,
        text:         text,
        falseButton:  falseButton,
        trueButton:   trueButton
      }
    });

    return dialogRef.afterClosed();
  }

  /**
   * Convert object to Query String
   * @param any filter
   */
  public searchToQueryString(filter: any): string {
    let search  = '';

    for (const key in filter) {
      if (filter[key] && filter[key].toString().trim().length > 0) {
        search = search + key + ':' + filter[key] + ';';
      }
    }
    search = search.substr(0, search.length - 1);

    return search;
  }

  /**
   * Filter a list property by property
   * @param item any
   * @param filter any
   * @returns boolean
   */
  public filterList(item: any, filter: any) {
    for (const tag in item) { // Verify property by property
      if (filter[tag]) {      // Verify undefined
        if (!item[tag].toString().trim().toLowerCase().includes(filter[tag].toString().trim().toLowerCase())) {
          return false;
        }
      }
    }
    return true;
  }
}
