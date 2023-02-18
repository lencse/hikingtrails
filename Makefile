.PHONY: dev test depcheck format-code check-code-format verify

BIN=node_modules/.bin
NEXT=$(BIN)/next
PRETTIER=$(BIN)/prettier

default: out

node_modules: package.json yarn.lock
	yarn --frozen-lockfile
	touch node_modules

out: node_modules src
	$(BIN)/next build
	$(BIN)/next export

format-code: node_modules
	$(PRETTIER) --write .

check-code-format: node_modules
	$(PRETTIER) --check .
	$(NEXT) lint

depcheck: node_modules
	$(BIN)/depcheck

verify: depcheck check-code-format
