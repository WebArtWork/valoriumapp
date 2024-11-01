import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriummessage extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriummessageService extends CrudService<Valoriummessage> {
	valoriummessages: Valoriummessage[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriummessage',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((valoriummessages: Valoriummessage[]) => this.valoriummessages.push(...valoriummessages));

		_core.on('valoriummessage_create').subscribe((valoriummessage: Valoriummessage) => {
			this.valoriummessages.push(valoriummessage);
		});

		_core.on('valoriummessage_delete').subscribe((valoriummessage: Valoriummessage) => {
			this.valoriummessages.splice(
				this.valoriummessages.findIndex((o) => o._id === valoriummessage._id),
				1
			);
		});
	}
}
