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
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumcastleService extends CrudService<Valoriumcastle> {
	valoriumcastles: Valoriumcastle[] = [];
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

		this.get().subscribe((valoriumcastles: Valoriumcastle[]) => this.valoriumcastles.push(...valoriumcastles));

		_core.on('valoriumcastle_create').subscribe((valoriumcastle: Valoriumcastle) => {
			this.valoriumcastles.push(valoriumcastle);
		});

		_core.on('valoriumcastle_delete').subscribe((valoriumcastle: Valoriumcastle) => {
			this.valoriumcastles.splice(
				this.valoriumcastles.findIndex((o) => o._id === valoriumcastle._id),
				1
			);
		});
	}
}
