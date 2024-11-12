import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumgameplayService, Valoriumgameplay } from '../../services/valoriumgameplay.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './gameplay.component.html',
	styleUrls: ['./gameplay.component.scss'],
})
export class GameplayComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('gameplay', {
		formId: 'gameplay',
		title: 'Gameplay',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill gameplay title',
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
						value: 'fill gameplay description',
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
			this._form.modal<Valoriumgameplay>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._sv.create(created as Valoriumgameplay);
					close();
				},
			});
		},
		update: (doc: Valoriumgameplay) => {
			this._form
				.modal<Valoriumgameplay>(this.form, [], doc)
				.then((updated: Valoriumgameplay) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumgameplay) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumgameplay?'
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
				click: (doc: Valoriumgameplay) => {
					this._form.modalUnique<Valoriumgameplay>('gameplay', 'url', doc);
				},
			},
		],
	};

	get rows(): Valoriumgameplay[] {
		return this._sv.valoriumgameplays;
	}

	constructor(
		private _sv: ValoriumgameplayService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
