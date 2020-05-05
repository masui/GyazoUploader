.PHONY: build

build:
	npm run build

cleanbuild: clean install build

clean:
	-/bin/rm -r -f build
	-/bin/rm -r -f node_modules
	-/bin/rm *~

install:
	npm install

run:
	npm run start

upload:
	scp build/GyazoUploader-1.0.0.dmg pitecan.com:/www/www.pitecan.com/

