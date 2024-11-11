import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import {
	ValoriummapService,
	Valoriummap
} from '../../services/valoriummap.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent {
	world = this._router.url.includes('/map/world/')
		? this._router.url.replace('/map/world/', '')
		: '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('map', {
		formId: 'map',
		title: 'Map',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill map title'
					},
					{
						name: 'Label',
						value: 'Title'
					}
				]
			},
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill map description'
					},
					{
						name: 'Label',
						value: 'Description'
					}
				]
			}
		]
	});

	config = {
		create: () => {
			this._form.modal<Valoriummap>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.world) {
						(created as Valoriummap).world = this.world;
					}

					this._sv.create(created as Valoriummap);

					close();
				}
			});
		},
		update: (doc: Valoriummap) => {
			this._form
				.modal<Valoriummap>(this.form, [], doc)
				.then((updated: Valoriummap) => {
					this._core.copy(updated, doc);

					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriummap) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriummap?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._sv.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Valoriummap) => {
					this._form.modalUnique<Valoriummap>('map', 'url', doc);
				}
			},
			{
				icon: 'castle',
				hrefFunc: (doc: Valoriummap) => {
					return '/castle/map/' + doc._id;
				}
			},
			{
				icon: 'landscape',
				hrefFunc: (doc: Valoriummap) => {
					return '/dungeon/map/' + doc._id;
				}
			}
		]
	};

	get rows(): Valoriummap[] {
		return this.world
			? this._sv.valoriummapsByWorld[this.world]
			: this._sv.valoriummaps;
	}

	constructor(
		private _sv: ValoriummapService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
