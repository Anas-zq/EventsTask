import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { AngularFirestore, QueryFn } from "@angular/fire/firestore";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  users:any[]=[];
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
    this.firestore.collection('Users').snapshotChanges().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          uname : e.payload.doc.get("uname"),
          psw : e.payload.doc.get("psw"),
        } 
      });

    });
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
    var exists =this.users.filter(e => e.uname === form.uname && e.psw === form.psw );
    if(exists.length > 0)
    this.router.navigate(['eventPage']);
  }
  register(){
    this.router.navigate(['registerPage']);
  }
}
