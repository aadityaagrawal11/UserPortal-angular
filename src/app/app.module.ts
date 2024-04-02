import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './register/form.component';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSort } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './guard/auth.guard';
import { AuthService } from './service/auth.service';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular'; // AG Grid Component
import { TestComponent } from './Ag grid Dashboard/test.component';
import { ActionButtonComponent } from './action-button/action-button.component';
import { DashboardTooltipComponent } from './dashboard-tooltip/dashboard-tooltip.component';
import { DatePipe } from '@angular/common';
import { DatecustomComponent } from './datecustom/datecustom.component';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    DashboardComponent,
    TestComponent,
    EditDialogComponent,
    AddUserDialogComponent,
    ConfirmationDialogComponent,
    ActionButtonComponent,
    DashboardTooltipComponent,
    DatecustomComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    NgxMaterialTimepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    MatSort,
    MatTooltipModule,
    HttpClientModule,
    AgGridModule ,
    AgGridAngular,
    
  ],
  providers: [
    DatePipe,
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    AuthGuardService,AuthService
    
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
