.PHONY: dev test watch_test depcheck

BIN=node_modules/.bin
NEXT=$(BIN)/next

default: out

node_modules: package.json yarn.lock
	yarn
	touch node_modules

out: node_modules src
	$(BIN)/next build
	$(BIN)/next export
