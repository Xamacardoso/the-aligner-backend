ALTER TABLE `especialidades` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `parceiros` MODIFY COLUMN `especialidade_id` int;--> statement-breakpoint
ALTER TABLE `parceiros` MODIFY COLUMN `titulacao_id` int;--> statement-breakpoint
ALTER TABLE `tipo_usuario` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `titulacoes` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `usuarios` MODIFY COLUMN `tipo_usuario_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `parceiros` ADD CONSTRAINT `parceiros_especialidade_id_especialidades_id_fk` FOREIGN KEY (`especialidade_id`) REFERENCES `especialidades`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `parceiros` ADD CONSTRAINT `parceiros_titulacao_id_titulacoes_id_fk` FOREIGN KEY (`titulacao_id`) REFERENCES `titulacoes`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_tipo_usuario_id_tipo_usuario_id_fk` FOREIGN KEY (`tipo_usuario_id`) REFERENCES `tipo_usuario`(`id`) ON DELETE no action ON UPDATE no action;