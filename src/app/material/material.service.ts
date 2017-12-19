import { Injectable, Inject, Component }  from '@angular/core';
import { Observable }                     from 'rxjs/Observable';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar }                    from '@angular/material';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

import { DialogComponent }                from './dialog/dialog.component';

@Injectable()
export class MaterialService {

  constructor(
    private matSnackBar:        MatSnackBar,
    private matDialog:          MatDialog
  ) { }



  // SNACKBAR ----------------------------------------------------
  /**
   * Open message
   * @param message
   * @param action
   */
  public snackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    const snackBarRef = this.matSnackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'left'
    });

    return snackBarRef;
  }

  /**
   * Show snackbar and console
   * @param message string
   * @param error any
   */
  public error(message: string, error: any) {
    console.log(message, error);
    this.snackBar(`${message}. Detalhes no console (F12).`, 'OK');
  }




  // DIALOG ------------------------------------------------------
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




  // DATATABLE ----------------------------------------------------
  /**
   * List all branch selection of this menu
   */
  public querySelection(
    selectedList:   Array<any>,
    selection:      SelectionModel<any>,
    dataSourceCopy: MatTableDataSource<any>,
    pivot?:         Array<string>,
    key:            string = 'id') {
    for (const s of selectedList) {
      const selected = dataSourceCopy.data.find(item => item[key] === s[key]);
      if (pivot) {
        pivot.forEach(p => selected[p] = s[p]);
      }
      selection.select(selected);
    }
  }

  /**
   * Apply filter when key up
   */
  public applyFilter(dataSource: MatTableDataSource<any>, dataSourceCopy: MatTableDataSource<any>, filter: any) {
    dataSource.data = dataSourceCopy.data.filter(item => this.filterList(item, filter));
  }

  /**
   * Whether the number of selected elements matches
   * the total number of rows.
   */
  public isAllSelected(dataSourceCopy: MatTableDataSource<any>, selection: SelectionModel<any>) {
    const numSelected = selection.selected.length;
    const numRows     = dataSourceCopy.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected;
   * otherwise clear selection.
   */
  public masterToggle(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    this.isAllSelected(dataSource, selection) ?
        selection.clear() :
        dataSource.data.forEach(row => selection.select(row));
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




  // OTHERS ---------------------------------------------------
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
}
