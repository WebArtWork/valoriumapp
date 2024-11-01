import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriummessageService, Valoriummessage } from '../../services/valoriummessage.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './message.component.html',
	styleUrls: ['./message.component.scss'],
})
export class MessageComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('message', {
		formId: 'message',
		title: 'Message',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill message title',
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
						value: 'fill message description',
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
			this._form.modal<Valoriummessage>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._sv.create(created as Valoriummessage);
					close();
				},
			});
		},
		update: (doc: Valoriummessage) => {
			this._form
				.modal<Valoriummessage>(this.form, [], doc)
				.then((updated: Valoriummessage) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriummessage) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriummessage?'
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
				click: (doc: Valoriummessage) => {
					this._form.modalUnique<Valoriummessage>('message', 'url', doc);
				},
			},
		],
	};

	get rows(): Valoriummessage[] {
		return this._sv.valoriummessages;
	}

	constructor(
		private _sv: ValoriummessageService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
