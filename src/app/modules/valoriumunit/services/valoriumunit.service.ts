import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumunit extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumunitService extends CrudService<Valoriumunit> {
	valoriumunits: Valoriumunit[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumunit',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((valoriumunits: Valoriumunit[]) => this.valoriumunits.push(...valoriumunits));

		_core.on('valoriumunit_create').subscribe((valoriumunit: Valoriumunit) => {
			this.valoriumunits.push(valoriumunit);
		});

		_core.on('valoriumunit_delete').subscribe((valoriumunit: Valoriumunit) => {
			this.valoriumunits.splice(
				this.valoriumunits.findIndex((o) => o._id === valoriumunit._id),
				1
			);
		});
	}
}
