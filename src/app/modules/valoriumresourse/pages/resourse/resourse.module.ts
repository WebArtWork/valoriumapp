import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ResourseComponent } from './resourse.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: ResourseComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		ResourseComponent
	],
	providers: []

})

export class ResourseModule { }
