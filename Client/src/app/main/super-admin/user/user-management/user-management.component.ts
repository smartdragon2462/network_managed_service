import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'app/service/user.service';
import { User } from 'app/model/user';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserManagementComponent implements OnInit {

  filterBy: string;
  deleteDisalble = true;
  selectedUserId = [];
  users: User[];
  filterUsers: User[];
  standard: User[];
  pro: User[];
  agency: User[];
  reseller: User[];
  standardCount: any;
  proCount: any;
  agencyCount: any;
  resellerCount: any;
  checkboxes: {};
  displayedColumns = ['checkbox', 'name', 'email', 'role', 'createdAt', 'buttons'];
  constructor(
      private userService: UserService
  ) { }

  ngOnInit() {
      this.userService.getAllUsers()
        .subscribe(res => {
            this.filterUsers = this.users = res;
            if (this.users.length > 0) {
                this.filterBy = 'all';
            }
            this.standard = this.users.filter(s => s.role == 'standard');
            this.pro = this.users.filter(s => s.role == 'pro');
            this.agency = this.users.filter(s => s.role == 'agency');
            this.reseller = this.users.filter(s => s.role == 'reseller');
            this.standardCount = this.standard.length;
            this.proCount = this.pro.length;
            this.agencyCount = this.agency.length;
            this.resellerCount = this.reseller.length;
        })
  }

  onCheckboxChangeFn($event, userId) {
      if ($event.checked == true) {
          this.selectedUserId.push(userId)
      } else {
          const index: number = this.selectedUserId.indexOf(userId);
          if (index !== -1) {
              this.selectedUserId.splice(index, 1);
          }
      }
      if (this.selectedUserId.length > 0) {
          this.deleteDisalble = false;
      } else {
          this.deleteDisalble = true;
      }
  }

  changeFilter($filter) {
      if ($filter == 'all') {
          this.filterUsers = this.users;
          this.filterBy = 'all';
      } else if ($filter == 'standard') {
          this.filterUsers = this.standard;
          this.filterBy = 'standard';
      } else if ($filter == 'pro') {
          this.filterUsers = this.pro;
          this.filterBy = 'pro';  
      } else if ($filter == 'agency') {
          this.filterUsers = this.agency;
          this.filterBy = 'agency';
      } else if ($filter == 'reseller') {
          this.filterUsers = this.reseller;
          this.filterBy = 'reseller';
      }
  }

}
