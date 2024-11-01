import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumquestService, Valoriumquest } from '../../services/valoriumquest.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './quest.component.html',
	styleUrls: ['./quest.component.scss'],
})
export class QuestComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('quest', {
		formId: 'quest',
		title: 'Quest',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill quest title',
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
						value: 'fill quest description',
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
			this._form.modal<Valoriumquest>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._sv.create(created as Valoriumquest);
					close();
				},
			});
		},
		update: (doc: Valoriumquest) => {
			this._form
				.modal<Valoriumquest>(this.form, [], doc)
				.then((updated: Valoriumquest) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumquest) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumquest?'
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
				click: (doc: Valoriumquest) => {
					this._form.modalUnique<Valoriumquest>('quest', 'url', doc);
				},
			},
		],
	};

	get rows(): Valoriumquest[] {
		return this._sv.valoriumquests;
	}

	constructor(
		private _sv: ValoriumquestService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
