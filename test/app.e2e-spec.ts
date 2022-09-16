import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('Testes ToDo List', () => {
  let app: INestApplication;

  let tarefaId: number

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'Juliano',
          database: 'db_todolist_test',
          autoLoadEntities: true,
          synchronize: true,
          logging: false,
          dropSchema: true
        }),
      AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('01 - Inserindo Tarefa No banco de dados', async () => {
    let response = await request(app.getHttpServer())
      .post('/tarefa')
      .send({
        nome: 'Lavar a louça',
        descricao: 'Lavar a louça do café da manhã',
        responsavel: 'Juliano',
        data: '2022-09-15',
        status: false
      })
      .expect(201)

      tarefaId = response.body.id//tarefaID recebendo Id dessa tarefa criada
  })

  it('02 - Recuperando uma tarefa especifica', async () => {
    return request(app.getHttpServer())
      .get(`/tarefa/` + tarefaId)
      .expect(200)
  })

  it('03 - Atualizando uma tarefa', async () => {
    return request(app.getHttpServer())
      .put('/tarefa')
      .send({
        id: 1,
        nome: 'Lavar a louça',
        descricao: 'Lavar a louça do café da manhã',
        responsavel: 'Juliano',
        data: '2022-09-15',
        status: true
      })
      .expect(200)
      .then(response => {
        expect(true).toEqual(response.body.status)
      })
  })

  it('04 - Deletando uma tarefa', async () => {
    return request(app.getHttpServer())
      .delete('/tarefa/' + tarefaId)
      .expect(204)
    
  })

  afterAll(async () => {
    await app.close()
  })

});
