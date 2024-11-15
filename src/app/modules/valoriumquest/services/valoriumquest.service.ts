import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumquest extends CrudDocument {
	name: string;
	description: string;
	castle: string;
	dungeon: string;
	village: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumquestService extends CrudService<Valoriumquest> {
	valoriumquests: Valoriumquest[] = this.getDocs();

	valoriumquestsByWorld: Record<string, Valoriumquest[]> = {};
	valoriumquestsByDungeon: Record<string, Valoriumquest[]> = {};
	valoriumquestsByVillage: Record<string, Valoriumquest[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumquest',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();
		this.filteredDocuments(this.valoriumquestsByWorld, 'castle');
		this.filteredDocuments(this.valoriumquestsByDungeon, 'dungeon');
		this.filteredDocuments(this.valoriumquestsByVillage, 'village');
	}
}
