import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { QuestComponent } from './quest.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: QuestComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		QuestComponent
	],
	providers: []

})

export class QuestModule { }