import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../core/header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private header: HeaderService) { }

  ngOnInit() {
    this.header.setHeaderTitle({default: true});
  }

}
