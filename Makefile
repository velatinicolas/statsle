.PHONY: help
help: ## Display Makefile available commands
	@sed -nr 's/^([a-z]*): ## (.*)$$/\1\t\t\2/p' Makefile | sort

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
postgres: ## open a postgresql client in database container
	docker-compose exec db bash -c "psql -U statle"
