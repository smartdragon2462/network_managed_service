import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  position = 'bottom-right';


  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private toastr: ToastrService,
  ) {
    this.init();
  }

  ngOnInit() {

  }

  init() {
    this.userForm = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  submit() {
    this._userService.createUser(this.userForm.value)
      .subscribe(res => {
        this.loading = false;
        if (res.id) {
          this.init();
        }
      })
  }


}
