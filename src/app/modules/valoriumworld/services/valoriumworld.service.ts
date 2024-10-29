import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumworld extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumworldService extends CrudService<Valoriumworld> {
	valoriumworlds: Valoriumworld[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumworld',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((valoriumworlds: Valoriumworld[]) => this.valoriumworlds.push(...valoriumworlds));

		_core.on('valoriumworld_create').subscribe((valoriumworld: Valoriumworld) => {
			this.valoriumworlds.push(valoriumworld);
		});

		_core.on('valoriumworld_delete').subscribe((valoriumworld: Valoriumworld) => {
			this.valoriumworlds.splice(
				this.valoriumworlds.findIndex((o) => o._id === valoriumworld._id),
				1
			);
		});
	}
}
