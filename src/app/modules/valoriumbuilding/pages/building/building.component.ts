import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumbuildingService, Valoriumbuilding } from '../../services/valoriumbuilding.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './building.component.html',
	styleUrls: ['./building.component.scss'],
})
export class BuildingComponent {
	castle = this._router.url.includes('/building/castle/')
	? this._router.url.replace('/building/castle/', '')
	: '';
	village = this._router.url.includes('/building/village/')
	? this._router.url.replace('/building/village/', '')
	: '';
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('building', {
		formId: 'building',
		title: 'Building',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill building title',
					},
					{
						name: 'Label',
						value: 'Title',
					},
				],
			},
			{
				name: 'Text',
				key: 'description',
				fields: [
					{
						name: 'Placeholder',
						value: 'fill building description',
					},
					{
						name: 'Label',
						value: 'Description',
					},
				],
			},
		],
	});

	config = {
		create: () => {
			this._form.modal<Valoriumbuilding>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.castle) {
						(created as Valoriumbuilding).castle = this.castle;
					}
					if (this.village) {
						(created as Valoriumbuilding).village = this.village;
					}
					this._sv.create(created as Valoriumbuilding);
					close();
				},
			});
		},
		update: (doc: Valoriumbuilding) => {
			this._form
				.modal<Valoriumbuilding>(this.form, [], doc)
				.then((updated: Valoriumbuilding) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumbuilding) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumbuilding?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No'),
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: () => {
							this._sv.delete(doc);
						},
					},
				],
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Valoriumbuilding) => {
					this._form.modalUnique<Valoriumbuilding>('building', 'url', doc);
				},
			},
			{
				icon: 'forest',
				hrefFunc: (doc: Valoriumbuilding) => {
					return '/resource/building/' + doc._id;
				}
			},
			{
				icon: 'person',
				hrefFunc: (doc: Valoriumbuilding) => {
					return '/unit/building/' + doc._id;
				}
			}
		],
	};

	get rows(): Valoriumbuilding[] {
		return this.castle
			? this._sv.valoriumbuildingsByWorld[this.castle]
			: this.village
			? this._sv.valoriumbuildingsByVillage[this.village]
			: this._sv.valoriumbuildings;
	}

	constructor(
		private _sv: ValoriumbuildingService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
