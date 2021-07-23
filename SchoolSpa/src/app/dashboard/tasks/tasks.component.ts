import { Component, OnInit } from '@angular/core';
import { CreateComponent } from './create/create.component';
import { DisplayComponent } from './display/display.component';
import { UpdateComponent } from './update/update.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    // columns of mat table
    displayedColumns : string[] = ['ID','Name','Code','Actions'];
    dataSource : any;
    companies : any;
    company: any = {};
    model : any ={}; 
  
    // Pagination Attributes
    pageNumber = 1 ;
    pageSize = 10 ;
    totalItems = 0;
  
    // Sorting and filtering params
    companyParams : any = {};
  
    @ViewChild(MatPaginator) paginator : MatPaginator;
  
    @Output() onPageSwitch = new EventEmitter();
  
    loading$ = this._loadingService.loading$;
  
  constructor( private _loadingService : LoadingService,private _companyService : CompanyService, 
      private dialog : MatDialog, 
      public _authService : AuthService,
      private _notificationService : NotificationService,
      private _snackBar : MatSnackBar,
      private _userService : UserService,
      ) { }
  
    // On init cycle hook
    ngOnInit() {
      this.getCompanies();
    }
  
    // Progress Bar (state)
    loader : boolean = false;
  
    // The columns that we want to display
    showColumns: {
      Actions : boolean;
      Name : boolean;
      Code : boolean;
    } = {
      Name : true,
      Code : true,
      Actions : true,
    };
  
    // Setting page
    setPage($event){
      this.pageNumber = ($event.pageIndex + 1 );
      this.getCompanies();
    }
  
    // Filtering
    setFilters(searchBy : string){
      this.companyParams.searchBy = searchBy;
      this.getCompanies();
    }
  
    // Getting companies by their page
    getCompanies(){
      this.loader = true ; 
      this._companyService.getCompanies(this.pageNumber, this.pageSize, this.companyParams).subscribe((data) => {
        this.companies = data.result;
        this.dataSource = new MatTableDataSource<Company>(this.companies);
        this.totalItems = data.pagination.totalItems;
        this.loader = false ; 
    });
    }
    
    // Opening Create Company Dialog
    openCreateDialog(){
      
  
      this._authService.userHasPrivilege("CREATE_COMPANY").subscribe((data) => {
        if (data) {
          const dialogRef = this.dialog.open(CreateComponent);
          dialogRef.afterClosed().subscribe(result => {
            this.getCompanies();
          });
        }
        else {
          // Unauthorized access
          this._snackBar.open("You Are unauthorized", "hide", {
            duration: 2000,
          });
        }
      })
    }
  
    // Reset Sorting
    resetSorting(orderBy : string){
      this.companyParams.orderBy = orderBy;
      this.companyParams.reverseOrder = this.companyParams.reverseOrder == "y" ? this.companyParams.reverseOrder = "n" : this.companyParams.reverseOrder = "y";
      this.getCompanies();
    }
  
    
  
    // Delete
    delete(id:number, i: number){
      
  
      this._authService.userHasPrivilege("DELETE_COMPANY").subscribe((data) => {
        if (data) {
          this._companyService.deleteCompanyById(id).subscribe((data)=> {
            this.getCompanies();
            // Notification Snack bar
            this._snackBar.open("Item deleted","hide",{
              duration : 2000,
            });
            // Creating notification
            let notification = {
              action : "delete",
              actionOn : "Company",
              description : "Deleted Company with id : "+id,
              status : "none",
              userID : this._authService.decodedToken.nameid
            }
            this._notificationService.createNotification(notification).subscribe();
          });
        }
        else {
          // Unauthorized access
          this._snackBar.open("You Are unauthorized", "hide", {
            duration: 2000,
          });
        }
      })
    }
  
    // Open edit dialog
    edit(editid:number){
      
  
      this._authService.userHasPrivilege("UPDATE_COMPANY").subscribe((data) => {
        if (data) {
          const dialogRef = this.dialog.open(UpdateComponent, {
            data : {id : editid},
          });
          dialogRef.afterClosed().subscribe((result) => {
            if(result){
              this.getCompanies();
            }
          });
        }
        else {
          // Unauthorized access
          this._snackBar.open("You Are unauthorized", "hide", {
            duration: 2000,
          });
        }
      })
    }
  
  
    // Show
    show(showid:number){
      this._authService.userHasPrivilege("DISPLAY_COMPANY").subscribe((data) => {
        if (data) {
          this.dialog.open(DisplayComponent, {
            data : {id : showid},
          });
        }
        else {
          // Unauthorized access
          this._snackBar.open("You Are unauthorized", "hide", {
            duration: 2000,
          });
        }
      })
    }

}
