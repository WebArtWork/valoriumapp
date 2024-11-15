import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumgameplay extends CrudDocument {
	name: string;
	description: string;
	world: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumgameplayService extends CrudService<Valoriumgameplay> {
	valoriumgameplays: Valoriumgameplay[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumgameplay',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((valoriumgameplays: Valoriumgameplay[]) => this.valoriumgameplays.push(...valoriumgameplays));

		_core.on('valoriumgameplay_create').subscribe((valoriumgameplay: Valoriumgameplay) => {
			this.valoriumgameplays.push(valoriumgameplay);
		});

		_core.on('valoriumgameplay_delete').subscribe((valoriumgameplay: Valoriumgameplay) => {
			this.valoriumgameplays.splice(
				this.valoriumgameplays.findIndex((o) => o._id === valoriumgameplay._id),
				1
			);
		});
	}
}
