import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { VillageComponent } from './village.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: VillageComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [VillageComponent]
})
export class VillageModule {}
