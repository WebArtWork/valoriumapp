import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumresourseService, Valoriumresourse } from '../../services/valoriumresourse.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';

@Component({
	templateUrl: './resourse.component.html',
	styleUrls: ['./resourse.component.scss'],
})
export class ResourseComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('resourse', {
		formId: 'resourse',
		title: 'Resourse',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill resourse title',
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
						value: 'fill resourse description',
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
			this._form.modal<Valoriumresourse>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._sv.create(created as Valoriumresourse);
					close();
				},
			});
		},
		update: (doc: Valoriumresourse) => {
			this._form
				.modal<Valoriumresourse>(this.form, [], doc)
				.then((updated: Valoriumresourse) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumresourse) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumresourse?'
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
				click: (doc: Valoriumresourse) => {
					this._form.modalUnique<Valoriumresourse>('resourse', 'url', doc);
				},
			},
		],
	};

	get rows(): Valoriumresourse[] {
		return this._sv.valoriumresourses;
	}

	constructor(
		private _sv: ValoriumresourseService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}
}
