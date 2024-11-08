import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumcastle extends CrudDocument {
	name: string;
	description: string;
	world: string;
	unit: string;
	map: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumcastleService extends CrudService<Valoriumcastle> {
	valoriumcastles: Valoriumcastle[] = this.getDocs();

	valoriumcastleByWorld: Record<string, Valoriumcastle[]> = {};
	valoriumcastleByMap: Record<string, Valoriumcastle[]> = {};
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumcastle',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.valoriumcastleByWorld, 'world');
		this.filteredDocuments(this.valoriumcastleByMap, 'map');
	}
}
