import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { VideoRoomComponent } from './video-room/video-room.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', component: HomeComponent },
	{ path: 'auladigital/:roomId', component: HomeComponent },
	{ path: ':roomName', component: VideoRoomComponent }
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
