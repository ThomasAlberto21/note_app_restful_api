import supertest from 'supertest';
import { web } from '../src/application/web.js';

describe('User Test', () => {
  describe('POST /user/register', () => {
    it('Should can register new user', async () => {
      const result = await supertest(web).post('/user/register').send({
        name: 'test123',
        password: 'test12345679',
      });

      expect(result.status).toBe(200);
      expect(result.body.data.name).toBe('test123');
      expect(result.body.data.id_user).toBeDefined();
      expect(result.body.data.password).toBeUndefined();
    });

    it('Should can not register new user with name already exist', async () => {
      const result = await supertest(web).post('/user/register').send({
        name: 'Thomas',
        password: 'test12345679',
      });

      expect(result.status).toBe(400);
      expect(result.body.error).toBeDefined();
    });

    it('Should can not register new user with name less than 10 character', async () => {
      const result = await supertest(web).post('/user/register').send({
        name: 'riot',
        password: 'test',
      });

      expect(result.status).toBe(400);
      expect(result.body.error).toBeDefined();
    });

    it('Should can not register new user with name more than 100 characters', async () => {
      const result = await supertest(web).post('/user/register').send({
        name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl vitae luctus lacinia, nisl nunc luctus nunc, vitae luctus nisl nunc vitae nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl. Sed vitae nisl euismod, luctus nisl vitae, luctus nisl.',
        password: 'test12345679',
      });

      expect(result.status).toBe(400);
      expect(result.body.error).toBeDefined();
    });

    it('Should reject if request is invalid', async () => {
      const result = await supertest(web).post('/user/register').send({
        name: '',
        password: '',
      });

      expect(result.status).toBe(400);
      expect(result.body.error).toBeDefined();
    });
  });

  describe('POST /user/login', () => {
    it('Should can login', async () => {
      const result = await supertest(web).post('/user/login').send({
        name: 'Riot',
        password: 'riot1234567',
      });

      expect(result.status).toBe(200);
      expect(result.body.data.token).toBeDefined();
      expect(result.body.data.password).toBeUndefined();
    });

    it('Should reject if request is invalid', async () => {
      const result = await supertest(web).post('/user/login').send({
        name: '',
        password: '',
      });

      expect(result.status).toBe(400);
    });

    it('Should reject if name wrong', async () => {
      const result = await supertest(web).post('/user/login').send({
        name: 'Riot1',
        password: 'riot1234567',
      });

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });

    it('Should reject if password wrong', async () => {
      const result = await supertest(web).post('/user/login').send({
        name: 'Riot',
        password: 'riot1234568',
      });

      expect(result.status).toBe(401);
      expect(result.body.error).toBeDefined();
    });
  });
});
