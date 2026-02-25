CREATE TABLE `especialidades` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nome` varchar(45) NOT NULL,
	CONSTRAINT `especialidades_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orcamentos` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`paciente_cpf` varchar(11),
	`valor` decimal(10,2),
	`status` enum('pendente','aprovado','declinado','cancelado') DEFAULT 'pendente',
	`descricao_tratamento` text,
	`data_criacao` date,
	CONSTRAINT `orcamentos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pacientes` (
	`cpf` varchar(11) NOT NULL,
	`nome` varchar(45) NOT NULL,
	`nascimento` date,
	`cpf_parceiro` varchar(11),
	`queixa_principal` text,
	`descricao_caso` text,
	`descricao_objetivos_tratamento` text,
	`observacoes` text,
	`inicio_tratamento` date,
	CONSTRAINT `pacientes_cpf` PRIMARY KEY(`cpf`)
);
--> statement-breakpoint
CREATE TABLE `parceiros` (
	`cpf` varchar(11) NOT NULL,
	`cro` varchar(20) NOT NULL,
	`cro_uf` char(2) NOT NULL,
	`email` varchar(45) NOT NULL,
	`telefone` varchar(11),
	`especialidade_id` tinyint,
	`titulacao_id` tinyint,
	`estabelecimento_cnpj` varchar(14),
	`estabelecimento_razao_social` varchar(100),
	`estabelecimento_endereco` varchar(200),
	`telefone_estabelecimento` varchar(11),
	`complemento` varchar(100),
	`cep` varchar(8),
	`bairro` varchar(100),
	`cidade` varchar(100),
	`uf_estabelecimento` varchar(2),
	CONSTRAINT `parceiros_cpf` PRIMARY KEY(`cpf`)
);
--> statement-breakpoint
CREATE TABLE `tipo_usuario` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`descricao` varchar(45) NOT NULL,
	CONSTRAINT `tipo_usuario_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `titulacoes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`nome` varchar(45) NOT NULL,
	CONSTRAINT `titulacoes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `usuarios` (
	`cpf` varchar(11) NOT NULL,
	`nome` varchar(45) NOT NULL,
	`senha` varchar(32) NOT NULL,
	`tipo_usuario_id` tinyint NOT NULL,
	CONSTRAINT `usuarios_cpf` PRIMARY KEY(`cpf`)
);
--> statement-breakpoint
ALTER TABLE `orcamentos` ADD CONSTRAINT `orcamentos_paciente_cpf_pacientes_cpf_fk` FOREIGN KEY (`paciente_cpf`) REFERENCES `pacientes`(`cpf`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `pacientes` ADD CONSTRAINT `pacientes_cpf_parceiro_parceiros_cpf_fk` FOREIGN KEY (`cpf_parceiro`) REFERENCES `parceiros`(`cpf`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parceiros` ADD CONSTRAINT `parceiros_cpf_usuarios_cpf_fk` FOREIGN KEY (`cpf`) REFERENCES `usuarios`(`cpf`) ON DELETE no action ON UPDATE no action;