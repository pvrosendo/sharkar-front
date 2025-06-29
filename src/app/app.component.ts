import { Component } from '@angular/core';
import { LoadingComponent } from './_components/loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'car-front';
}
