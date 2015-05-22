.PHONY: template font clean gulpreplace deps
CURRENTHASH := $(shell git --no-pager log --pretty=format:%h -n 1)

# build the static site
make: | clean template gulpreplace font
	cp favicon.ico dist

# template the static page
template:
	mkdir -p dist
	php selfhosted.php > dist/index.html

font-download:
	@echo Downloading fonts
	@./node_modules/fontello-cli/bin/fontello-cli --config fontello- fontello.json --css fontello/css --font fontello/font install

# place fonts in dist
font:
	@echo Placing fonts
	@mkdir -p dist/font
	@mkdir -p dist/css
	@cp fontello-*/css/* dist/css
	@cp fontello-*/font/* dist/font

# clean dist
clean:
	rm -rf dist

# run gulp
gulpreplace:
	gulp index

# install all dependencies
deps:
	bower install
	npm install
	composer install

# start php dev server
serve:
	@php -S 127.0.0.1:8080

# Sends the documentation to gh-pages.
deploy: make
	cd dist && \
	git init . && \
	git add . && \
	git commit -m "Deploy of ${CURRENTHASH}"; \
	git push "git@github.com:victorhaggqvist/selfhosted.git" master:gh-pages --force && \
	rm -rf .git
