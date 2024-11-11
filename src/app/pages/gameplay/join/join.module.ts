import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { JoinComponent } from './join.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: JoinComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [JoinComponent]
})
export class JoinModule {}
