import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Animal} from "../../interfaces/global.interface";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() animal: Animal;
  @Input() index: number;
  @Input() type: string;
  @Output() moreClicked = new EventEmitter<number>();

  constructor() {}

  onMoreClick() {
    this.moreClicked.emit(this.index);
  }
}
