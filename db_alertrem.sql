create database db_alertrem;
use db_alertrem;

create table tb_usuarios (
	codigo int not null auto_increment,
	nome varchar(50) not null,
    salt varchar(60) not null,
	senha varchar(256) not null,
	email varchar(100) not null,
	cpf char(14) not null,
    foto_perfil varchar(100),
	data_cadastro date not null,

	primary key(codigo) 
);

create table tb_estacoes (
    codigo int not null auto_increment,
    nome varchar(50) not null,
    localizacao varchar(150) not null,

    primary key (codigo)
);

insert into tb_estacoes (nome, localizacao) values
('osasco', 'Praça Antonio Menck, s/nº (Centro)/ Rua Erasmo Braga, s/nº (Bonfim) – Osasco 06093-090'),
('presidente altino', 'Rua Abílio Mendes, 08 - Presidente Altino - Osasco'),
('ceasa', 'Avenida das Nações Unidas, 1.390 - Vila Leopoldina - São Paulo 05311-000 '),
('vila lobos jaguare', 'Avenida das Nações Unidas, 2.100 - Jaguaré - São Paulo 05477-000 '),
('cidade universitaria', 'Avenida das Nações Unidas, 6.202 - Jardim Universidade Pinheiros - São Paulo 05477-000 '),
('pinheiros', 'Rua Capri, 145 - Pinheiros - São Paulo 05477-000 '),
('hebraica reboucas', 'Rua Ofélia, 255 - Pinheiros - São Paulo 05423-110'),
('cidade jardim', 'Rua Prof. Artur Ramos, 787 (Jardim Paulistano) / Rua Hungria, s/nº (Jardim Europa) – São Paulo 05477-000'),
('vila olimpia', 'Avenida das Nações Unidas, 10.900 (Brooklin Paulista) / Rua Beira Rio, s/nº (Vila Olímpia) – São Paulo 04578-000'),
('berrini', 'Berrini Rua Guilherme Barbosa de Melo, nº 117 / Rua Joel Carlos Borges, 179 – Cidade Monções – São Paulo 04578-000'),
('morumbi', 'Avenida das Nações Unidas, 14.171 - Vila Gertrudes - São Paulo 04578-000'),
('granja julieta', 'Rua Alexandre Dumas, 4.403 - Chácara Santo Antonio - São Paulo 04717-004 '),
('joao dias', 'Avenida das Nações Unidas, 18667 - Santo Amaro - 04730-90'),
('santo amaro', 'Avenida das Nações Unidas, s/nº - Jardim Promissão - São Paulo 04795-100 '),
('socorro', 'Av. das Nações Unidas, s/nº (Jurubatuba)/ Rua Florenville s/nº (Santo Amaro) – São Paulo 04696-010'),
('jurubatuba', 'Av. Octales M. Ferreira, 391 - Jurubatuba - São Paulo 04696-010'),
('autodromo', 'Rua Plínio Schmidt, nº 307 - Jardim Marcel -São Paulo 4815130 '),
('primavera interlagos', 'Rua Jequirituba, 83 (Jardim Colonial)/ Rua Alexandre Gandini, 71( Parque Santana) - São Paulo 04822-000 '),
('grajau', 'Rua Giovanni Bononcini, 77 - Parque Brasil - São Paulo 04822-000 '),
('mendes vila natal', 'Estrada dos Mendes, s/n - Jardim Icarai – Grajaú - 04860-140'),
('varginha', 'Sem endereço ainda');

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
    tipo varchar(100) not null,
    cod_estado int not null,
    cod_estacao int not null,

    primary key (codigo),
    foreign key (cod_estado) references tb_estados_operacionais (codigo),
    foreign key (cod_estacao) references tb_estacoes (codigo)
);

create table tb_reclamacoes (
	codigo int not null auto_increment,
	data_hora datetime not null default now(),
	tipo int not null, -- 1 ao 3
	descricao varchar(500),
	motivo varchar(100),
    numero_carro int,
	cod_usu int,
	cod_estacao int,

	foreign key(cod_usu)references tb_usuarios(codigo),
	foreign key(cod_estacao)references tb_estacoes(codigo),
	primary key(codigo)
);

create table tb_funcionarios (
    codigo int not null auto_increment,
    nome varchar(50) not null,
    usuario varchar(50) not null,
    salt varchar(60) not null,
	senha varchar(256) not null,
    data_hora datetime not null default now(),

    primary key(codigo)
);

create table tb_denuncias (
    codigo int not null auto_increment,
    cod_reclamacao int not null,
    cod_usuario int not null,

    foreign key (cod_reclamacao) references tb_reclamacoes(codigo),
    foreign key (cod_usuario) references tb_usuarios(codigo),
    primary key (codigo)
);

create table tb_status (
    codigo int not null auto_increment,
    status_movimentacao varchar(50) not null,
    cod_estacao int,
    data_hora timestamp not null default current_timestamp,
    expiracao timestamp ,

    foreign key (cod_estacao) references tb_estacoes(codigo),
    primary key (codigo)
);

create trigger set_expiracao
before insert on tb_status
for each row
set new.expiracao = now() + interval 30 minute;

-- SELECT * FROM tb_status WHERE expiracao > NOW();