import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumvillage extends CrudDocument {
	name: string;
	description: string;
	world: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumvillageService extends CrudService<Valoriumvillage> {
	valoriumvillages: Valoriumvillage[] = this.getDocs();

	valoriumvillagesByWorld: Record<string, Valoriumvillage[]> = {};
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumvillage',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.valoriumvillagesByWorld, 'world');
	}
}
