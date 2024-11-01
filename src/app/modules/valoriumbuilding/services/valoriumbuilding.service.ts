import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumbuilding extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumbuildingService extends CrudService<Valoriumbuilding> {
	valoriumbuildings: Valoriumbuilding[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumbuilding',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((valoriumbuildings: Valoriumbuilding[]) => this.valoriumbuildings.push(...valoriumbuildings));

		_core.on('valoriumbuilding_create').subscribe((valoriumbuilding: Valoriumbuilding) => {
			this.valoriumbuildings.push(valoriumbuilding);
		});

		_core.on('valoriumbuilding_delete').subscribe((valoriumbuilding: Valoriumbuilding) => {
			this.valoriumbuildings.splice(
				this.valoriumbuildings.findIndex((o) => o._id === valoriumbuilding._id),
				1
			);
		});
	}
}
