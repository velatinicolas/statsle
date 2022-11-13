.PHONY: help
help: ## Display Makefile available commands
	@sed -nr 's/^([a-z\-]*): ## (.*)$$/\1;\2/p' Makefile | column -t -s ';'

.PHONY: start
start: ## Up the containers
	docker-compose up -d

.PHONY: ps
ps: ## Show docker processes
	docker-compose ps

.PHONY: down
down: ## Down the containers
	docker-compose down

.PHONY: logs
logs: ## Display all containers logs
	docker-compose logs -f

.PHONY: postrgres
postgres: ## Open a postgresql client in database container
	docker-compose exec db bash -c "psql -U statle statle"

.PHONY: api-shell
api-shell: ## Open a bash shell in API container
	docker-compose exec api bash

.PHONY: api-migration-generate
api-migration-generate: ## Generate a TypeORM migration. Syntax: make api-migration-generate MIGRATION_NAME=TheMigrationName
	docker-compose exec api npm run typeorm migration:generate -- -d typeorm-config.ts migrations/$(MIGRATION_NAME)

.PHONY: api-migration-run
api-migration-run: ## Run TypeORM migrations
	docker-compose exec api npm run typeorm migration:run -- -d typeorm-config.ts