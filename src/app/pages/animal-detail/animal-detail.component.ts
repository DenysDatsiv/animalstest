import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimalService} from "../../services/animal.service";
import {NotificationService} from "../../services/notification.service";
import {Animal} from "../../interfaces/global.interface";

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal;
  animalAdopted = false;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private router: Router,
    private notificationService : NotificationService,
  ) {
  }

  ngOnInit() {
    const index = +this.route.snapshot.params['index'];

    this.animalService.getAnimalByIndex(index).subscribe(
      (animal) => {
        this.animal = animal as Animal;
      },
      (error) => {
        console.error('Error fetching animal details:', error);
      }
    );
  }


  goBack() {
    this.router.navigate(['/']);
  }
  adoptAnimal() {
    this.animalAdopted = true;
    this.notificationService.showNotification(`You successfully adopted ${this.animal.type}, his name is ${this.animal.name}`);
  }

}






