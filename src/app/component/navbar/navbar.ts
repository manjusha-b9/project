import { Component, inject, OnInit} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar  implements OnInit {

userName = '';
  isLoggedIn = false;
  private router=inject(Router);

  ngOnInit(): void {
    this.checkLogin();
  }
  
  checkLogin(): void {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('userName');
if (userId && name) {
      this.isLoggedIn = true;
      this.userName = name;
    } else {
      this.isLoggedIn = false;
      this.userName = '';
    }
  }
  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('name');

    this.isLoggedIn = false;
    this.userName = '';

    alert('Logged out successfully.');

    this.router.navigate(['/login']);
  }
}
