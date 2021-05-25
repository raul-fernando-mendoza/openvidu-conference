import { HttpClientService } from './HttpClientService';

export class OpenViduService {

    private httpClientService: HttpClientService;

	constructor(){
        this.httpClientService = new HttpClientService();
    }

	public async createSession(sessionId: string, openviduUrl: string, openviduSecret: string ): Promise<any> {
        const url = openviduUrl + '/openvidu/api/sessions';
        console.log("Requesting session to ", url);
        const body: string = JSON.stringify({ customSessionId: sessionId});

        return await this.httpClientService.post(body, url, openviduSecret);
	}

    public async RecordingsStart(sessionId: string, openviduUrl: string, openviduSecret: string ): Promise<any> {
        const url = openviduUrl + '/openvidu/api/recordings/start';
        console.log("Recording session to ", sessionId);

        var req = {
            "session":sessionId,
            "name":sessionId,
            "outputMode":"COMPOSED",
            "hasAudio": true,
            "hasVideo": true,
            "recordingLayout":"BEST_FIT",
            "resolution": "640x480"
        }
        const body: string = JSON.stringify(req);

        return await this.httpClientService.post(body, url, openviduSecret);
	}

    public async RecordingsStop(recordingId: string, openviduUrl: string, openviduSecret: string ): Promise<any> {
        const url = openviduUrl + '/openvidu/api/recordings/stop/';
        console.log("Recording stop", recordingId);

        var req = {
            "id":recordingId
        }
        const body: string = JSON.stringify(req);

        return await this.httpClientService.post(body, url + recordingId, openviduSecret);
	}

    public async RecordingsDelete(recordingId: string, openviduUrl: string, openviduSecret: string ): Promise<any> {
        const url = openviduUrl + '/openvidu/api/recordings/';
        console.log("Recording delete", recordingId);

        var req = {
            "id":recordingId
        }
        const body: string = JSON.stringify(req);

        return await this.httpClientService.delete(body, url + recordingId, openviduSecret);
	}

    public async Recordings(openviduUrl: string, openviduSecret: string ): Promise<any> {
        const url = openviduUrl + '/openvidu/api/recordings';
        console.log("Recording");

        var req = {
           
        }
        const body: string = JSON.stringify(req);

        return await this.httpClientService.get(body, url, openviduSecret);
	}


	public async createToken(sessionId: string, openviduUrl: string, openviduSecret: string ): Promise<any> {
		const url = openviduUrl + '/openvidu/api/sessions/' + sessionId + '/connection';
        console.log("Requesting token to ", url);
        const body: string = JSON.stringify({});

        return await this.httpClientService.post(body, url, openviduSecret);
    }
}