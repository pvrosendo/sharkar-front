import {Component, OnInit} from '@angular/core';
import {CarService} from '../../_services/car.service';
import {Car} from '../../_models/car';


@Component({
  selector: 'app-view-cars',
  standalone: false,
  templateUrl: './view-cars.component.html',
  styleUrl: './view-cars.component.css'
})
export class ViewCarsComponent implements OnInit {

  cars: any[] = [];
  expensiveCar: Car | null = null;
  carToUpdate: {id: Number, car: Car} | null = null;

  constructor(private carService: CarService) {}

  ngOnInit() { this.loadCars(); }

  loadCars(){
    this.carService.getAllCars().subscribe((data: any) => {
      this.cars = data;
    });
  }
  refreshCars() { this.loadCars(); }

  openExpensiveCarModal(car: Car) { this.expensiveCar = car; }

  closeModal() { this.expensiveCar = null; }

  openUpdateModal(data: {id: Number, car: Car}) {
    console.log('Abrindo modal de atualização', data);
    // Crie uma cópia do objeto para evitar referências compartilhadas
    this.carToUpdate = {
      id: data.id,
      car: {...data.car}
    };
  }
  
  closeUpdateModal() {
    this.carToUpdate = null;
    this.refreshCars(); // Atualiza a lista após editar
  }

}
