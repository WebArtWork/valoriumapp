import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriummap extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriummapService extends CrudService<Valoriummap> {
	valoriummaps: Valoriummap[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriummap',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((valoriummaps: Valoriummap[]) => this.valoriummaps.push(...valoriummaps));

		_core.on('valoriummap_create').subscribe((valoriummap: Valoriummap) => {
			this.valoriummaps.push(valoriummap);
		});

		_core.on('valoriummap_delete').subscribe((valoriummap: Valoriummap) => {
			this.valoriummaps.splice(
				this.valoriummaps.findIndex((o) => o._id === valoriummap._id),
				1
			);
		});
	}
}
