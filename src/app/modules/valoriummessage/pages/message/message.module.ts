import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { MessageComponent } from './message.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
	path: '',
	component: MessageComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CoreModule
	],
	declarations: [
		MessageComponent
	],
	providers: []

})

export class MessageModule { }
