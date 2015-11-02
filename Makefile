dev:
	@gulp

watch:
	@component build --dev -w

doc:
	@ghp-import example -n -p

clean:
	rm -fr build components template.js

.PHONY: clean test dev
