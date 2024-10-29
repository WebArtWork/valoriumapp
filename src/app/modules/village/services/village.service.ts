import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Village extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class VillageService extends CrudService<Village> {
	villages: Village[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'village',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((villages: Village[]) => this.villages.push(...villages));

		_core.on('village_create').subscribe((village: Village) => {
			this.villages.push(village);
		});

		_core.on('village_delete').subscribe((village: Village) => {
			this.villages.splice(
				this.villages.findIndex((o) => o._id === village._id),
				1
			);
		});
	}
}
