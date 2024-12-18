import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { BuildingComponent } from './building.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: BuildingComponent
},{
	path: 'castle/:castle_id',
	component: BuildingComponent
},{
	path: 'village/:building_id',
	component: BuildingComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		BuildingComponent
	],
	providers: []

})

export class BuildingModule { }
