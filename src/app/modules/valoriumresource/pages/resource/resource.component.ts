import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumresourceService, Valoriumresource } from '../../services/valoriumresource.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { Router } from '@angular/router';

@Component({
	templateUrl: './resource.component.html',
	styleUrls: ['./resource.component.scss'],
})
export class ResourceComponent {
	castle = this._router.url.includes('/resource/castle/')
	? this._router.url.replace('/resource/castle/', '')
	: '';
	readonly castleId = this._router.url.includes('/resource/castle/') ? this._router.url.replace('/resource/castle/', '') : '';
	readonly dungeonId = this._router.url.includes('/resource/dungeon/') ? this._router.url.replace('/resource/dungeon/', '') : '';
	readonly building = this._router.url.includes('/resource/building/') ? this._router.url.replace('/resource/building/', '') : '';
	readonly quest = this._router.url.includes('/resource/quest/') ? this._router.url.replace('/resource/quest/', '') : '';
	readonly trade = this._router.url.includes('/resource/trade/') ? this._router.url.replace('/resource/trade/', '') : '';
	readonly village = this._router.url.includes('/resource/village/') ? this._router.url.replace('/resource/village/', '') : '';
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('resource', {
		formId: 'resource',
		title: 'Resource',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill resource title',
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
						value: 'fill resource description',
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
			this._form.modal<Valoriumresource>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if (this.castleId) {
						(created as Valoriumresource).castle = this.castleId;
					}
					if (this.quest) {
						(created as Valoriumresource).quest = this.quest;
					}
					if (this.village) {
						(created as Valoriumresource).village = this.village;
					}
					if (this.trade) {
						(created as Valoriumresource).trade = this.trade;
					}
					if (this.building) {
						(created as Valoriumresource).building = this.building;
					}
					if (this.dungeonId) {
						(created as Valoriumresource).dungeon = this.dungeonId;
					}
					this._sv.create(created as Valoriumresource);
					close();
				},
			});
		},
		update: (doc: Valoriumresource) => {
			this._form
				.modal<Valoriumresource>(this.form, [], doc)
				.then((updated: Valoriumresource) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumresource) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumresource?'
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
				click: (doc: Valoriumresource) => {
					this._form.modalUnique<Valoriumresource>('resource', 'url', doc);
				},
			},
		],
	};

	get rows(): Valoriumresource[] {
        return this.castleId
            ? this._sv.valoriumresourcesByWorld[this.castleId]
            : this.dungeonId
            ? this._sv.valoriumresourcesByDungeon[this.dungeonId]
			: this.building
			? this._sv.valoriumresourcesByBuilding[this.building]
			: this.quest
			? this._sv.valoriumresourcesByQuest[this.quest]
			: this.trade
			? this._sv.valoriumresourcesByTrade[this.trade]
			: this.village
			? this._sv.valoriumresourcesByVillage[this.village]
                : this._sv.valoriumresources;
    }

	constructor(
		private _sv: ValoriumresourceService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
