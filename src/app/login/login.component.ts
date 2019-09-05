import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  angForm: FormGroup;
  public username2: string;

  @Output() delete: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder, private auth: AuthenticationService) {
    this.createForm();
    this.username2 = 'there';
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  ngOnInit() {
  }

  deleteMe() {
    this.delete.emit('Cancelled');
    history.state.data = {};
  }
  async authenticate() {
    await this.auth.authenticate(this.angForm.value.username, this.angForm.value.password);
  }
  async newAccount() {
    await this.auth.newAccount(this.angForm.value.username,  this.angForm.value.password);
  }
}
