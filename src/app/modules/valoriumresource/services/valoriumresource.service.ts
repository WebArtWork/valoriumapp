import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumresource extends CrudDocument {
	name: string;
	description: string;
	castle: string;
	dungeon: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumresourceService extends CrudService<Valoriumresource> {
	valoriumresources: Valoriumresource[] = this.getDocs();
	
	valoriumresourcesByWorld: Record<string, Valoriumresource[]> = {};
	valoriumresourcesByDungeon: Record<string, Valoriumresource[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumresource',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.valoriumresourcesByWorld, 'castle');
		this.filteredDocuments(this.valoriumresourcesByDungeon, 'dungeon');
	}
}
