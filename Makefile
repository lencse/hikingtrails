.PHONY: dev watch test lint test_ts test test_compiled coveralls
.PHONY: lint_fix watch_test verify compile clean watch_ts watch_data

VENDOR=node_modules
BIN=$(VENDOR)/.bin

default: build _data/data.json functions out

out:
	$(BIN)/next build
	$(BIN)/next export

dist: build src ejs-templates _data/data.json
	$(BIN)/webpack

clean:
	rm -rf dist build functions .tmp _includes/analytics.html out

$(VENDOR): package.json yarn.lock
	yarn && touch node_modules

build: src $(VENDOR)
	make compile

_data/data.json: build
	node bin/write-data.js

watch: $(VENDOR)
	make build && ( \
		$(BIN)/next dev & \
		make watch_ts \
	)

watch_data:
	make watch_ts & $(BIN)/nodemon bin/write-data.js

verify: lint test

watch_ts: $(VENDOR)
	$(BIN)/tsc -p . --outDir ./build --watch --pretty

lint: $(VENDOR)
	$(BIN)/tslint -c tslint.json -p .

lint_fix: $(VENDOR)
	$(BIN)/tslint -c tslint.json --fix -p .

dev: lint_fix verify

compile: src node_modules
	$(BIN)/tsc -p . --outDir ./build

functions: build _data/data.json download.js
	rm -rf .tmp
	mkdir -p .tmp/functions/download
	cp -r build .tmp/functions/download
	cp -r _data .tmp/functions/download
	cp download.js .tmp/functions/download
	mkdir -p .tmp/functions/map
	cp -r build .tmp/functions/map
	cp -r _data .tmp/functions/map
	cp -r ejs-templates .tmp/functions/map
	cp map.js .tmp/functions/map
	mkdir -p .tmp/functions/planner
	cp -r build .tmp/functions/planner
	cp -r _data .tmp/functions/planner
	cp -r ejs-templates .tmp/functions/planner
	cp planner.js .tmp/functions/planner
	mkdir -p .tmp/functions/download-map
	cp -r build .tmp/functions/download-map
	cp -r _data .tmp/functions/download-map
	cp -r ejs-templates .tmp/functions/download-map
	cp download-map.js .tmp/functions/download-map
	node build-functions.js

test_ts: $(VENDOR)
	$(BIN)/jest --verbose

test: test_ts test_compiled

watch_test: $(VENDOR)
	$(BIN)/jest --config jest.config.dev.js --watch

test_compiled: build $(VENDOR)
	$(BIN)/jest --config jest.config.compiled.js

coveralls:
	$(BIN)/coveralls < logs/jest/lcov.info
