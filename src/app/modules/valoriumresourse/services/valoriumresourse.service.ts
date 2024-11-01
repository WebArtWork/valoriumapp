import { Injectable } from '@angular/core';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService,
	CrudDocument,
} from 'wacom';

export interface Valoriumresourse extends CrudDocument {
	name: string;
	description: string;
}

@Injectable({
	providedIn: 'root',
})
export class ValoriumresourseService extends CrudService<Valoriumresourse> {
	valoriumresourses: Valoriumresourse[] = [];
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'valoriumresourse',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get().subscribe((valoriumresourses: Valoriumresourse[]) => this.valoriumresourses.push(...valoriumresourses));

		_core.on('valoriumresourse_create').subscribe((valoriumresourse: Valoriumresourse) => {
			this.valoriumresourses.push(valoriumresourse);
		});

		_core.on('valoriumresourse_delete').subscribe((valoriumresourse: Valoriumresourse) => {
			this.valoriumresourses.splice(
				this.valoriumresourses.findIndex((o) => o._id === valoriumresourse._id),
				1
			);
		});
	}
}
