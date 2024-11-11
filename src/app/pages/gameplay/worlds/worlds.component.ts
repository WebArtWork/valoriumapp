import { Component } from '@angular/core';
import { ValoriumworldService, Valoriumworld } from 'src/app/modules/valoriumworld/services/valoriumworld.service';

@Component({
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.scss'],
})
export class WorldsComponent {
  // Прив'язуємо масив світу з сервісу до компонента
  constructor(private _sv: ValoriumworldService) {}

  // Отримуємо всі світи з сервісу
  get worlds(): Valoriumworld[] {
    return this._sv.valoriumworlds;
  }
}
