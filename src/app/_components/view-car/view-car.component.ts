import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-car',
  standalone: false,
  templateUrl: './view-car.component.html',
  styleUrl: './view-car.component.css'
})
export class ViewCarComponent implements OnInit{

  carName: String | null = '';

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getCarName();
  }

  getCarName(){
    this.route.queryParams.subscribe((params)=>{
      this.carName = params['carName'];
    })
  }
}
