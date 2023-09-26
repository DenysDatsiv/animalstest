import {Component, ViewEncapsulation} from '@angular/core';
import {NotificationService} from "./services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class AppComponent {
  constructor(private notificationService: NotificationService) { }

  showAlert() {
    this.notificationService.showNotification('This is a global notification!');
  }
}
