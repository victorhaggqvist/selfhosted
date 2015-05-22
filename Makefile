.PHONY: template font clean gulpreplace deps
CURRENTHASH := $(shell git --no-pager log --pretty=format:%h -n 1)

make: | clean template gulpreplace font
	cp favicon.ico dist

template:
	mkdir -p dist
	php selfhosted.php > dist/index.html

font-download:
	@echo Downloading fonts
	@./node_modules/fontello-cli/bin/fontello-cli --config fontello- fontello.json --css fontello/css --font fontello/font install

font:
	@echo Placing fonts
	@mkdir -p dist/font
	@mkdir -p dist/css
	@cp fontello-*/css/* dist/css
	@cp fontello-*/font/* dist/font

clean:
	rm -rf dist

gulpreplace:
	gulp index

deps:
	bower install
	npm install
	composer install

serve:
	@php -S 127.0.0.1:8080

deploy:
	cd dist && \
	git init . && \
	git add . && \
	git commit -m "Deploy of ${CURRENTHASH}"; \
	git push "git@github.com:victorhaggqvist/selfhosted.git" master:gh-pages --force && \
	rm -rf .git

hash:
	@echo "hash ${CURRENTHASH}"
