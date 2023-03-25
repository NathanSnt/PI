create database if not exists db_alertrem;
use db_alertrem;

create table tb_usuarios (
	codigo int not null auto_increment,
	nome varchar(50) not null,
	senha varchar(50) not null,
	email varchar(100) not null,
	cpf char(14) not null,
	data_cadastro date not null,
	primary key(codigo) 
);

insert into tb_usuarios (nome, senha, email, cpf, data_cadastro) values
('Bruno', 'alertrem', 'bruno@hotmail.com', '111.111.111-11', CURDATE()),
('Leonardo', 'alertrem', 'leonardo@hotmail.com', '222.222.222-22', CURDATE()),
('Gustavo', 'alertrem', 'gustavo@hotmail.com', '333.333.333-33', CURDATE()),
('Gabriel', 'alertrem', 'gabriel@hotmail.com', '444.444.444-44', CURDATE()),
('Joao', 'alertrem', 'joao@hotmail.com', '555.555.555-55', CURDATE()),
('Nathan', 'alertrem', 'nathan@hotmail.com', '666.666.666-66', CURDATE());

create table tb_estacoes (
    codigo int not null auto_increment,
    nome varchar(50) not null,
    localizacao varchar(100) not null,
    banheiro varchar(50), -- Cada característica pode ter entre 4 valores (null, 'funcionando', 'em manutenção', 'quebrado')
    elevador varchar(50),
    terminal_interurbano varchar(50),
    terminal_urbano varchar(50),
    transferencia_interna varchar(50),
    bicicletario varchar(50),
    banheiro_acessivel varchar(50),
    estacao_acessivel varchar(50),
    rampa varchar(50),
    transposicao_plataformas varchar(50),
    escadas_rolantes varchar(50),
    acesso_elevador varchar(50),
    lanchonete varchar(50),
    emporio varchar(50),
    caixa_eletronico varchar(50),
    calcados varchar(50),
    telefone_p_surdos varchar(50),
    piso_tatil varchar(50),
    transferencia_gratuita varchar(50),
    acessorios varchar(50),
    farmacia varchar(50),
    rota_acessivel varchar(50),
    achados_perdidos varchar(50),

    primary key (codigo)
);

create table tb_reclamacoes (
	codigo int not null auto_increment,
	data_hora date not null,
	tipo int not null, -- 1 ao 3
	descricao varchar(100),
	motivo varchar(100),
	cod_usu int,
	cod_estacao int,
	foreign key(cod_usu)references tb_usuarios(codigo),
	foreign key(cod_estacao)references tb_estacoes(codigo),
	primary key(codigo)
);

create table tb_status (
	codigo int not null auto_increment,
	descricao varchar(100) not null,
	data_hora date not null,
	primary key(codigo)
);

create table tb_avaliacoes (
	codigo int not null auto_increment,
	avaliacao int not null,
	cod_usu int not null,
	foreign key(cod_usu)references tb_usuarios(codigo),
	primary key(codigo)
);