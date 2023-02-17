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

.tmp:
	mkdir -p .tmp

#.tmp/deploy.tgz: out .tmp

.tmp/deploy.tgz: .tmp
	mkdir -p .tmp
	yarn --frozen-lockfile --production
	tar --exclude='.git' --exclude='.tmp' -zcf .tmp/deploy.tgz .

.tmp/artifact-data.json: .tmp
	curl \
		-H "Accept: application/vnd.github+json" \
		-H "Authorization: Bearer $(GH_TOKEN)" \
		-H "X-GitHub-Api-Version: 2022-11-28" \
		https://api.github.com/repos/lencse/hikingtrails/actions/artifacts \
	> .tmp/artifact-data.json

.current-deployment-url.txt: .tmp/artifact-data.json
	cat .tmp/artifact-data.json | ./get-current-deployment-url > .current-deployment-url.txt