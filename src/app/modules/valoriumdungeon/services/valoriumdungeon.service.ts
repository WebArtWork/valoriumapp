import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumdungeon extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumdungeonService extends CrudService<Valoriumdungeon> {
	valoriumdungeons: Valoriumdungeon[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumdungeon',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((valoriumdungeons: Valoriumdungeon[]) => this.valoriumdungeons.push(...valoriumdungeons));

		_core.on('valoriumdungeon_create').subscribe((valoriumdungeon: Valoriumdungeon) => {
			this.valoriumdungeons.push(valoriumdungeon);
		});

		_core.on('valoriumdungeon_delete').subscribe((valoriumdungeon: Valoriumdungeon) => {
			this.valoriumdungeons.splice(
				this.valoriumdungeons.findIndex((o) => o._id === valoriumdungeon._id),
				1
			);
		});
	}
}
