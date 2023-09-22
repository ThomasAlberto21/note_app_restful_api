import supertest from 'supertest';
import { web } from '../src/application/web.js';

describe('Note Test', () => {
  describe('POST /notes', () => {
    it('Should can create new note', async () => {
      const result = await supertest(web)
        .post('/notes')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da')
        .send({
          title: 'test123',
          description: 'test12345679',
        });

      expect(result.status).toBe(200);
      expect(result.body.data.id_note).toBeDefined();
      expect(result.body.data.title).toBeDefined();
      expect(result.body.data.date).toBeDefined();
      expect(result.body.data.description).toBeDefined();
    });

    it('Should reject if request is invalid', async () => {
      const result = await supertest(web)
        .post('/notes')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da')
        .send({
          title: '',
          description: 'test12345679',
        });

      expect(result.status).toBe(400);
      expect(result.body.error).toBeDefined();
    });
  });

  describe('GET /notes/:noteId', () => {
    it('Should can get note data by id', async () => {
      const result = await supertest(web)
        .get('/notes/' + '29769b16-bc6b-4425-b443-f48b46130c0d')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da');

      expect(result.status).toBe(200);
      expect(result.body.data.id_note).toBeDefined();
      expect(result.body.data.title).toBeDefined();
      expect(result.body.data.date).toBeDefined();
      expect(result.body.data.description).toBeDefined();
    });

    it('Should reject if note id is invalid', async () => {
      const result = await supertest(web)
        .get('/notes/' + '29769b16-bc6b-4425-b443-f48b46130c0d')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270d');

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });

    it('Should reject if note id is not found', async () => {
      const result = await supertest(web)
        .get('/notes/' + '29769b16-bc6b-4425-b443-f48b46130c0')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da');

      expect(result.status).toBe(404);
      expect(result.body.error).toBeDefined();
    });
  });

  describe('PUT /notes/:noteId', () => {
    it('Should can update note data by id', async () => {
      const result = await supertest(web)
        .put('/notes/' + '29769b16-bc6b-4425-b443-f48b46130c0d')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da')
        .send({
          title: 'Jalan 45',
          description: 'jalan12345',
        });

      expect(result.status).toBe(200);
      expect(result.body.data.id_note).toBeDefined();
      expect(result.body.data.title).toBeDefined();
      expect(result.body.data.date).toBeDefined();
      expect(result.body.data.description).toBeDefined();
    });

    it('Should reject if note id is invalid', async () => {
      const result = await supertest(web)
        .put('/notes/' + '29769b16-bc6b-4425-b443-f48b46130c0')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da')
        .send({
          title: 'Jalan 453',
          description: 'jalan123453',
        });

      expect(result.status).toBe(404);
      expect(result.body.error).toBeDefined();
    });

    it('Should reject if request is invalid', async () => {
      const result = await supertest(web)
        .put('/notes/' + '29769b16-bc6b-4425-b443-f48b46130c0d')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270d')
        .send({
          title: 'Jalan 45',
          description: 'jalan12345',
        });

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });
  });

  describe('DELETE /notes/:noteId', () => {
    it('Should can delete note data by id', async () => {
      const result = await supertest(web)
        .delete('/notes/' + '75e8f4d3-e9ac-477d-94d5-39baae29a347')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da');

      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });

    it('Should reject if note id is not found', async () => {
      const result = await supertest(web)
        .delete('/notes/' + '29769b16-bc6b-4425-b443-f48b46130c0')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da');

      expect(result.status).toBe(404);
      expect(result.body.error).toBeDefined();
    });

    it('Should reject if request is invalid', async () => {
      const result = await supertest(web)
        .delete('/notes/' + '4e4a1acb-f086-4818-bb0b-520cc37b6d85\n')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270d');

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });
  });

  describe('GET /notes', () => {
    it('Should can get all note data', async () => {
      const result = await supertest(web)
        .get('/notes')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da');

      expect(result.status).toBe(200);
      expect(result.body.data).toBeDefined();
    });

    it('Should reject if request is invalid', async () => {
      const result = await supertest(web)
        .get('/notes')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270d');

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });

    it('Should can search note data by title', async () => {
      const response = await supertest(web)
        .get('/notes')
        .set('Authorization', 'b22394f8-230d-4818-a8e0-4e5282c270da')
        .query({ title: 'test123' });

      expect(response.status).toBe(200);
      expect(response.body.data).toBeDefined();
    });
  });
});
