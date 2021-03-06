import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { LoginService } from '../login.service';
import { NetworkService } from '../shared/services/network/network.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public roomForm: FormControl;
	public version = require('../../../package.json').version;

	roomId = null


	yourDate = new Date()


	constructor(
		private router: Router,
		private networkService:NetworkService,

		private loginService:LoginService,
		private route: ActivatedRoute
		) {
			this.roomId = this.route.snapshot.paramMap.get('roomId')
		}

	recordings_urls = []
	rooms = ["Tecnica_I", "Tecnica_II" , "Tecnica_III" ,  "Tecnica_IV", "Improvisacion" ]

	ngOnInit() {
		const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals], separator: '-', });
		this.roomForm = new FormControl(this.roomId, [Validators.minLength(4), Validators.required]);

		this.getRecordingId()
	}

	public goToVideoCall() {
		if (this.roomForm.valid) {
			const roomName = this.roomForm.value.replace(/ /g, '-'); // replace white spaces by -
			this.roomForm.setValue(roomName);
			this.router.navigate(['/', roomName]);
		}
	}

	getRecordingId(){
		this.networkService.Recordings().then(
			data => {
				let items = data["items"]
				for( var i =0 ; i< items.length; i++){
					let recording = items[i]

					this.recordings_urls.push(recording)
				}
			},
			error => {
				console.log("errror retriving list of recordings" + JSON.stringify(error))
			}

		)
	}
	deleteRecording(i){
		let recording = this.recordings_urls[i]
		this.networkService.RecordingsDelete(recording["id"]).then(
			data => {

				console.log("recording delete", JSON.stringify(data))
				this.recordings_urls.splice(i,1)
			},
			error => {
				console.log("delete error", JSON.stringify(error))
			}
		)
	}



	isAdmin(){
		return this.loginService.isAdmin()
	}

	isLoggedIn(){
		if( this.loginService.getUser() ){
			return true
		}
		return false;

	}
}
