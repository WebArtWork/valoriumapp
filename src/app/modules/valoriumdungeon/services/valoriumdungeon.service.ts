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
	world: string;
	unit:string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumdungeonService extends CrudService<Valoriumdungeon> {
	valoriumdungeones: Valoriumdungeon[] = this.getDocs();

	valoriumdungeonesByWorld: Record<string, Valoriumdungeon[]> = {};
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

		
		this.get();

		this.filteredDocuments(this.valoriumdungeonesByWorld, 'world');
	}
}
