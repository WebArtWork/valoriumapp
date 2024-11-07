import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumtrade extends CrudDocument {
	name: string;
	description: string;
	castle: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumtradeService extends CrudService<Valoriumtrade> {
	valoriumtrades: Valoriumtrade[] = this.getDocs();

	valoriumtradesByWorld:Record<string, Valoriumtrade[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumtrade',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();
		this.filteredDocuments(this.valoriumtradesByWorld, 'castle')

	}
}
