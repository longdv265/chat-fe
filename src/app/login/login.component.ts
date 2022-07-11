import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserServiceService
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    // if (this.userService.currentUserValue) {
    //   this.router.navigate(['/chat']);
    // }
  }

  submit() {
    this.loading = true;
    if (this.formLogin?.valid) {
      let data = {
        email: this.formLogin.value.email,
        password: this.formLogin.value.password
      }

      this.userService.login(data).subscribe(res => {
        this.router.navigate(['/chat']);
      }, error => {
        this.loading = false;
      })
    }
  }

}
