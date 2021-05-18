.PHONY: dev test watch_test depcheck

BIN=node_modules/.bin

default: out

node_modules: package.json yarn.lock
	yarn && touch node_modules

out: node_modules src public/data/data.json
	$(BIN)/next build
	$(BIN)/next export

watch_ts: node_modules src
	$(BIN)/tsc -p . --outDir ./build --pretty --watch --preserveWatchOutput

dev: node_modules src
	$(BIN)/concurrently \
		-n next,ts \
		"$(BIN)/next dev" \
		"make watch_ts"

build: node_modules src
	$(BIN)/tsc -p . --outDir ./build --pretty

public/data/data.json: build
	bin/write-data.js

test: node_modules src
	$(BIN)/jest

test_compiled: node_modules src
	$(BIN)/jest -c jest.compiled.config.js

coveralls: logs/jest/lcov.info
	$(BIN)/coveralls < logs/jest/lcov.info

watch_test: node_modules src
	$(BIN)/jest -c jest.compiled.config.js --watch

depcheck: node_modules
	$(BIN)/depcheck --ignores="autoprefixer,netlify-cli,postcss,tailwindcss,@types/jest,concurrently,coveralls,depcheck,nodemon"
