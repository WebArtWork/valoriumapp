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
	world: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriummapService extends CrudService<Valoriummap> {
	valoriummaps: Valoriummap[] = this.getDocs();

	valoriummapsByWorld: Record<string, Valoriummap[]> = {};

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

		this.get();

		this.filteredDocuments(this.valoriummapsByWorld, 'world');
	}
}
