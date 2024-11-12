import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ResourceComponent } from './resource.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: ResourceComponent
},{
	path: 'castle/:castle_id',
	component: ResourceComponent
},{
	path: 'dungeon/:dungeon_id',
	component: ResourceComponent
},
{
	path: 'building/:resource_id',
	component: ResourceComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		ResourceComponent
	],
	providers: []

})

export class ResourceModule { }
