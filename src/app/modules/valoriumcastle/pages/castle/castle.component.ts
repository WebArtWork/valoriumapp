import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumcastleService, Valoriumcastle } from '../../services/valoriumcastle.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './castle.component.html',
	styleUrls: ['./castle.component.scss'],
})
export class CastleComponent {
	world = this._router.url.includes('/castle/world/')
		? this._router.url.replace('/castle/world/', '')
		: '';

	readonly unitId = this._router.url.includes('/castle/') ? this._router.url.replace('/castle/', '') : '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('castle', {
		formId: 'castle',
		title: 'Castle',
		components: [	
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill castle title',
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
						value: 'fill castle description',
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
			this._form.modal<Valoriumcastle>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if(this.world) {
						(created as Valoriumcastle).world = this.world;
					}

					if (this.unitId) {
						(created as Valoriumcastle).unit = this.unitId;
					}
					this._sv.create(created as Valoriumcastle);
					close();
				},
			});
		},
		update: (doc: Valoriumcastle) => {
			this._form
				.modal<Valoriumcastle>(this.form, [], doc)
				.then((updated: Valoriumcastle) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumcastle) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumcastle?'
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
				click: (doc: Valoriumcastle) => {
					this._form.modalUnique<Valoriumcastle>('castle', 'url', doc);
				},
			},
			{
				icon: 'account_balance',
				hrefFunc: (doc: Valoriumcastle) => {
					return '/building/castle/' + doc._id;
				}
			},
			{
				icon: 'person',
				hrefFunc: (doc: Valoriumcastle) => {
					return '/unit/castle/' + doc._id;
				}
			},
			{
				icon: 'forest',
				hrefFunc: (doc: Valoriumcastle) => {
					return '/resource/castle/' + doc._id;
				}
			},
			{
				icon: 'help',
				hrefFunc: (doc: Valoriumcastle) => {
					return '/quest/castle/' + doc._id;
				}
			},
			{
				icon: 'swap_horizontal_circle',
				hrefFunc: (doc: Valoriumcastle) => {
					return '/trade/castle/' + doc._id;
				}
			}
		],
	};

	/*get rows(): Valoriumcastle[] {
		return this._sv.valoriumcastles;
	}*/

	get rows(): Valoriumcastle[] {
		return this.world
			? this._sv.valoriumcastleByWorld[this.world]
			: this._sv.valoriumcastles;
	}

	constructor(
		private _sv: ValoriumcastleService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
