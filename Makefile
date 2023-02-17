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
	tar --exclude='.git' --exclude='.tmp' -zcf .tmp/deploy.tgz .

.current-deployment-url.txt:
	curl -v \
		-H "Accept: application/vnd.github+json" \
		-H "Authorization: Bearer $(GH_TOKEN)" \
		-H "X-GitHub-Api-Version: 2022-11-28" \
		https://api.github.com/repos/lencse/hikingtrails/actions/artifacts \
	| ./get-current-deployment-url \
	> .current-deployment-url.txt

