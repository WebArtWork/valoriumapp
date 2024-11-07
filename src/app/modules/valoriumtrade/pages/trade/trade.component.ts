import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumtradeService, Valoriumtrade } from '../../services/valoriumtrade.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './trade.component.html',
	styleUrls: ['./trade.component.scss'],
})
export class TradeComponent {
	castle = this._router.url.includes('/trade/castle/')
	? this._router.url.replace('/trade/castle/', '')
	: '';
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('trade', {
		formId: 'trade',
		title: 'Trade',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill trade title',
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
						value: 'fill trade description',
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
			this._form.modal<Valoriumtrade>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if(this.castle){
						(created as Valoriumtrade).castle = this.castle;
					}
					this._sv.create(created as Valoriumtrade);
					close();
				},
			});
		},
		update: (doc: Valoriumtrade) => {
			this._form
				.modal<Valoriumtrade>(this.form, [], doc)
				.then((updated: Valoriumtrade) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumtrade) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumtrade?'
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
				click: (doc: Valoriumtrade) => {
					this._form.modalUnique<Valoriumtrade>('trade', 'url', doc);
				},
			},
		],
	};

	get rows(): Valoriumtrade[] {
		return this.castle
			? this._sv.valoriumtradesByWorld[this.castle]
			: this._sv.valoriumtrades;
	}

	constructor(
		private _sv: ValoriumtradeService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
