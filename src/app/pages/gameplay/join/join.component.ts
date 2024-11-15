import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValoriumgameplayService } from 'src/app/modules/valoriumgameplay/services/valoriumgameplay.service';

@Component({
	templateUrl: './join.component.html',
	styleUrls: ['./join.component.scss'],
})
export class JoinComponent {

	worldId = this._router.url.includes('/worlds/') ? this._router.url.replace('/worlds/', '') : '';
	
	join() {
		this._vgs.create({ world: this.worldId } as Valoriumgameplay).subscribe(()=>{ this._router.navigateByUrl('/village') })
	  }
	  
	  constructor(
		private _router: Router,
		private _vgs: ValoriumgameplayService
	) {}
}
