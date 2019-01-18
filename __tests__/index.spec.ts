
import * as request from 'supertest';
import { server } from '../src/index';

describe('Server', () => {
	afterEach(() => {
		server.close();
	});
	
	test('should start and return a 200 status', async () => {
		const response = await request(server).get('/ping');

		expect(response.status).toEqual(200);
	});
});
