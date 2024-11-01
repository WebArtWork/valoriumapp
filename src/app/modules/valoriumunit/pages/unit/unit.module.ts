import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { UnitComponent } from './unit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: UnitComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		UnitComponent
	],
	providers: []

})

export class UnitModule { }
