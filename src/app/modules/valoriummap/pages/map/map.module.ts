import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MapComponent } from './map.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: MapComponent
}, {
	path: 'world/:world_id',
	component: MapComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		MapComponent
	],
	providers: []

})

export class MapModule { }
