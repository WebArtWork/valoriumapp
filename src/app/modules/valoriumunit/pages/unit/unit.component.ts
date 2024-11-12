import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumunitService, Valoriumunit } from '../../services/valoriumunit.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './unit.component.html',
	styleUrls: ['./unit.component.scss'],
})
export class UnitComponent {
	castle = this._router.url.includes('/unit/castle/')
	? this._router.url.replace('/unit/castle/', '')
	: '';
	readonly castleId = this._router.url.includes('/unit/castle/') ? this._router.url.replace('/unit/castle/', '') : '';
	readonly dungeonId = this._router.url.includes('/unit/dungeon/') ? this._router.url.replace('/unit/dungeon/', '') : '';
	readonly building = this._router.url.includes('/unit/building/') ? this._router.url.replace('/unit/building/', '') : '';
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('unit', {
		formId: 'unit',
		title: 'Unit',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill unit title',
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
						value: 'fill unit description',
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
			this._form.modal<Valoriumunit>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.castle) {
						(created as Valoriumunit).castle = this.castle;
					}
					if (this.building) {
						(created as Valoriumunit).building = this.building;
					}
					if (this.castleId) {
						(created as Valoriumunit).castle = this.castleId;
					}
					if (this.dungeonId) {
						(created as Valoriumunit).dungeon = this.dungeonId;
					}
					this._sv.create(created as Valoriumunit);
					close();
				},
			});
		},
		update: (doc: Valoriumunit) => {
			this._form
				.modal<Valoriumunit>(this.form, [], doc)
				.then((updated: Valoriumunit) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumunit) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumunit?'
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
				click: (doc: Valoriumunit) => {
					this._form.modalUnique<Valoriumunit>('unit', 'url', doc);
				},
			},
		],
	};

	get rows(): Valoriumunit[] {
        return this.castleId
            ? this._sv.valoriumunitsByWorld[this.castleId]
            : this.dungeonId
                ? this._sv.valoriumunitsByDungeon[this.dungeonId]
				: this.building
				? this._sv.valoriumunitsByBuilding[this.building]
                : this._sv.valoriumunits;
    }

	constructor(
		private _sv: ValoriumunitService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
