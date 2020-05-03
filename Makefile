build_all:
	npm run build

clean:
	-/bin/rm -r -f build
	-/bin/rm -r -f node_modules
	-/bin/rm *~

install:
	npm install

run:
	npm run start

