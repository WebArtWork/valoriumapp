import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Valoriumgameplay, ValoriumgameplayService } from 'src/app/modules/valoriumgameplay/services/valoriumgameplay.service';

@Component({
	templateUrl: './join.component.html',
	styleUrls: ['./join.component.scss'],
})
export class JoinComponent {

	worldId = this._router.url.includes('/gameplay/join/') ? this._router.url.replace('/gameplay/join/', '') : '';

	join() {
		this._vgs.create({ world: this.worldId } as Valoriumgameplay).subscribe(() => { this._router.navigateByUrl('/gameplay/village') });
		//
		// 
	}

	constructor(
		private _router: Router,
		private _vgs: ValoriumgameplayService
	) { }
}
