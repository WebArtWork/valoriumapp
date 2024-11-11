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
import { GameplayComponent } from './core/theme/gameplay/gameplay.component';

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
			},
			{
				path: 'building',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'building'
					}
				},
				loadChildren: () =>
					import('./modules/valoriumbuilding/pages/building/building.module').then(
						(m) => m.BuildingModule	
					)
			},
			{
				path: 'map',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'map'
					}
				},
				loadChildren: () =>
					import('./modules/valoriummap/pages/map/map.module').then(
						(m) => m.MapModule
					)
			},
			{
				path: 'unit',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'unit'
					}
				},
				loadChildren: () =>
					import('./modules/valoriumunit/pages/unit/unit.module').then(
						(m) => m.UnitModule
					)
			},
			{
				path: 'message',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'message'
					}
				},
				loadChildren: () =>
					import('./modules/valoriummessage/pages/message/message.module').then(
						(m) => m.MessageModule
					)
			},
			{
				path: 'resource',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'resource'
					}
				},
				loadChildren: () =>
					import('./modules/valoriumresource/pages/resource/resource.module').then(
						(m) => m.ResourceModule
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
		path: 'gameplay',
		canActivate: [AuthenticatedGuard],
		component: GameplayComponent,
		children: [
			/* gameplay */
			{
				path: 'map',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Map'
					}
				},
				loadChildren: () => import('./pages/gameplay/map/map.module').then(m => m.MapModule)
			}, 
			{
				path: 'village',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Village'
					}
				},
				loadChildren: () => import('./pages/gameplay/village/village.module').then(m => m.VillageModule)
			}, 
			{
				path: 'join',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Join'
					}
				},
				loadChildren: () => import('./pages/gameplay/join/join.module').then(m => m.JoinModule)
			}, 
			{
				path: 'worlds',
				canActivate: [MetaGuard],
				data: {
					meta: {
						title: 'Worlds'
					}
				},
				loadChildren: () => import('./pages/gameplay/worlds/worlds.module').then(m => m.WorldsModule)
			}, 
		]
	},
	{
		path: '**',
		redirectTo: 'profile',
		pathMatch: 'full'
	}
];

@NgModule({
	declarations: [AppComponent, GuestComponent, UserComponent, GameplayComponent],
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
