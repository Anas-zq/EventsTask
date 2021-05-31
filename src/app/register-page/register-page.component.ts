import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { AngularFirestore, QueryFn } from "@angular/fire/firestore";
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private activateroute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.loginForm = this.fb.group({
      uname: ['', [Validators.required]],
      psw: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }
  CreateForm() {
    this.loginForm = this.fb.group({
      uname: ['', [Validators.required]],
      psw: ['', [Validators.required]],
    });
  }
  resetForm() {
    this.loginForm.reset();
  }
  submitForm(form: any): void {
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    const user = {
      id:  0,
      uname: form.uname,
      psw: form.psw,
    }
    this.createUser(user);
    this.router.navigate(['loginPage']);
  }
  cancel() {
    this.router.navigate(['loginPage']);
  }
  createUser(user: any) {
    return this.firestore.collection('Users').add(user);
  }
}
