import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { DungeonComponent } from './dungeon.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: DungeonComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		DungeonComponent
	],
	providers: []

})

export class DungeonModule { }
