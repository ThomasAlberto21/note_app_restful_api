import supertest from 'supertest';
import { web } from '../src/application/web.js';

describe('User Test', () => {
  describe('POST /api/user/register', () => {
    it('Should can register new user', async () => {
      const result = await supertest(web).post('/api/user/register').send({
        name: 'test123',
        password: 'test12345679',
      });

      expect(result.status).toBe(200);
      expect(result.body.data.name).toBe('test123');
      expect(result.body.data.id_user).toBeDefined();
      expect(result.body.data.password).toBeUndefined();
    });

    it('Should can not register new user with name already exist', async () => {
      const result = await supertest(web).post('/api/user/register').send({
        name: 'test123',
        password: 'test12345679',
      });

      expect(result.status).toBe(400);
      expect(result.body.error).toBeDefined();
    });

    it('Should can not register new user with name less than 10 character', async () => {
      const result = await supertest(web).post('/api/user/register').send({
        name: 'riot',
        password: 'test',
      });

      expect(result.status).toBe(400);
      expect(result.body.error).toBeDefined();
    });

    it('Should can not register new user with name more than 100 characters', async () => {
      const result = await supertest(web).post('/api/user/register').send({
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae luctus lacinia, nisl nunc luctus nunc, vitae luctus nisl nunc vitae nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl.',
        password: 'test12345679',
      });

      expect(result.status).toBe(400);
      expect(result.body.error).toBeDefined();
    });

    it('Should reject if request is invalid', async () => {
      const result = await supertest(web).post('/api/user/register').send({
        name: '',
        password: '',
      });

      expect(result.status).toBe(400);
      expect(result.body.error).toBeDefined();
    });
  });

  describe('POST /api/user/login', () => {
    it('Should can login', async () => {
      const result = await supertest(web).post('/api/user/login').send({
        name: 'test123',
        password: 'test12345679',
      });

      expect(result.status).toBe(200);
      expect(result.body.data.token).toBeDefined();
      expect(result.body.data.password).toBeUndefined();
    });

    it('Should reject if request is invalid', async () => {
      const result = await supertest(web).post('/api/user/login').send({
        name: '',
        password: '',
      });

      expect(result.status).toBe(400);
    });

    it('Should reject if name wrong', async () => {
      const result = await supertest(web).post('/api/user/login').send({
        name: 'test1234',
        password: 'test12345679',
      });

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });

    it('Should reject if password wrong', async () => {
      const result = await supertest(web).post('/api/user/login').send({
        name: 'test123',
        password: 'test123456790',
      });

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });
  });

  describe('GET /api/user', () => {
    it('Should can get user data', async () => {
      const result = await supertest(web)
        .get('/api/user')
        .set('Authorization', '1c1c428b-524c-48ac-a9a5-37c56e5acf65');

      expect(result.status).toBe(200);
      expect(result.body.data.name).toBeDefined();
      expect(result.body.data.id_user).toBeDefined();
      expect(result.body.data.password).toBeUndefined();
    });

    it('Should reject if token is invalid', async () => {
      const result = await supertest(web)
        .get('/api/user')
        .set('Authorization', 'wrong');

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });
  });

  describe('PATCH /api/user', () => {
    it('Should can update user data', async () => {
      const result = await supertest(web)
        .patch('/api/user')
        .set('Authorization', '1c1c428b-524c-48ac-a9a5-37c56e5acf65')
        .send({
          name: 'Thomas Alberto',
          password: 'thomas123456',
        });

      expect(result.status).toBe(200);
      expect(result.body.data.name).toBeDefined();
      expect(result.body.data.id_user).toBeUndefined();
      expect(result.body.data.password).toBeUndefined();
    });

    it('Should reject if token is invalid', async () => {
      const result = await supertest(web)
        .patch('/api/user')
        .set('Authorization', '1c1c428b-524c-48ac-a9a5-37c56e5acf6')
        .send({
          name: 'Thomas Alberto2',
          password: 'thomas123456',
        });

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });

    it('Should can update user only name', async () => {
      const result = await supertest(web)
        .patch('/api/user')
        .set('Authorization', '1c1c428b-524c-48ac-a9a5-37c56e5acf65')
        .send({
          name: 'Thomas Alberto23',
        });

      expect(result.status).toBe(200);
      expect(result.body.data.name).toBeDefined();
      expect(result.body.data.id_user).toBeUndefined();
      expect(result.body.data.password).toBeUndefined();
    });

    it('Should can update user only password', async () => {
      const result = await supertest(web)
        .patch('/api/user')
        .set('Authorization', '1c1c428b-524c-48ac-a9a5-37c56e5acf65')
        .send({
          password: 'thomasalberto232',
        });

      expect(result.status).toBe(200);
      expect(result.body.data.name).toBeDefined();
      expect(result.body.data.id_user).toBeUndefined();
      expect(result.body.data.password).toBeUndefined();
    });
  });

  describe('DELETE /api/user/logout', () => {
    it('should can logout', async () => {
      const result = await supertest(web)
        .delete('/api/user/logout')
        .set('Authorization', '1c1c428b-524c-48ac-a9a5-37c56e5acf65');

      expect(result.status).toBe(200);
      expect(result.body.success).toBe('Logout success');
    });

    it('should reject logout if token is invalid', async () => {
      const result = await supertest(web)
        .delete('/api/user/logout')
        .set('Authorization', '2e42b162-c7b7-4741-866d-36407baf303');

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });
  });
});
