import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { ValoriumdungeonService, Valoriumdungeon } from '../../services/valoriumdungeon.service';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { Router } from '@angular/router';
@Component({
	templateUrl: './dungeon.component.html',
	styleUrls: ['./dungeon.component.scss'],
})
export class DungeonComponent {
	world = this._router.url.includes('/dungeon/world/')
	? this._router.url.replace('/dungeon/world/', '')
	: '';
	readonly dungeon = this._router.url.includes('/dungeon/map/')
		? this._router.url.replace('/dungeon/map/', '')
		: '';
	readonly unitId = this._router.url.includes('/castle/') ? this._router.url.replace('/castle/', '') : '';
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('dungeon', {
		formId: 'dungeon',
		title: 'Dungeon',
		components: [
			{
				name: 'Text',
				key: 'name',
				focused: true,
				fields: [
					{
						name: 'Placeholder',
						value: 'fill dungeon title',
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
						value: 'fill dungeon description',
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
			this._form.modal<Valoriumdungeon>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					if(this.dungeon) {
						(created as Valoriumdungeon).map = this.dungeon;
					}
					if (this.world) {
						(created as Valoriumdungeon).world = this.world;
					}
					this._sv.create(created as Valoriumdungeon);
					close();
				},
			});
		},
		update: (doc: Valoriumdungeon) => {
			this._form
				.modal<Valoriumdungeon>(this.form, [], doc)
				.then((updated: Valoriumdungeon) => {
					this._core.copy(updated, doc);
					this._sv.update(doc);
				});
		},
		delete: (doc: Valoriumdungeon) => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this Valoriumdungeon?'
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
				click: (doc: Valoriumdungeon) => {
					this._form.modalUnique<Valoriumdungeon>('dungeon', 'url', doc);
				},
			},
			{
				icon: 'person',
				hrefFunc: (doc: Valoriumdungeon) => {
					return '/unit/dungeon/' + doc._id;
				}
			},
			{
				icon: 'help',
				hrefFunc: (doc: Valoriumdungeon) => {
					return '/quest/dungeon/' + doc._id;
				}
			},
			{
				icon: 'forest',
				hrefFunc: (doc: Valoriumdungeon) => {
					return '/resource/dungeon/' + doc._id;
				}
			}
		],
	};

	/*get rows(): Valoriumdungeon[] {
		return this.world
			? this._sv.valoriumdungeonesByWorld[this.world]
			: this._sv.valoriumdungeones;
	}*/


	get rows(): Valoriumdungeon[] {
        return this.world
		? this._sv.valoriumdungeonesByWorld[this.world]
            : this.dungeon
                ? this._sv.valoriumdungeonesByMap[this.dungeon]
                : this._sv.valoriumdungeones;
    }

	constructor(
		private _sv: ValoriumdungeonService,
		private _translate: TranslateService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {}
}
