import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
import {ShareDataService} from '../ShareDataService'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  defaultAirport:any={name:"Select Airport", code:""};
  destinationSelection:any={};
  originSelection:any={};
  departureDate = new Date().toISOString().slice(0, 10);
  minDate = new Date().toISOString().slice(0, 10);
  adults=0;
  childrens=0;
  infants=0;
  airports:any[]=[];
  conn : any[] = [];
  constructor(private http: HttpClient, private service: ShareDataService) {
    this.destinationSelection = this.defaultAirport;
    this.originSelection = this.defaultAirport;
   }

  ngOnInit(): void {
 
const headers= new HttpHeaders()
  .set('Tenant-Identifier', '9d7d6eeb25cd6083e0df323a0fff258e59398a702fac09131275b6b1911e202d');
    
    this.http.get('https://api-uat-ezycommerce.ezyflight.se/api/v1/Airport/OriginsWithConnections/en-us',{ 'headers': headers }).subscribe(data => {
      var abc = JSON.stringify(data);
      var list = JSON.parse(abc).airports;
     
    if(list != null)
    {
      for(let i=0;i < list.length; i++)
      {
        this.conn = [];
        this.conn = list[i].connections;
        for(let j=0;j < this.conn.length; j++)
        {
          if(this.conn[j].name!="")
          {
          this.airports.push(this.conn[j]);
          }
        }
      }
   
      this.airports.unshift(this.defaultAirport)
    }
  }) 

  }

  displayData(){
    if(this.originSelection == this.destinationSelection)
    {
      alert('Origin and Destination airport should not be same');
     
    }
    else
    {
      var data = {
        originSelection: this.originSelection,
        destinationSelection: this.destinationSelection,
        departureDate: this.departureDate,
        //arrivalDate: this.arrivalDate,
        travelers: {
          adults: this.adults,
          childrens: this.childrens,
          infants: this.infants
        }
      }
      this.service.setDisplayData(data);
    }
  }

}
