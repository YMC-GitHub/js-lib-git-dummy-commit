![GitHub commit activity](https://img.shields.io/github/commit-activity/m/ymc-github/js-lib-git-dummy-commit.svg?color=ff69b4&logo=Github&logoColor=ff69b4&style=popout-square)
![GitHub followers](https://img.shields.io/github/followers/ymc-github.svg?label=github%20followers&color=ff69b4&logo=Github&logoColor=ff69b4&style=popout-square)
![GitHub language count](https://img.shields.io/github/languages/count/ymc-github/js-lib-git-dummy-commit.svg?label=languages&color=ff69b4&logo=Github&logoColor=ff69b4&style=popout-square)
![GitHub language top](https://img.shields.io/github/languages/top/ymc-github/js-lib-git-dummy-commit.svg?color=ff69b4&logo=Github&logoColor=ff69b4&style=popout-square)
![GitHub last commit (branch)](https://img.shields.io/github/last-commit/ymc-github/js-lib-git-dummy-commit/master.svg?label=github%20last%20commit%40master&color=ff69b4&logo=Github&logoColor=ff69b4&style=popout-square)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/ymc-github/js-lib-git-dummy-commit/master.svg?label=github%20package.json%20version%40master&color=ff69b4&logo=Github&logoColor=ff69b4&style=popout-square)
![GitHub repo size](https://img.shields.io/github/repo-size/ymc-github/js-lib-git-dummy-commit.svg?label=github%20repo%20size&color=ff69b4&logo=Github&logoColor=ff69b4&style=popout-square)
![Gitter](https://img.shields.io/gitter/room/ymc-github/js-lib-git-dummy-commit.svg?label=chat&color=ff69b4&logo=Github&logoColor=ff69b4&style=popout-square)
![Travis (.com) branch](https://img.shields.io/travis/com/ymc-github/js-lib-git-dummy-commit/master.svg?label=Travis%20CI&color=ff69b4&logo=Travis%20CI&logoColor=ff69b4&style=popout-square)
![Twitter Follow](https://img.shields.io/twitter/follow/yemiancheng.svg?label=follow%20%40yemiancheng&color=ff69b4&logo=Twitter&logoColor=ff69b4&style=popout-square)

# git-test-commit

## desc

create a dummy commit for testing

## how to use for production?

### install

```sh
#npm install git-test-commit --save-dev
npm install https://github.com/YMC-GitHub/js-lib-git-test-commit.git --save-dev
```

### usage

```sh
const gitDummyCommit = require('git-test-commit');

gitDummyCommit('unicorns');
//=> created a commit with message "unicorns"
```



## how to use for developer?

### install

```sh
#npm install git-test-commit --save-dev
npm install https://github.com/YMC-GitHub/js-lib-git-test-commit.git --save-dev
```

### config

01.set the dir to save the source code ? [config](./config/dir.map.config.js#L3-#L3)

02.set the dir to save the build ouput code by rollup ? [config](./config/dir.map.config.js#L7-#L7)

03.set the lib name ? [config](./build/rollup.bas.config.js#L10-#L10)

04.set the banner start year ? [config](./build/rollup.bas.config.js#L14-#L14)


05.set npm package 's main,module,unpkg key?

```js
{
  //...
  "main": "lib/git-test-commit.common.js",
  "module": "lib/git-test-commit.esm.js",
  "unpkg": "lib/git-test-commit.min.js",
   //...
}
```

...

### usage

```sh
#dev
npm run dev

#build
npm run build

#release
npm run release

#lint
npm run lint
npm run lint:no-fix

#format
npm run beautify

#test
npm run test
npm run test:unit
npm run test:coverage

#changelog
npm run changelog
```
## Author

yemiancheng <ymc.github@gmail.com>

## License

MIT
