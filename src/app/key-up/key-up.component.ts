import { Component, Output, EventEmitter, OnInit } from '@angular/core';


@Component({
  selector: 'app-key-up3',
  template: `
    <input #box (keyup.enter)="onKey(box.value)">
    <p>{{value}}</p>
  `
})
export class KeyUpComponent implements OnInit {
  value = '';
  @Output() action = new EventEmitter();

  constructor() {}

  onKey(event: KeyboardEvent) { // without type info
    this.value = ( event.target as HTMLInputElement).value ;
    this.action.emit(this.value);
  }
  onEscape(event: KeyboardEvent) {
    this.value = ( event.target as HTMLInputElement).value ;
    this.action.emit(this.value);
  }
  ngOnInit() {
  }
}

