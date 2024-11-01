import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { CastleComponent } from './castle.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: CastleComponent
},{
	path:'world/:castle_id',
	component: CastleComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		CastleComponent
	],
	providers: []

})

export class CastleModule { }
