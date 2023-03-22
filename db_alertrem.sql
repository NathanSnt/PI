create database if not exists db_alertrem;
use db_alertrem;

create table tb_estacoes (
    id_estacao int not null auto_increment,
    nome_estacao varchar(50) not null,
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

    primary key (id_estacao)
);

