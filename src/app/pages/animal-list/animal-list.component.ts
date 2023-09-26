import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimalService } from "../../services/animal.service";
import { AnimalFilterComponent } from "../../components/animal-filter/animal-filter.component";
import { Router } from "@angular/router";
import {Animal, FilterOptions} from "../../interfaces/global.interface";

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnInit {
  animals: Animal[];
  filteredAnimals: Animal[]; // Add a property for filtered animals
  filterOptions = {
    value: '',
    type: 'all',
    gender: 'all'
  };
  currentPage = 1;
  pageSize = 10;

  @ViewChild(AnimalFilterComponent) filterComponent: AnimalFilterComponent;

  constructor(private router: Router, private animalService: AnimalService) {}

  ngOnInit() {
    this.animalService.getAnimalsWithGender().subscribe(
      (animals) => {
        this.animals = animals;
        this.filterAnimals(); // Apply initial filter
      },
      (error) => {
        console.error('Error fetching animals:', error);
        this.animals = [];
      }
    );
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onFilterApplied(value: FilterOptions) {
    console.log(value)
    this.filterOptions = { ...value };
    this.currentPage = 1;
    this.filterAnimals();
  }

  filterAnimals() {
    this.filteredAnimals = this.animals.filter(animal => {
      const typeCondition = this.filterOptions.type === 'all' || animal.type.toLowerCase() === this.filterOptions.type.toLowerCase();
      const genderCondition = this.filterOptions.gender === 'all' || animal.gender.toLowerCase() === this.filterOptions.gender.toLowerCase();
      const valueCondition = !this.filterOptions.value ||
        animal.name.toLowerCase().includes(this.filterOptions.value.toLowerCase()) ||
        animal.breed.toLowerCase().includes(this.filterOptions.value.toLowerCase());
      return typeCondition && genderCondition && valueCondition;
    });
  }

  get paginatedAnimals() {
    if (this.filteredAnimals) {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredAnimals.slice(startIndex, endIndex);
    } else {
      return [];
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredAnimals.length / this.pageSize);
  }

  goToAnimalDetail(index: number) {
    this.router.navigate(['/animal-detail', index]);
  }

  toggleFilter() {
    this.filterComponent.toggleFilter();
  }
}
