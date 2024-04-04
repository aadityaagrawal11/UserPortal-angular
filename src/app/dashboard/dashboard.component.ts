import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserdataService } from '../userdata.service';

import { forkJoin, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { ColDef } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  displayedColumns: string[] = ['check', 'firstname', 'lastname', 'email', 'password', 'picker', 'action'];
  dataSource: any;
  registerUserArr: any = [];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private _userService: UserdataService,
    private _authService: AuthService,
    private http:HttpClient,
    private toastr: ToastrService,
    private editDialog: MatDialog,
    private addDialog: MatDialog,
    private deleteDialog: MatDialog) { }


  ngOnInit(): void {
    this.getUserList();
  
  }

  logout() {
    this._authService.logout();
  }

  getUserList() {

    this._userService.getAllRegisterUser().subscribe({
      next: res => {
        this.registerUserArr = res;
        this.dataSource = new MatTableDataSource(this.registerUserArr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: console.log
    })
  }

  Filterchange(data: Event) {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;
  }


  editpopup(userData: any) {

    const editref = this.editDialog.open(EditDialogComponent, {
      width: '25%',
      data: userData
    });
    editref.afterClosed().subscribe({
      next: (val) => {
        if (val) this.getUserList();
      }

    })
  }

  addpopup() {
    const addref = this.addDialog.open(AddUserDialogComponent, {
      width: '25%'

    });
    addref.afterClosed().subscribe({
      next: (val) => {
        if (val) this.getUserList();
      }
    })
  }

  deletepopup(userData: any) {
    const deleteref = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '39%',
      data: {
        data:userData,
        hide:false
      }
    });
    deleteref.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.deleteSelectedUsers();
          this.getUserList();
      }}

    })
  }

  selectedUserIds: number[] = [];

  toggleSelection(userId: number) {
    const index = this.selectedUserIds.indexOf(userId);
    if (index === -1) {
      this.selectedUserIds.push(userId);
    } else {
      this.selectedUserIds.splice(index, 1);
    }
    console.log(this.selectedUserIds);
  }
  //users: any = [];
  toggleAllSelection(event: any) {
    console.log(event.checked)
    if (event.checked) {
      this.selectedUserIds = this.registerUserArr.map((userr: { id: any; }) => userr.id);
    } else {
      this.selectedUserIds = [];
    }
    console.log(this.selectedUserIds);

  }

  isSelected(userId: number): boolean {
    return this.selectedUserIds.includes(userId);
  }


  deleteSelectedUsers() {
    const deleteRequests = this.selectedUserIds.map(ele => this._userService.deleteUser(ele));
    forkJoin(deleteRequests).subscribe(
      res => {
        this.getUserList();
      });
    this.toastr.success(" User deleted successfully !! ", 'Delete Message!');
    this.selectedUserIds = [];
    
  }

  deleteButton(userData: any) {
    console.log(userData);
    const deleteref = this.deleteDialog.open(ConfirmationDialogComponent, {
      width: '39%',
      data: {
        data: userData,
        hide:false
      }
    });
    deleteref.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          const row = userData.id;
          const title = userData.firstname;
          this._userService.deleteUser(row).subscribe({
      next: res => {
              this.toastr.success(title+" Deleted Successfully !! ", 'Delete Message!');
              this.getUserList();
      },
      error:console.error
            
        })}
    
      }
    })
  }



}