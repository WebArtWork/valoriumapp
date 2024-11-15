import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumquestService, Valoriumquest } from '../../services/valoriumquest.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';

@Component({
	templateUrl: './quest.component.html',
	styleUrls: ['./quest.component.scss'],
})
export class QuestComponent {
	castle = this._router.url.includes('/quest/castle/')
		? this._router.url.replace('/quest/castle/', '')
		: '';
		readonly castleId = this._router.url.includes('/quest/castle/') ? this._router.url.replace('/quest/castle/', '') : '';
		readonly dungeonId = this._router.url.includes('/quest/dungeon/') ? this._router.url.replace('/quest/dungeon/', '') : '';
		readonly village = this._router.url.includes('/quest/village/') ? this._router.url.replace('/quest/village/', '') : '';
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
					if (this.castleId) {
						(created as Valoriumquest).castle = this.castleId;
					}
					if (this.dungeonId) {
						(created as Valoriumquest).dungeon = this.dungeonId;
					}
					if(this.castle){
						(created as Valoriumquest).castle = this.castle;
					}
					if(this.village){
						(created as Valoriumquest).village = this.village;
					}
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
			{
				icon: 'person',
				hrefFunc: (doc: Valoriumquest) => {
					return '/unit/quest/' + doc._id;
				}
			},
			{
				icon: 'forest',
				hrefFunc: (doc: Valoriumquest) => {
					return '/resource/quest/' + doc._id;
				}
			}
		],
	};

	get rows(): Valoriumquest[] {
        return this.castleId
            ? this._sv.valoriumquestsByWorld[this.castleId]
            : this.dungeonId
                ? this._sv.valoriumquestsByDungeon[this.dungeonId]
			: this.village
			? this._sv.valoriumquestsByVillage[this.village]
                : this._sv.valoriumquests;
    }

	constructor(
		private _sv: ValoriumquestService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
