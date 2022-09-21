import { Component, OnInit } from '@angular/core';
import {ShareDataService} from '../ShareDataService'
@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.scss']
})
export class FlightFormComponent implements OnInit {

  instance:any = null;
  constructor(private service: ShareDataService) { 
   
  }

  ngOnInit(): void {
    this.service.content.subscribe(data =>{
      this.instance = data;
    })
  }



}
