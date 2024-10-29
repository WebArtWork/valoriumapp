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
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumvillageService extends CrudService<Valoriumvillage> {
	valoriumvillages: Valoriumvillage[] = [];
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

		this.get().subscribe((valoriumvillages: Valoriumvillage[]) => this.valoriumvillages.push(...valoriumvillages));

		_core.on('valoriumvillage_create').subscribe((valoriumvillage: Valoriumvillage) => {
			this.valoriumvillages.push(valoriumvillage);
		});

		_core.on('valoriumvillage_delete').subscribe((valoriumvillage: Valoriumvillage) => {
			this.valoriumvillages.splice(
				this.valoriumvillages.findIndex((o) => o._id === valoriumvillage._id),
				1
			);
		});
	}
}
