
build: components *.js *.css
	@component build --dev

components: component.json
	@component install --dev

watch:
	@component build --dev -w

doc:
	@component build --dev -c
	@rm -fr .gh-pages
	@mkdir .gh-pages
	@mv build .gh-pages/
	@cp index.html .gh-pages/index.html
	@ghp-import .gh-pages -n -p
	@rm -fr .gh-pages
	@component build --dev

clean:
	rm -fr build components template.js

.PHONY: clean test
