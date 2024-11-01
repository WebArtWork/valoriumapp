import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumworldService, Valoriumworld } from '../../services/valoriumworld.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './worlds.component.html',
	styleUrls: ['./worlds.component.scss'],
})
export class WorldsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('worlds', {
		formId: 'worlds',
		title: 'Worlds',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill worlds title',
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
						value: 'fill worlds description',
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
			this._form.modal<Valoriumworld>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {	
					this._sv.create(created as Valoriumworld);
					close();
				},
			});
		},
		update: (doc: Valoriumworld) => {
			this._form
				.modal<Valoriumworld>(this.form, [], doc)
				.then((updated: Valoriumworld) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumworld) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumworld?'
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
				click: (doc: Valoriumworld) => {
					this._form.modalUnique<Valoriumworld>('worlds', 'url', doc);
				},
			},
			{
				icon: 'map',
				hrefFunc: (doc: Valoriumworld) => {
					return '/map/world/' + doc._id;
				},
			},
			{
				icon: 'castle',
				hrefFunc: (doc: Valoriumworld) => {
					return '/castle/world/' + doc._id;
				}
			},
			{
				icon: 'holiday_village',
				hrefFunc: (doc: Valoriumworld) => {
					return '/village/world/' + doc._id;
				}
			},
			{
				icon: 'landscape',
				hrefFunc: (doc: Valoriumworld) => {
					return '/dungeon/world/' + doc._id;
				}
			}
		],
	};

	get rows(): Valoriumworld[] {
		return this._sv.valoriumworlds;
	}

	constructor(
		private _sv: ValoriumworldService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
