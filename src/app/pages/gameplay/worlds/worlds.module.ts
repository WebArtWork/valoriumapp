import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { WorldsComponent } from './worlds.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: WorldsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [WorldsComponent]
})
export class WorldsModule {}
