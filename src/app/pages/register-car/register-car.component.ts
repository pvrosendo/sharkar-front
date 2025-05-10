import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../_services/car.service';
import { FipeBrandModels } from '../../_models/brand';
import { FipeCarModels } from '../../_models/fipeCar';
import { FipeYearModels } from '../../_models/year';
import { FipeInfoModel } from '../../_models/car';
import { CarFipeService } from '../../_services/carFipe.service';

@Component({
  selector: 'app-register-car',
  standalone: false,
  templateUrl: './register-car.component.html',
  styleUrl: './register-car.component.css'
})
export class RegisterCarComponent implements OnInit{
  
  @Input() brand: FipeBrandModels = {brandId: 0, brandName: ''};
  @Input() model: FipeCarModels = {brandId: 0, modelId: 0, modelName: ''};
  @Input() year: FipeYearModels = {modelId: 0, modelName: '', yearId: '', yearValue: ''};
  @Input() car: FipeInfoModel = {model: '',brand: '', year: '', fuel: '', price: '', referenceMonth: ''};

  brands: any = [];
  models: any = [];
  years: any = [];
  fipeInfoModel: any = {model: '', brand: '', year: '', fuel: '', price: '', referenceMonth: ''};

  carForm: any = new FormGroup({});
  carImageUrl: string = '';

  constructor(
    private fb: FormBuilder, 
    private carService: CarService, 
    private carFipeService: CarFipeService
  ) { }

  ngOnInit(): void {
    this.loadBrands();
    this.initializeForm();
    this.updateCarImage();
  }

  initializeForm(): void {
    this.carForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      price: [{value: '', disabled: false}],
      fuel: [{value: '', disabled: false}],
      referenceMonth: [{value: '', disabled: false}],
    })
  }

  loadBrands(): void {
    this.carFipeService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response;
      },
      error: (error) => {
        console.error('Error loading brands', error);
      }
    })
  }

  loadModels(brandId: Number): void {
    this.carFipeService.getAllModelsByBrand(brandId).subscribe({
      next: (response) => {
        this.models = response;
      },
      error: (error) => {
        console.error('Error loading brands', error);
      }
    })
  }

  loadYears(brandId: Number, modelId: Number): void {
    this.carFipeService.getAllYearsByBrandAndModel(brandId, modelId).subscribe({
      next: (response) => {
        this.years = response;
      },
      error: (error) => {
        console.error('Error loading brands', error);
      }
    })
  }

  loadInfoFipe(brandId: Number, modelId: Number, yearId: String): void {
    this.carFipeService.getAllInfoCarByBrandModelAndYear(brandId, modelId, yearId).subscribe(
      (data: any) => {
        if (data && data.price && data.fuel && data.referenceMonth) {
          this.carForm.get('price')?.setValue(data.price);
          this.carForm.get('fuel')?.setValue(data.fuel);
          this.carForm.get('referenceMonth')?.setValue(data.referenceMonth);
          
          this.carForm.get('price')?.disable();
          this.carForm.get('fuel')?.disable();
          this.carForm.get('referenceMonth')?.disable();
        }
      },
      (error) => {
        console.error('Erro ao carregar informações da FIPE:', error);
        this.carForm.get('price')?.setValue('Preço não disponível');
      }
    );
  }

  onBrandChange() {
    const brandId = this.carForm.get('brand')?.value;
    
    if (brandId) {
      this.loadModels(brandId);
      
      this.carForm.get('model')?.setValue('');
    } else {
      this.models = [];
      this.carForm.get('model')?.setValue('');
    }
    this.updateCarImage();
  }

  onModelChange() {
    const modelId = this.carForm.get('model')?.value;
    
    if (modelId) {
      const brandId = this.carForm.get('brand')?.value;
      this.loadYears(brandId, modelId);
      
      this.carForm.get('year')?.setValue(0);
    } else {
      this.years = [];
      this.carForm.get('year')?.setValue(0);
    }
    this.updateCarImage();
  }

  onYearChange() {
    const brandId = this.carForm.get('brand')?.value;
    const modelId = this.carForm.get('model')?.value;
    const yearId = this.carForm.get('year')?.value;
    
    if (brandId && modelId && yearId) {
      this.loadInfoFipe(brandId, modelId, yearId);
    } else {
      this.car = {model: '', brand: '', year: '', fuel: '', price: '', referenceMonth: ''};
    }
    this.updateCarImage();
  }

  private updateCarImage() {
    const brand = this.carForm.get('brand')?.value;
    const model = this.carForm.get('model')?.value;
    const year = this.carForm.get('year')?.value;

    if (brand && model && year) {
      // TODO: implements search image
      this.carImageUrl = '';
      
      // this.carService.getCarImage(brand, model, year).subscribe(
      //   (imageUrl) => {
      //     this.carImageUrl = imageUrl;
      //   },
      //   (error) => {
      //     console.error('Erro ao buscar imagem:', error);
      //     this.carImageUrl = '/assets/images/default-car.jpg';
      //   }
      // );
    } else {
      this.carImageUrl = '/assets/images/default-car.jpg';
    }
  }

  SubmitForm(): void {

    if (this.carForm.valid) {
      const formValues = this.carForm.getRawValue();
      
      this.carService.addCar(formValues).subscribe(
        (response) => {
          console.log('Carro registrado com sucesso:', response);
          this.carForm.reset();
        },
        (error) => {
          console.error('Erro ao registrar carro:', error);
        }
      );
    }
  }

}
