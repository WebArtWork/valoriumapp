import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { GameplayComponent } from './gameplay.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: GameplayComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		GameplayComponent
	],
	providers: []

})

export class GameplayModule { }
