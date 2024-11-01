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
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumquestService extends CrudService<Valoriumquest> {
	valoriumquests: Valoriumquest[] = [];
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

		this.get().subscribe((valoriumquests: Valoriumquest[]) => this.valoriumquests.push(...valoriumquests));

		_core.on('valoriumquest_create').subscribe((valoriumquest: Valoriumquest) => {
			this.valoriumquests.push(valoriumquest);
		});

		_core.on('valoriumquest_delete').subscribe((valoriumquest: Valoriumquest) => {
			this.valoriumquests.splice(
				this.valoriumquests.findIndex((o) => o._id === valoriumquest._id),
				1
			);
		});
	}
}
