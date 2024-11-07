import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumunit extends CrudDocument {
	name: string;
	description: string;
	castle: string;
	dungeon: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumunitService extends CrudService<Valoriumunit> {
	valoriumunits: Valoriumunit[] = this.getDocs();

	valoriumunitsByWorld: Record<string, Valoriumunit[]> = {};
	valoriumunitsByDungeon: Record<string, Valoriumunit[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumunit',
			},
			_http,
			_store,
			_alert,
			_core
		);
		this.get();

		this.filteredDocuments(this.valoriumunitsByWorld, 'castle');

		this.filteredDocuments(this.valoriumunitsByDungeon, 'dungeon');
	}
}
