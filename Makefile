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


.tmp/deploy.tgz: out .tmp
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

.tmp/deploy.zip: .tmp .tmp/artifact-data.json .workflow-run-id
	wget \
		--header="Accept: application/vnd.github+json" \
		--header="Authorization: Bearer $(GH_TOKEN)" \
		--header="X-GitHub-Api-Version: 2022-11-28" \
		-O .tmp/deploy.zip \
		`./get-current-deployment-url`

.deploy: .tmp/deploy.zip
	mkdir -p .deploy
	tar -xzf .tmp/deploy.zip -C .tmp
	tar -xzf .tmp/deploy.tgz -C .deploy

deploy: .workflow-run-id
	git checkout --orphan deploy
	git add .
	git commit -m "Deployment for workflow $(WORKFLOW_RUN_ID)"
	git push origin deploy --force

.workflow-run-id:
	echo $(WORKFLOW_RUN_ID) > .workflow-run-id