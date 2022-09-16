import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength } from "class-validator";

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name: 'tb_tarefa'})//Criando tabela tb_tarefa e diz que a classe que vir depois será a tb tarefa
export class Tarefa{//Criando uma classe
    
    @PrimaryGeneratedColumn()//Definindo a chave primaria
    @ApiProperty()
    id: number

    @IsNotEmpty()//Validator para caso o usuario digite algo vazio
    @MaxLength(50)//Validator pra se o nome for maior que 50 char
    @Column({nullable: false, length: 50})//Definindo que nome é uma coluna, que não pode ser nula e com máximo de 50 char
    @ApiProperty()
    nome: string


    @IsNotEmpty()//Validator para caso o usuario digite algo vazio
    @MaxLength(500)//Validator pra se a descricao for maior que 500 char
    @Column({nullable: false, length:500})//Definindo que descricao é uma coluna, que não pode ser nula e com máximo de 500 char
    @ApiProperty()
    descricao: string

    @IsNotEmpty()//Validator para caso o usuario digite algo vazio
    @MaxLength(50)//Validator pra se o responsavel for maior que 50 char
    @Column({nullable: false, length:50})//Definindo que responsavel é uma coluna, que não pode ser nula e com máximo de 50 char
    @ApiProperty()
    responsavel:string
    
    @Column()//Não precisa passar parametros, pois uma data sempre tem dados definidos
    @ApiProperty()
    data: Date

    @Column()//Não precisa parametros, pois é sempre true ou false
    @ApiProperty()
    status: boolean

    @ManyToOne(() => Categoria, (Categoria ) => Categoria.tarefas, {
            onDelete: "CASCADE"//Declara que se uma categoria é excluida todas as tarefas pertencentes tambem são
    })
    @ApiProperty({type: () => Categoria})        
    categoria: Categoria
}