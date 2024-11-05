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
	castle:string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumbuildingService extends CrudService<Valoriumbuilding> {
	valoriumbuildings: Valoriumbuilding[] = this.getDocs();
	valoriumbuildingsByWorld: Record<string, Valoriumbuilding[]> = {};

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

		this.get();

		this.filteredDocuments(this.valoriumbuildingsByWorld, 'castle');

	}
}
