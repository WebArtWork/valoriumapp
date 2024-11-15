import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumvillageService, Valoriumvillage } from '../../services/valoriumvillage.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './village.component.html',
	styleUrls: ['./village.component.scss'],
})
export class VillageComponent {
	world = this._router.url.includes('/village/world/')
	? this._router.url.replace('/village/world/', '')
	: '';
	readonly map = this._router.url.includes('/village/map/')
		? this._router.url.replace('/village/map/', '')
		: '';
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('village', {
		formId: 'village',
		title: 'Village',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill village title',
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
						value: 'fill village description',
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
			this._form.modal<Valoriumvillage>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if(this.map) {
						(created as Valoriumvillage).map = this.map;
					}
					if (this.world) {
						(created as Valoriumvillage).world = this.world;
					}
					this._sv.create(created as Valoriumvillage);
					close();
				},
			});
		},
		update: (doc: Valoriumvillage) => {
			this._form
				.modal<Valoriumvillage>(this.form, [], doc)
				.then((updated: Valoriumvillage) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumvillage) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumvillage?'
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
				click: (doc: Valoriumvillage) => {
					this._form.modalUnique<Valoriumvillage>('village', 'url', doc);
				},
			},
			{
				icon: 'account_balance',
				hrefFunc: (doc: Valoriumvillage) => {
					return '/building/village/' + doc._id;
				}
			},
			{
				icon: 'person',
				hrefFunc: (doc: Valoriumvillage) => {
					return '/unit/village/' + doc._id;
				}
			},
			{
				icon: 'forest',
				hrefFunc: (doc: Valoriumvillage) => {
					return '/resource/village/' + doc._id;
				}
			}
		],
	};

	/*get rows(): Valoriumvillage[] {
		return this.world
			? this._sv.valoriumvillagesByWorld[this.world]
			: this._sv.valoriumvillages;
	}*/

	get rows(): Valoriumvillage[] {
        return this.world
		? this._sv.valoriumvillagesByWorld[this.world]
            : this.map
                ? this._sv.valoriumvillagesByMap[this.map]
                : this._sv.valoriumvillages;
    }

	constructor(
		private _sv: ValoriumvillageService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
