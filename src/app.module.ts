import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Categoria } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/modules/categoria.module';
import { Tarefa } from './tarefa/entities/tarefa.entity';
import { TarefaModule } from './tarefa/modules/tarefa.module';


@Module({
  imports: [
    /*//Dabatase Local
    TypeOrmModule.forRoot({//Vai ter o que é necessario pra se conectar com o DB
      type: 'mysql',//Definindo objeto do tipo mysql
      host: 'localhost', //Definindo que o host é o localhost
      port: 3306, //Definindo a posta do local host (Porta padrão)
      username: 'root', //Definindo o username do mysql
      password: 'root', //Senha padrão DB
      database: 'db_todo', //Nome da tabela que criamos
      entities: [Tarefa, Categoria], //Criando o TB tarefa
      synchronize: true //Sincroniza todos os dados e alterações no DB
      //Com essas informações é possivel se conectar com o BD
    }),
    */
   TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      logging: false,
      dropSchema: false,
      ssl:{
        rejectUnauthorized: false
      },
      synchronize: true,
      autoLoadEntities: true
   }),
    TarefaModule,
    CategoriaModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
