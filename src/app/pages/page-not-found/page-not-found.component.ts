import {Router} from '@angular/router';
import {Component} from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor(private router: Router) {
  }

  redirectToMainPage() {
    this.router.navigate(['/']);
  }
}
