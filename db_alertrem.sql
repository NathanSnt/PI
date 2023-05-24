create database db_alertrem;
use db_alertrem;

create table tb_perfis (
	codigo int not null auto_increment,
	nome varchar(50) not null,
    salt varchar(256) not null,
	senha varchar(256) not null,
	email varchar(100) not null,
	cpf char(14) not null,
    foto_perfil varchar(100),
	data_cadastro date not null,

	primary key(codigo) 
);

create table tb_funcionarios (
    codigo int not null auto_increment,
    nome varchar(50) not null,
    cpf varchar(14) not null,
    telefone varchar(20) not null,
    data_cadastro date not null default now(),

    primary key(codigo)
);

create table tb_usuarios (
    codigo int not null auto_increment,
    usuario varchar(50) not null,
    salt varchar(256) not null,
	senha varchar(256) not null,
    cod_funcionario int not null,

    primary key (codigo),
    foreign key (cod_funcionario) references tb_funcionarios (codigo)
);

create table tb_estacoes (
    codigo int not null auto_increment,
    nome varchar(100) not null,
    cod_usuario int not null,

    primary key (codigo),
    foreign key (cod_usuario) references tb_usuarios (codigo)
);

-- insert into tb_estacoes (nome, cod_usuario) values
-- ('Osasco', 1),
-- ('Presidente Altino', 1),
-- ('Ceasa', 1),
-- ('Vila Lobos Jaguare', 1),
-- ('Cidade Universitaria', 1),
-- ('Pinheiros', 1),
-- ('Hebraica Reboucas', 1),
-- ('Cidade Jardim', 1),
-- ('Vila Olimpia', 1),
-- ('Berrini', 1),
-- ('Morumbi', 1),
-- ('Granja Julieta', 1),
-- ('Joao Dias', 1),
-- ('Santo Amaro', 1),
-- ('Socorro', 1),
-- ('Jurubatuba', 1),
-- ('Autodromo', 1),
-- ('Primavera Interlagos', 1),
-- ('Grajau', 1),
-- ('Mendes Vila Natal', 1),
-- ('Varginha', 1);

create table tb_enderecos (
    codigo int not null auto_increment,
    rua varchar(100) not null,
    numero varchar(6) not null,
    bairro varchar(100) not null,
    cep varchar(9) not null,
    cod_estacao int not null,

    primary key (codigo),
    foreign key (cod_estacao) references tb_estacoes (codigo)
);

create table tb_estados_operacionais (
    codigo int not null auto_increment,
    estado varchar(50) not null,

    primary key (codigo)
);

insert into tb_estados_operacionais (estado) values
("Não Tem"),
("Funcionando"),
("Quebrado"),
("Manuteção");

create table tb_caracteristicas(
    codigo int not null auto_increment,
    nome varchar(100) not null,

    primary key (codigo)
);

create table tb_estacao_caracteristica_estado_operacional (
    codigo int not null auto_increment,
    cod_estacao int not null,
    cod_caracteristica int not null,
    cod_estado_operacional int not null,

    primary key (codigo),
    foreign key (cod_estacao) references tb_estacoes (codigo),
    foreign key (cod_caracteristica) references tb_caracteristicas (codigo),
    foreign key (cod_estado_operacional) references tb_estados_operacionais (codigo)
);

create table tb_reclamacoes (
	codigo int not null auto_increment,
	data_hora datetime not null default now(),
	tipo int not null, -- 1 ao 3
	descricao varchar(500),
	motivo varchar(100),
    numero_carro int,
	cod_usuario int not null,
	cod_estacao int,

	primary key(codigo),
	foreign key(cod_usuario)references tb_perfis(codigo),
	foreign key(cod_estacao)references tb_estacoes(codigo)
);


create table tb_denuncias (
    codigo int not null auto_increment,
    motivo varchar(100) not null,
    cod_usuario int not null,
    cod_reclamacao int not null,

    primary key (codigo),
    foreign key (cod_usuario) references tb_perfis(codigo),
    foreign key (cod_reclamacao) references tb_reclamacoes(codigo)
);

create table tb_status (
    codigo int not null auto_increment,
    status_movimentacao varchar(50) not null,
    cod_estacao int,
    data_hora datetime not null default now(),
    expiracao timestamp ,

    primary key (codigo),
    foreign key (cod_estacao) references tb_estacoes(codigo)
);

create trigger set_expiracao
before insert on tb_status
for each row
set new.expiracao = now() + interval 30 minute;
