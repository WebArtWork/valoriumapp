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
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumtradeService extends CrudService<Valoriumtrade> {
	valoriumtrades: Valoriumtrade[] = [];
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

		this.get().subscribe((valoriumtrades: Valoriumtrade[]) => this.valoriumtrades.push(...valoriumtrades));

		_core.on('valoriumtrade_create').subscribe((valoriumtrade: Valoriumtrade) => {
			this.valoriumtrades.push(valoriumtrade);
		});

		_core.on('valoriumtrade_delete').subscribe((valoriumtrade: Valoriumtrade) => {
			this.valoriumtrades.splice(
				this.valoriumtrades.findIndex((o) => o._id === valoriumtrade._id),
				1
			);
		});
	}
}