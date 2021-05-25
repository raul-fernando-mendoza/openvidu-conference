
import * as express from 'express';
import { Request, Response } from 'express';
import { OpenViduService } from '../services/OpenViduService';
import { OPENVIDU_URL, OPENVIDU_SECRET } from '../config';
export const app = express.Router({
    strict: true
});

const openviduService = new OpenViduService();

app.post('/', async (req: Request, res: Response) => {
	let sessionId: string = req.body.sessionId;
	console.log('Session ID received', req.body);
	try {
		const sessionResponse = await openviduService.createSession(sessionId, OPENVIDU_URL, OPENVIDU_SECRET);

		sessionId =sessionResponse.id;
	} catch (error) {
		const statusCode = error.response?.status;
		if (statusCode && statusCode !== 409){
			handleError(error, res);
			return;
		}
	}

	try {
		const response = await openviduService.createToken(sessionId, OPENVIDU_URL, OPENVIDU_SECRET);

		res.status(200).send(JSON.stringify(response.token));

				
	} catch (error) {
		handleError(error, res);
	}
});
app.post('/recordings/start', async (req: Request, res: Response) => {
	let sessionId: string = req.body.sessionId;
	console.log('Session ID received', req.body);
	try {
		openviduService.RecordingsStart(sessionId, OPENVIDU_URL, OPENVIDU_SECRET).then(
			data =>{
				console.log("recording has started")
				res.status(200).send(JSON.stringify(data));
			},
			error => {
				console.log("record failed:" + JSON.stringify(error))
				res.status(400).send(JSON.stringify(error));
			}
		)
	}
	catch (error){
		handleError(error, res);
	}	
	
});
app.post('/recordings/stop', async (req: Request, res: Response) => {
	let recordingId: string = req.body.recordingId;
	console.log('recording to stop', recordingId);
	try {
		openviduService.RecordingsStop(recordingId, OPENVIDU_URL, OPENVIDU_SECRET).then(
			data =>{
				console.log("recording has stopped")
				res.status(200).send(JSON.stringify(data));
			},
			error => {
				console.log("record stop failed:" + JSON.stringify(error))
				res.status(400).send(JSON.stringify(error));
			}
		)
	}
	catch (error){
		handleError(error, res);
	}	
	
});

app.post('/recordings/delete', async (req: Request, res: Response) => {
	let recordingId: string = req.body.recordingId;
	console.log('recording to delete', recordingId);
	try {
		openviduService.RecordingsDelete(recordingId, OPENVIDU_URL, OPENVIDU_SECRET).then(
			data =>{
				console.log("recording has been deleted")
				res.status(200).send(JSON.stringify(data));
			},
			error => {
				console.log("record delete failed:" + JSON.stringify(error))
				res.status(400).send(JSON.stringify(error));
			}
		)
	}
	catch (error){
		handleError(error, res);
	}	
	
});

app.post('/recordings', async (req: Request, res: Response) => {
	let recordingId: string = req.body.recordingID;
	console.log('recording to erase', req.body);
	try {
		openviduService.Recordings(OPENVIDU_URL, OPENVIDU_SECRET).then(
			data =>{
				console.log("recording listed")
				res.status(200).send(JSON.stringify(data));
			},
			error => {
				console.log("record listing failed:" + JSON.stringify(error))
				res.status(400).send(JSON.stringify(error));
			}
		)
	}
	catch (error){
		handleError(error, res);
	}	
	
});

app.post('/login', async (req: Request, res: Response) => {
	let userId: string = req.body.userId;
	let password: string = req.body.password;
	console.log('validate userId password', req.body);
		if( userId == "claudia" && password == "Argos4905" ){
			console.log("User valid")
			var user = {
				userId:userId,
				roles:["admin"]
			}
			res.status(200).send(JSON.stringify(user));
		}
		else {
			console.log("user password incorrect:" )
			res.status(400).send(JSON.stringify({error:"user o password incorrect"}));
		}
		
	
});

function handleError(error: any, res: Response){
	const statusCode = error.response?.status;
	console.log(error);
	if (error.code === 'ECONNREFUSED'){
		console.error('ERROR: Cannot connect with OpenVidu Server');
		res.status(503).send('ECONNREFUSED: Cannot connect with OpenVidu Server');
		return;
	}
	if(error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT' || error.code.includes('SELF_SIGNED_CERT')){
		res.status(401).send('ERROR: Self signed certificate Visit '+ OPENVIDU_URL);
		return;
	}
	res.status(statusCode).send('ERROR: Cannot create OpenVidu session');
}
