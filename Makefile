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

deploy:
	git checkout --orphan deploy
	git add .
	git commit -m "Deployment for commit $(GITHUB_SHA)"
	git push origin deploy --force
