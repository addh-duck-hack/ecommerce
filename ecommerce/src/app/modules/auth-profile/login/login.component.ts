import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  ngOnInit(): void {
    // console.log(this.authService.user);
    if (this.authService.user) {
      this.router.navigate(['/']);
    }
  }
  login() {
    if (!this.email) {
    alert("ES NECESARIO INGRESAR EL EMAIL");
    }
    if (!this.password) {
    alert("ES NECESARIO INGRESAR UN PASSWORD");
    }
    this.authService.login(this.email, this.password).subscribe((resp:any) => {
      console.log(resp);
      if (!resp.error && resp ) {
        // EL USUARIO INGRESO CON EXITO
        this.router.navigate(['/']);
      }else {
        // EL USUARIO NO INGRESO CON EXITO
        alert(resp.error.message);
      }
    })
  }
}
