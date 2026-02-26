CREATE TABLE `arquivos_paciente` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`paciente_cpf` varchar(11) NOT NULL,
	`formato` varchar(10) NOT NULL,
	`r2key` varchar(255) NOT NULL,
	`nome_original` varchar(255) NOT NULL,
	`data_criacao` date,
	CONSTRAINT `arquivos_paciente_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `arquivos_paciente` ADD CONSTRAINT `arquivos_paciente_paciente_cpf_pacientes_cpf_fk` FOREIGN KEY (`paciente_cpf`) REFERENCES `pacientes`(`cpf`) ON DELETE no action ON UPDATE no action;