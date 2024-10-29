import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { VillageService, Village } from '../../services/village.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './village.component.html',
	styleUrls: ['./village.component.scss'],
})
export class VillageComponent {
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
			this._form.modal<Village>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._sv.create(created as Village);
					close();
				},
			});
		},
		update: (doc: Village) => {
			this._form
				.modal<Village>(this.form, [], doc)
				.then((updated: Village) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Village) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Village?'
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
				click: (doc: Village) => {
					this._form.modalUnique<Village>('village', 'url', doc);
				},
			},
		],
	};

	get rows(): Village[] {
		return this._sv.villages;
	}

	constructor(
		private _sv: VillageService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
