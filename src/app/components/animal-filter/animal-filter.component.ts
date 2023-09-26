import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-animal-filter',
  templateUrl: './animal-filter.component.html',
  styleUrls: ['./animal-filter.component.css']
})
export class AnimalFilterComponent {
  @Output() filterApplied = new EventEmitter<any>();
  filterValue: string = '';
  showFilter: boolean = false;
  selectedType: string = 'all';
  selectedGender: string = 'all';
  toggleFilter() {
    this.showFilter = !this.showFilter;
  }
  applyFilter() {
    this.showFilter = false;
    this.filterApplied.emit({value: this.filterValue, type: this.selectedType, gender: this.selectedGender});
    this.filterValue = '';
  }
}
