.PHONY: dev test watch_test depcheck

BIN=node_modules/.bin
NEXT=$(BIN)/next

default: out

node_modules: package.json yarn.lock
	yarn --frozen-lockfile
	touch node_modules

out: node_modules src
	$(BIN)/next build
	$(BIN)/next export

.tmp/deploy.tgz: out
	mkdir -p .tmp
	yarn --frozen-lockfile --production
	tar --exclude='.git' --exclude='.tmp' -zvcf .tmp/deploy.tgz .
