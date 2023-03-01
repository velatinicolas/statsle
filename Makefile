### COMMON

.PHONY: help
help: ## Display Makefile available commands
	@sed -nr 's/^([a-z\-]*):.*## (.*)$$/\1;\2/p' Makefile | column -t -s ';'

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

.PHONY: deploy-all
deploy-all: api-deploy front-deploy ## Deploy Front and API

### DB

.PHONY: postgres
postgres: ## Open a postgresql client in database container
	docker-compose exec db bash -c "psql -U statle statle"

### API

.PHONY: api-shell
api-shell: ## Open a bash shell in API container
	docker-compose exec api bash

.PHONY: api-format
api-format: ## Run lint and prettier on API
	docker-compose exec api npm run lint
	docker-compose exec api npm run prettier

.PHONY: api-migration-generate
api-migration-generate: ## Generate a TypeORM migration. Syntax: make api-migration-generate MIGRATION_NAME=TheMigrationName
	docker-compose exec api npm run typeorm migration:generate -- -d typeorm-config.ts migrations/$(MIGRATION_NAME)

.PHONY: api-migration-run
api-migration-run: ## Run TypeORM migrations
	docker-compose exec api npm run typeorm migration:run -- -d typeorm-config.ts

.PHONY: api-generate-jwt-key
api-generate-jwt-key: ## Generate a JWT key
	openssl rand -base64 32

.PHONY: api-generate-encryption-key
api-generate-encryption-key: ## Generate an encryption key
	openssl rand -base64 32 | cut -c1-32

.PHONY: front-build
api-build: ## Build project, specifies npm folder to bypass a right access bug
	docker-compose exec api bash -c "npm run build"
	cp api/.env.prod api/dist/.env
	cp api/package*.json api/dist/

.PHONY: api-deploy
api-deploy: ## Deploy API in production
	./scripts/deploy-api.sh

.PHONY: api-update-version
api-update-version: ## Update version in package-lock.json according to package.json
	docker-compose exec api npm install --package-lock-only

### FRONT

.PHONY: front-shell
front-shell: ## Open a bash shell in Front container
	docker-compose exec front bash

.PHONY: front-format
front-format: ## Run lint and prettier on API
	docker-compose exec front npm run lint

.PHONY: front-build
front-build: ## Build project, specifies npm folder to bypass a right access bug
	docker-compose exec front bash -c "export npm_config_cache=/usr/npm_cache && npm run type-check && npm run build-only -- --mode prod"

.PHONY: front-deploy
front-deploy: ## Deploy front in production
	./scripts/deploy-front.sh

.PHONY: front-update-version
front-update-version: ## Update version in package-lock.json according to package.json
	docker-compose exec front npm install --package-lock-only