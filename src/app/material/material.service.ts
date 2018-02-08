import { Injectable, Inject, Component }  from '@angular/core';
import { Observable }                     from 'rxjs/Observable';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar }                          from '@angular/material';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { SelectionModel}                  from '@angular/cdk/collections';

import { DialogComponent }                from '@r-material/dialog/dialog.component';

@Injectable()
export class MaterialService {
// SNACKBAR ---------------------------
  /**
   * Open message
   * @param {string} message
   * @param {string} action
   * @returns {MatSnackBarRef<SimpleSnackBar>}
   * @memberof MaterialService
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
   * @param {string} message
   * @param {*} error
   * @memberof MaterialService
   */
  public error(message: string, error: any) {
    console.log(message, error);
    this.snackBar(`${message}. Detalhes no console (F12).`, 'OK');
  }




// DIALOG -----------------------------
  /**
   * Open dialog to confirm
   * @param {*} item
   * @param {string} title
   * @param {string} text
   * @param {string} falseButton
   * @param {string} trueButton
   * @returns {Observable<any>}
   * @memberof MaterialService
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




// DATATABLE --------------------------
  /**
   * List all items selection of this resource
   * @param {Array<any>} selectedList
   * @param {SelectionModel<any>} selection
   * @param {MatTableDataSource<any>} dataSourceCopy
   * @param {Array<string>} [pivot]
   * @param {string} [key='id']
   * @memberof MaterialService
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
   * @param {MatTableDataSource<any>} dataSource
   * @param {MatTableDataSource<any>} dataSourceCopy
   * @param {*} filter
   * @memberof MaterialService
   */
  public applyFilter(dataSource: MatTableDataSource<any>, dataSourceCopy: MatTableDataSource<any>, filter: any) {
    dataSource.data = dataSourceCopy.data.filter(item => this.filterList(item, filter));
  }

  /**
   * Whether the number of selected elements matches
   * the total number of rows.
   * @param {MatTableDataSource<any>} dataSourceCopy
   * @param {SelectionModel<any>} selection
   * @returns {boolean}
   * @memberof MaterialService
   */
  public isAllSelected(dataSourceCopy: MatTableDataSource<any>, selection: SelectionModel<any>) {
    const numSelected: number = selection.selected.length;
    const numRows:     number = dataSourceCopy.data.length;
    return numSelected === numRows;
  }

  /**
   * Selects all rows if they are not all selected;
   * otherwise clear selection.
   * @param {MatTableDataSource<any>} dataSource
   * @param {SelectionModel<any>} selection
   * @memberof MaterialService
   */
  public masterToggle(dataSource: MatTableDataSource<any>, selection: SelectionModel<any>) {
    this.isAllSelected(dataSource, selection) ?
        selection.clear() :
        dataSource.data.forEach(row => selection.select(row));
  }

  /**
   * Filter a list property by property
   * @param {*} item
   * @param {*} filter
   * @returns {boolean} match
   * @memberof MaterialService
   */
  public filterList(item: any, filter: any) {

    for (const tag in item) { // Verify property by property
      if (filter[tag]) {      // Verify undefined
        if (item[tag].data) {
          if (item[tag].data.constructor === Array) {
            return item[tag].data.filter(i => this.filterList(i, filter[tag]));
          }
        }
        if (!item[tag].toString().trim().toLowerCase().includes(filter[tag].toString().trim().toLowerCase())) {
          return false;
        }
      }
    }
    return true;
  }


  // public filterList(item: any, filter: any) {
  //   for (const tag in item) { // Verify property by property
  //     if (filter[tag]) {      // Verify undefined
  //       if (!item[tag].toString().trim().toLowerCase().includes(filter[tag].toString().trim().toLowerCase())) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // }


// OTHERS -----------------------------
  /**
   * Convert object to Query String
   * @param {*} filter
   * @returns {string} querystring search
   * @memberof MaterialService
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
   * Creates an instance of MaterialService.
   * @param {MatSnackBar} matSnackBar
   * @param {MatDialog} matDialog
   * @memberof MaterialService
   */
  constructor(
    private matSnackBar:        MatSnackBar,
    private matDialog:          MatDialog
  ) { }
}
