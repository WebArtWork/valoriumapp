import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Core
import { GuestComponent } from './core/theme/guest/guest.component';
import { UserComponent } from './core/theme/user/user.component';
import { AppComponent } from './app.component';
import { CoreModule } from 'src/app/core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
// config
import { WacomModule, MetaGuard } from 'wacom';
import { environment } from 'src/environments/environment';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { AdminsGuard } from './core/guards/admins.guard';
import { AlertModule } from './core/modules/alert/alert.module';
import { ModalModule } from './core/modules/modal/modal.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/sign',
		pathMatch: 'full'
	},
	{
		path: '',
		canActivate: [GuestGuard],
		component: GuestComponent,
		children: [
			/* guest */
			{
				path: 'components',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Components'
					}
				},
				loadChildren: () =>
					import('./pages/guest/components/components.module').then(
						(m) => m.ComponentsModule
					)
			},
			{
				path: 'sign',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Sign'
					}
				},
				loadChildren: () =>
					import('./pages/guest/sign/sign.module').then(
						(m) => m.SignModule
					)
			}
		]
	},
	{
		path: '',
		canActivate: [AuthenticatedGuard],
		component: UserComponent,
		children: [
			/* user */
			{
				path: 'profile',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'My Profile'
					}
				},
				loadChildren: () =>
					import('./pages/user/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			},
			{
				path: 'worlds',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Worlds'
					}
				},
				loadChildren: () =>
					import('./modules/valoriumworld/pages/worlds/worlds.module').then(
						(m) => m.WorldsModule
					)
			},
			{
				path: 'village',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Village'
					}
				},
				loadChildren: () =>
					import('./modules/valoriumvillage/pages/village/village.module').then(
						(m) => m.VillageModule
					)
			},
			{
				path: 'castle',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'castle'
					}
				},
				loadChildren: () =>
					import('./modules/valoriumcastle/pages/castle/castle.module').then(
						(m) => m.CastleModule
					)
			},
			{
				path: 'trade',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'trade'
					}
				},
				loadChildren: () =>
					import('./modules/valoriumtrade/pages/trade/trade.module').then(
						(m) => m.TradeModule	
					)
			},
			{
				path: 'dungeon',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'dungeon'
					}
				},
				loadChildren: () =>
					import('./modules/valoriumdungeon/pages/dungeon/dungeon.module').then(
						(m) => m.DungeonModule
					)
			},
			{
				path: 'quest',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'quest'
					}
				},
				loadChildren: () =>
					import('./modules/valoriumquest/pages/quest/quest.module').then(
						(m) => m.QuestModule
					)
			}
		]
	},
	{
		path: 'admin',
		canActivate: [AdminsGuard],
		component: UserComponent,
		children: [
			/* admin */
			{
				path: 'users',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Users'
					}
				},
				loadChildren: () =>
					import('./modules/user/pages/users/users.module').then(
						(m) => m.UsersModule
					)
			},
			{
				path: 'forms',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Forms'
					}
				},
				loadChildren: () =>
					import(
						'./modules/customform/pages/customforms/customforms.module'
					).then((m) => m.CustomformsModule)
			},
			{
				path: 'translates',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Translates'
					}
				},
				loadChildren: () =>
					import(
						'./core/modules/translate/pages/translates/translates.module'
					).then((m) => m.TranslatesModule)
			}
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent],
	imports: [
		AlertModule,
		ModalModule,
		CoreModule,
		BrowserModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		WacomModule.forRoot({
			store: {},
			http: {
				url: environment.url
			},
			socket: environment.production,
			meta: {
				useTitleSuffix: true,
				defaults: {
					title: 'Valorium',
					titleSuffix: ' | Valorium',
					'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
				}
			},
			modal: {
				modals: {
					/* modals */
				}
			}
		}),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [
		AuthenticatedGuard,
		GuestGuard,
		AdminsGuard,
		{ provide: LocationStrategy, useClass: HashLocationStrategy }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
