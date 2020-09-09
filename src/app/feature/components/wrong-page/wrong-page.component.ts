import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-wrong-page',
  templateUrl: './wrong-page.component.html',
  styleUrls: ['./wrong-page.component.scss']
})
export class WrongPageComponent implements OnInit {

  constructor(private location: Location) { }
  backClicked() {
    this.location.back();
  }
  ngOnInit(): void {
  }

}
