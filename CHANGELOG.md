## <small>4.0.1 (2021-09-01)</small>

* chore(deps-dev): bump @readme/eslint-config from 6.0.0 to 6.1.0 (#157) ([df79698](https://github.com/readmeio/oas-normalize/commit/df79698)), closes [#157](https://github.com/readmeio/oas-normalize/issues/157)
* chore(deps-dev): bump nock from 13.1.2 to 13.1.3 (#156) ([3ac7fc9](https://github.com/readmeio/oas-normalize/commit/3ac7fc9)), closes [#156](https://github.com/readmeio/oas-normalize/issues/156)
* chore(deps-dev): removing conventional-changelog-cli in favor of npx ([7c28a12](https://github.com/readmeio/oas-normalize/commit/7c28a12))
* ci: ignoring node-fetch after v3 because its now an esm package ([3ea35aa](https://github.com/readmeio/oas-normalize/commit/3ea35aa))



## 4.0.0 (2021-08-26)

> 🚨 &nbsp;**Breaking change!**
>
> `.validate()` will no longer dereference schemas. If you need to dereference before or after validating, you shoudl use the `.deref()` method instead.

* fix: stop dereferencing when running spec validation (#153) ([7b706db](https://github.com/readmeio/oas-normalize/commit/7b706db)), closes [#153](https://github.com/readmeio/oas-normalize/issues/153)
* docs: adding a pull request template ([16da316](https://github.com/readmeio/oas-normalize/commit/16da316))
* docs: make docs more OpenAPI friendly (#152) ([68cfc34](https://github.com/readmeio/oas-normalize/commit/68cfc34)), closes [#152](https://github.com/readmeio/oas-normalize/issues/152)



## <small>3.0.5 (2021-08-20)</small>

* chore: running npm audit ([6dc30cf](https://github.com/readmeio/oas-normalize/commit/6dc30cf))
* chore(deps-dev): bump nock from 13.1.1 to 13.1.2 (#150) ([dba5e40](https://github.com/readmeio/oas-normalize/commit/dba5e40)), closes [#150](https://github.com/readmeio/oas-normalize/issues/150)
* chore(deps): bump actions/setup-node from 2.3.0 to 2.4.0 (#149) ([b43483c](https://github.com/readmeio/oas-normalize/commit/b43483c)), closes [#149](https://github.com/readmeio/oas-normalize/issues/149)
* chore(deps): bump swagger-parser from 10.0.2 to 10.0.3 (#151) ([d046bbd](https://github.com/readmeio/oas-normalize/commit/d046bbd)), closes [#151](https://github.com/readmeio/oas-normalize/issues/151)



## <small>3.0.4 (2021-08-02)</small>

* chore(deps): bump actions/setup-node from 2.2.0 to 2.3.0 (#147) ([7b66274](https://github.com/readmeio/oas-normalize/commit/7b66274)), closes [#147](https://github.com/readmeio/oas-normalize/issues/147)
* chore(deps): bumping deps ([61c9c09](https://github.com/readmeio/oas-normalize/commit/61c9c09))
* docs: some minor updates to the readme ([b75fe43](https://github.com/readmeio/oas-normalize/commit/b75fe43))



## <small>3.0.3 (2021-07-06)</small>

* build(deps-dev): bump eslint from 7.25.0 to 7.29.0 (#139) ([cbc7d8e](https://github.com/readmeio/oas-normalize/commit/cbc7d8e)), closes [#139](https://github.com/readmeio/oas-normalize/issues/139)
* build(deps-dev): bump jest from 27.0.4 to 27.0.6 (#140) ([e09a863](https://github.com/readmeio/oas-normalize/commit/e09a863)), closes [#140](https://github.com/readmeio/oas-normalize/issues/140)
* build(deps-dev): bump prettier from 2.3.0 to 2.3.2 (#137) ([3b609f5](https://github.com/readmeio/oas-normalize/commit/3b609f5)), closes [#137](https://github.com/readmeio/oas-normalize/issues/137)
* build(deps): bump @apidevtools/json-schema-ref-parser (#138) ([83d8bf4](https://github.com/readmeio/oas-normalize/commit/83d8bf4)), closes [#138](https://github.com/readmeio/oas-normalize/issues/138)
* build(deps): bump js-yaml from 3.13.1 to 4.1.0 (#136) ([6d6c459](https://github.com/readmeio/oas-normalize/commit/6d6c459)), closes [#136](https://github.com/readmeio/oas-normalize/issues/136)
* build(deps): bump swagger2openapi from 7.0.6 to 7.0.7 (#141) ([a8ad128](https://github.com/readmeio/oas-normalize/commit/a8ad128)), closes [#141](https://github.com/readmeio/oas-normalize/issues/141)
* chore(deps): bump actions/setup-node from 2.1.5 to 2.2.0 (#142) ([78e0c25](https://github.com/readmeio/oas-normalize/commit/78e0c25)), closes [#142](https://github.com/readmeio/oas-normalize/issues/142)



## <small>3.0.2 (2021-06-09)</small>

* fix: swapping out `yaml` for `js-yaml` because it can handle quirky indents ([fe66cfa](https://github.com/readmeio/oas-normalize/commit/fe66cfa))



## <small>3.0.1 (2021-06-07)</small>

* fix: `validate` will now reject the promise on validation errors ([3a2a0da](https://github.com/readmeio/oas-normalize/commit/3a2a0da))
* docs: fixing a typo in the readme ([f538aff](https://github.com/readmeio/oas-normalize/commit/f538aff))



## 3.0.0 (2021-06-03)

> 🚨 &nbsp;**Breaking change!**
>
> `oas-normalize` has been fully rewritten to be promise-based, and no longer supports callbacks. If you have an existing implementation of this library you'll need to rewrite it to support `await`ing the promises returned.

* chore(deps-dev): upgrading @readme/eslint-config from 3.1.0 to 5.1.0 ([af4874b](https://github.com/readmeio/oas-normalize/commit/af4874b)),  ([e0e8d09](https://github.com/readmeio/oas-normalize/commit/e0e8d09)), ([c211bc9](https://github.com/readmeio/oas-normalize/commit/c211bc9)), ([ab29f15](https://github.com/readmeio/oas-normalize/commit/ab29f15)), ([5732ed1](https://github.com/readmeio/oas-normalize/commit/5732ed1)), ([3917699](https://github.com/readmeio/oas-normalize/commit/3917699)), ([1dcd5c7](https://github.com/readmeio/oas-normalize/commit/1dcd5c7))
* chore(deps): bump actions/checkout from 1 to 2.3.4 (#133) ([49fd5ae](https://github.com/readmeio/oas-normalize/commit/49fd5ae)), closes [#133](https://github.com/readmeio/oas-normalize/issues/133)
* chore(deps): bump actions/setup-node from 1 to 2.1.5 (#132) ([e1b3aa0](https://github.com/readmeio/oas-normalize/commit/e1b3aa0)), closes [#132](https://github.com/readmeio/oas-normalize/issues/132)
* chore(deps): running `npm audit fix` ([184591b](https://github.com/readmeio/oas-normalize/commit/184591b))
* build(deps-dev): bump eslint from 7.8.0 to 7.25.0 ([f674f21](https://github.com/readmeio/oas-normalize/commit/f674f21)), ([efeb5f6](https://github.com/readmeio/oas-normalize/commit/efeb5f6)), ([a0f80bd](https://github.com/readmeio/oas-normalize/commit/a0f80bd)), ([aed9be1](https://github.com/readmeio/oas-normalize/commit/aed9be1)), ([731cac8](https://github.com/readmeio/oas-normalize/commit/731cac8))
* build(deps-dev): bump jest from 26.4.2 to 27.0.4  ([a58609e](https://github.com/readmeio/oas-normalize/commit/a58609e)), ([ec0404d](https://github.com/readmeio/oas-normalize/commit/ec0404d)), ([eb19bce](https://github.com/readmeio/oas-normalize/commit/eb19bce))
* build(deps-dev): bump prettier from 2.1.1 to 2.3.0 ([8106028](https://github.com/readmeio/oas-normalize/commit/8106028)), ([044af3c](https://github.com/readmeio/oas-normalize/commit/044af3c)), ([798d229](https://github.com/readmeio/oas-normalize/commit/798d229))
* build(deps): bump handlebars from 4.7.6 to 4.7.7 (#122) ([b9af22c](https://github.com/readmeio/oas-normalize/commit/b9af22c)), closes [#122](https://github.com/readmeio/oas-normalize/issues/122)
* build(deps): bump hosted-git-info from 2.8.5 to 2.8.9 (#124) ([6fa9181](https://github.com/readmeio/oas-normalize/commit/6fa9181)), closes [#124](https://github.com/readmeio/oas-normalize/issues/124)
* build(deps): bump lodash from 4.17.19 to 4.17.21 (#123) ([f65ac71](https://github.com/readmeio/oas-normalize/commit/f65ac71)), closes [#123](https://github.com/readmeio/oas-normalize/issues/123)
* build(deps): bump node-notifier from 8.0.0 to 8.0.1 (#107) ([f1ea9ef](https://github.com/readmeio/oas-normalize/commit/f1ea9ef)), closes [#107](https://github.com/readmeio/oas-normalize/issues/107)
* build(deps): bump swagger-parser from 10.0.1 to 10.0.2 (#92) ([db45a42](https://github.com/readmeio/oas-normalize/commit/db45a42)), closes [#92](https://github.com/readmeio/oas-normalize/issues/92)
* build(deps): bump ws from 7.4.0 to 7.4.6 (#125) ([e884b1d](https://github.com/readmeio/oas-normalize/commit/e884b1d)), closes [#125](https://github.com/readmeio/oas-normalize/issues/125)
* feat: promises rewrite and drop support for node 10 (#131) ([5f1f5f5](https://github.com/readmeio/oas-normalize/commit/5f1f5f5)), closes [#131](https://github.com/readmeio/oas-normalize/issues/131)



## <small>2.3.1 (2020-09-11)</small>

* build(deps-dev): bump @readme/eslint-config from 3.4.0 to 3.4.2 (#86) ([6615b5b](https://github.com/readmeio/oas-normalize/commit/6615b5b)), closes [#86](https://github.com/readmeio/oas-normalize/issues/86)
* build(deps-dev): bump conventional-changelog-cli from 2.0.34 to 2.1.0 (#83) ([6b5afbb](https://github.com/readmeio/oas-normalize/commit/6b5afbb)), closes [#83](https://github.com/readmeio/oas-normalize/issues/83)
* build(deps-dev): bump eslint from 7.6.0 to 7.8.0 (#88) ([9e03439](https://github.com/readmeio/oas-normalize/commit/9e03439)), closes [#88](https://github.com/readmeio/oas-normalize/issues/88)
* build(deps-dev): bump jest from 26.2.2 to 26.4.2 (#85) ([ad371bf](https://github.com/readmeio/oas-normalize/commit/ad371bf)), closes [#85](https://github.com/readmeio/oas-normalize/issues/85)
* build(deps-dev): bump prettier from 2.0.5 to 2.1.1 (#84) ([ce88131](https://github.com/readmeio/oas-normalize/commit/ce88131)), closes [#84](https://github.com/readmeio/oas-normalize/issues/84)
* build(deps): bump node-fetch from 2.1.2 to 2.6.1 (#89) ([8e05e60](https://github.com/readmeio/oas-normalize/commit/8e05e60)), closes [#89](https://github.com/readmeio/oas-normalize/issues/89)



## 2.3.0 (2020-08-03)

* build(deps-dev): bump @readme/eslint-config from 3.3.2 to 3.4.0 (#81) ([e36adc6](https://github.com/readmeio/oas-normalize/commit/e36adc6)), closes [#81](https://github.com/readmeio/oas-normalize/issues/81)
* build(deps-dev): bump eslint from 7.3.1 to 7.6.0 (#77) ([90c9908](https://github.com/readmeio/oas-normalize/commit/90c9908)), closes [#77](https://github.com/readmeio/oas-normalize/issues/77)
* build(deps-dev): bump jest from 26.1.0 to 26.2.2 (#79) ([a63e73c](https://github.com/readmeio/oas-normalize/commit/a63e73c)), closes [#79](https://github.com/readmeio/oas-normalize/issues/79)
* build(deps): bump @apidevtools/json-schema-ref-parser (#78) ([b9832ab](https://github.com/readmeio/oas-normalize/commit/b9832ab)), closes [#78](https://github.com/readmeio/oas-normalize/issues/78)
* build(deps): bump swagger-parser from 9.0.1 to 10.0.1 (#82) ([9f821a3](https://github.com/readmeio/oas-normalize/commit/9f821a3)), closes [#82](https://github.com/readmeio/oas-normalize/issues/82)



## <small>2.2.2 (2020-07-20)</small>

* build(deps-dev): bump @readme/eslint-config from 3.1.0 to 3.1.3 (#68) ([3cce9b6](https://github.com/readmeio/oas-normalize/commit/3cce9b6)), closes [#68](https://github.com/readmeio/oas-normalize/issues/68)
* build(deps-dev): bump @readme/eslint-config from 3.1.3 to 3.2.0 (#70) ([d9f5e5a](https://github.com/readmeio/oas-normalize/commit/d9f5e5a)), closes [#70](https://github.com/readmeio/oas-normalize/issues/70)
* build(deps-dev): bump @readme/eslint-config from 3.2.0 to 3.2.1 (#72) ([352dfd5](https://github.com/readmeio/oas-normalize/commit/352dfd5)), closes [#72](https://github.com/readmeio/oas-normalize/issues/72)
* build(deps-dev): bump @readme/eslint-config from 3.2.1 to 3.3.2 (#74) ([205a8e4](https://github.com/readmeio/oas-normalize/commit/205a8e4)), closes [#74](https://github.com/readmeio/oas-normalize/issues/74)
* build(deps-dev): bump eslint from 7.1.0 to 7.2.0 (#69) ([b2030e9](https://github.com/readmeio/oas-normalize/commit/b2030e9)), closes [#69](https://github.com/readmeio/oas-normalize/issues/69)
* build(deps-dev): bump eslint from 7.2.0 to 7.3.1 (#73) ([25c9a35](https://github.com/readmeio/oas-normalize/commit/25c9a35)), closes [#73](https://github.com/readmeio/oas-normalize/issues/73)
* build(deps-dev): bump jest from 26.0.1 to 26.1.0 (#75) ([951cce6](https://github.com/readmeio/oas-normalize/commit/951cce6)), closes [#75](https://github.com/readmeio/oas-normalize/issues/75)
* build(deps): bump lodash from 4.17.15 to 4.17.19 (#76) ([4afbc32](https://github.com/readmeio/oas-normalize/commit/4afbc32)), closes [#76](https://github.com/readmeio/oas-normalize/issues/76)
* ci: create Dependabot config file (#65) ([40b5a3a](https://github.com/readmeio/oas-normalize/commit/40b5a3a)), closes [#65](https://github.com/readmeio/oas-normalize/issues/65)
* ci: run tests against node 14 (#66) ([e1de3da](https://github.com/readmeio/oas-normalize/commit/e1de3da)), closes [#66](https://github.com/readmeio/oas-normalize/issues/66)
* ci: upping the frequency of dependabot to monthly ([469d2ec](https://github.com/readmeio/oas-normalize/commit/469d2ec))



## <small>2.2.1 (2020-06-03)</small>

* chore(deps): [Security] Bump minimist from 1.2.0 to 1.2.5 (#64) ([784ba61](https://github.com/readmeio/oas-normalize/commit/784ba61)), closes [#64](https://github.com/readmeio/oas-normalize/issues/64)



## 2.2.0 (2020-05-28)

* chore(deps-dev): Bump @readme/eslint-config from 2.0.4 to 2.0.6 (#60) ([103f1c3](https://github.com/readmeio/oas-normalize/commit/103f1c3)), closes [#60](https://github.com/readmeio/oas-normalize/issues/60)
* chore(deps-dev): Bump @readme/eslint-config from 2.0.6 to 2.2.0 (#63) ([4a9c96c](https://github.com/readmeio/oas-normalize/commit/4a9c96c)), closes [#63](https://github.com/readmeio/oas-normalize/issues/63)
* chore(deps-dev): Bump conventional-changelog-cli from 2.0.31 to 2.0.34 (#62) ([301148c](https://github.com/readmeio/oas-normalize/commit/301148c)), closes [#62](https://github.com/readmeio/oas-normalize/issues/62)
* chore(deps-dev): Bump jest from 25.4.0 to 25.5.4 (#59) ([95c46e7](https://github.com/readmeio/oas-normalize/commit/95c46e7)), closes [#59](https://github.com/readmeio/oas-normalize/issues/59)
* chore(deps-dev): Bump jest from 25.5.4 to 26.0.1 (#61) ([2a8de9a](https://github.com/readmeio/oas-normalize/commit/2a8de9a)), closes [#61](https://github.com/readmeio/oas-normalize/issues/61)
* chore(deps-dev): upgrading our eslint deps to their latest release ([b2c477c](https://github.com/readmeio/oas-normalize/commit/b2c477c))
* chore(deps): swapping `yamljs` for `yaml` ([03e4163](https://github.com/readmeio/oas-normalize/commit/03e4163))
* chore(deps): upgrading json-schema-ref-parser to the latest release ([8a0ed5b](https://github.com/readmeio/oas-normalize/commit/8a0ed5b))



## 2.1.0 (2020-04-27)

* chore(deps-dev): Bump @readme/eslint-config from 1.15.0 to 2.0.0 (#42) ([533fb78](https://github.com/readmeio/oas-normalize/commit/533fb78)), closes [#42](https://github.com/readmeio/oas-normalize/issues/42)
* chore(deps-dev): Bump @readme/eslint-config from 2.0.0 to 2.0.2 (#46) ([c16aa49](https://github.com/readmeio/oas-normalize/commit/c16aa49)), closes [#46](https://github.com/readmeio/oas-normalize/issues/46)
* chore(deps-dev): Bump @readme/eslint-config from 2.0.2 to 2.0.3 (#51) ([447214f](https://github.com/readmeio/oas-normalize/commit/447214f)), closes [#51](https://github.com/readmeio/oas-normalize/issues/51)
* chore(deps-dev): Bump @readme/eslint-config from 2.0.3 to 2.0.4 (#56) ([e644a3d](https://github.com/readmeio/oas-normalize/commit/e644a3d)), closes [#56](https://github.com/readmeio/oas-normalize/issues/56)
* chore(deps-dev): Bump jest from 25.1.0 to 25.2.4 (#45) ([956a379](https://github.com/readmeio/oas-normalize/commit/956a379)), closes [#45](https://github.com/readmeio/oas-normalize/issues/45)
* chore(deps-dev): Bump jest from 25.2.4 to 25.2.7 (#49) ([b2fb35f](https://github.com/readmeio/oas-normalize/commit/b2fb35f)), closes [#49](https://github.com/readmeio/oas-normalize/issues/49)
* chore(deps-dev): Bump jest from 25.2.7 to 25.3.0 (#53) ([0beb774](https://github.com/readmeio/oas-normalize/commit/0beb774)), closes [#53](https://github.com/readmeio/oas-normalize/issues/53)
* chore(deps-dev): Bump jest from 25.3.0 to 25.4.0 (#54) ([e61c714](https://github.com/readmeio/oas-normalize/commit/e61c714)), closes [#54](https://github.com/readmeio/oas-normalize/issues/54)
* chore(deps-dev): Bump prettier from 2.0.1 to 2.0.2 (#44) ([46a248a](https://github.com/readmeio/oas-normalize/commit/46a248a)), closes [#44](https://github.com/readmeio/oas-normalize/issues/44)
* chore(deps-dev): Bump prettier from 2.0.2 to 2.0.3 (#48) ([87cf0ca](https://github.com/readmeio/oas-normalize/commit/87cf0ca)), closes [#48](https://github.com/readmeio/oas-normalize/issues/48)
* chore(deps-dev): Bump prettier from 2.0.3 to 2.0.4 (#52) ([e7c0585](https://github.com/readmeio/oas-normalize/commit/e7c0585)), closes [#52](https://github.com/readmeio/oas-normalize/issues/52)
* chore(deps-dev): Bump prettier from 2.0.4 to 2.0.5 (#58) ([b5f0a9e](https://github.com/readmeio/oas-normalize/commit/b5f0a9e)), closes [#58](https://github.com/readmeio/oas-normalize/issues/58)
* chore(deps): Bump json-schema-ref-parser from 8.0.0 to 9.0.1 (#57) ([3f52981](https://github.com/readmeio/oas-normalize/commit/3f52981)), closes [#57](https://github.com/readmeio/oas-normalize/issues/57)



## <small>2.0.2 (2020-03-16)</small>

* chore: adding .github/ and coverage/ into npmignore ([c71f9c3](https://github.com/readmeio/oas-normalize/commit/c71f9c3))



## <small>2.0.1 (2020-03-16)</small>

* chore(deps-dev): Bump @readme/eslint-config from 1.13.0 to 1.14.0 (#35) ([aa9cb49](https://github.com/readmeio/oas-normalize/commit/aa9cb49)), closes [#35](https://github.com/readmeio/oas-normalize/issues/35)
* chore(deps-dev): Bump @readme/eslint-config from 1.14.0 to 1.15.0 (#39) ([e4573ee](https://github.com/readmeio/oas-normalize/commit/e4573ee)), closes [#39](https://github.com/readmeio/oas-normalize/issues/39)
* chore(deps): [Security] Bump acorn from 6.4.0 to 6.4.1 (#38) ([a883229](https://github.com/readmeio/oas-normalize/commit/a883229)), closes [#38](https://github.com/readmeio/oas-normalize/issues/38)
* chore(deps): Bump json-schema-ref-parser from 7.1.3 to 8.0.0 (#40) ([07cf44f](https://github.com/readmeio/oas-normalize/commit/07cf44f)), closes [#40](https://github.com/readmeio/oas-normalize/issues/40)
* chore(deps): Bump swagger-parser from 8.0.4 to 9.0.1 (#41) ([34e4d95](https://github.com/readmeio/oas-normalize/commit/34e4d95)), closes [#41](https://github.com/readmeio/oas-normalize/issues/41)
* style: run eslint before running prettier ([b6523a0](https://github.com/readmeio/oas-normalize/commit/b6523a0))



## 2.0.0 (2020-02-24)

* chore(deps-dev): Bump @readme/eslint-config from 1.10.0 to 1.11.0 (#30) ([df0d87e](https://github.com/readmeio/oas-normalize/commit/df0d87e)), closes [#30](https://github.com/readmeio/oas-normalize/issues/30)
* chore(deps-dev): Bump @readme/eslint-config from 1.11.0 to 1.12.0 (#31) ([1063157](https://github.com/readmeio/oas-normalize/commit/1063157)), closes [#31](https://github.com/readmeio/oas-normalize/issues/31)
* chore(deps-dev): Bump @readme/eslint-config from 1.12.0 to 1.13.0 (#34) ([7b08207](https://github.com/readmeio/oas-normalize/commit/7b08207)), closes [#34](https://github.com/readmeio/oas-normalize/issues/34)
* chore(deps-dev): Bump @readme/eslint-config from 1.9.0 to 1.9.1 (#26) ([70aa3d4](https://github.com/readmeio/oas-normalize/commit/70aa3d4)), closes [#26](https://github.com/readmeio/oas-normalize/issues/26)
* chore(deps-dev): Bump @readme/eslint-config from 1.9.1 to 1.10.0 (#28) ([612f72b](https://github.com/readmeio/oas-normalize/commit/612f72b)), closes [#28](https://github.com/readmeio/oas-normalize/issues/28)
* chore(deps-dev): Bump jest from 24.9.0 to 25.1.0 (#29) ([9fa5c1c](https://github.com/readmeio/oas-normalize/commit/9fa5c1c)), closes [#29](https://github.com/readmeio/oas-normalize/issues/29)
* feat: dropping support for node 8 (#33) ([a49dffc](https://github.com/readmeio/oas-normalize/commit/a49dffc)), closes [#33](https://github.com/readmeio/oas-normalize/issues/33)



## 1.0.0 (2020-01-06)

* build: 1.0.0 release ([fb3187e](https://github.com/readmeio/oas-normalize/commit/fb3187e))
* security: upgrading mem and js-yaml (#25) ([8166e2c](https://github.com/readmeio/oas-normalize/commit/8166e2c)), closes [#25](https://github.com/readmeio/oas-normalize/issues/25)
* chore(deps-dev): Bump @readme/eslint-config from 1.8.1 to 1.9.0 (#23) ([960cfeb](https://github.com/readmeio/oas-normalize/commit/960cfeb)), closes [#23](https://github.com/readmeio/oas-normalize/issues/23)
* chore(deps): Bump json-schema-ref-parser from 5.0.3 to 7.1.3 (#24) ([eff7626](https://github.com/readmeio/oas-normalize/commit/eff7626)), closes [#24](https://github.com/readmeio/oas-normalize/issues/24)
* chore(deps): Bump swagger-parser from 8.0.3 to 8.0.4 (#22) ([0b9bc84](https://github.com/readmeio/oas-normalize/commit/0b9bc84)), closes [#22](https://github.com/readmeio/oas-normalize/issues/22)



## <small>0.1.1 (2019-12-30)</small>

* build: 0.1.1 release ([b08c51b](https://github.com/readmeio/oas-normalize/commit/b08c51b))
* chore: Bump @readme/eslint-config from 1.5.1 to 1.6.1 (#16) ([4e1bf0b](https://github.com/readmeio/oas-normalize/commit/4e1bf0b)), closes [#16](https://github.com/readmeio/oas-normalize/issues/16)
* chore: Bump @readme/eslint-config from 1.6.1 to 1.7.0 (#17) ([e5b85bd](https://github.com/readmeio/oas-normalize/commit/e5b85bd)), closes [#17](https://github.com/readmeio/oas-normalize/issues/17)
* chore: Bump @readme/eslint-config from 1.7.0 to 1.8.0 (#18) ([3d9bb73](https://github.com/readmeio/oas-normalize/commit/3d9bb73)), closes [#18](https://github.com/readmeio/oas-normalize/issues/18)
* chore: Bump eslint from 6.7.1 to 6.7.2 (#14) ([9886994](https://github.com/readmeio/oas-normalize/commit/9886994)), closes [#14](https://github.com/readmeio/oas-normalize/issues/14)
* chore: Bump eslint-plugin-jest from 23.0.4 to 23.1.1 (#15) ([a19582b](https://github.com/readmeio/oas-normalize/commit/a19582b)), closes [#15](https://github.com/readmeio/oas-normalize/issues/15)
* chore(deps-dev): [Security] Bump handlebars from 4.2.0 to 4.5.3 (#21) ([f2fc972](https://github.com/readmeio/oas-normalize/commit/f2fc972)), closes [#21](https://github.com/readmeio/oas-normalize/issues/21)
* chore(dev-deps): Bump @readme/eslint-config from 1.8.0 to 1.8.1 (#19) ([6245ad7](https://github.com/readmeio/oas-normalize/commit/6245ad7)), closes [#19](https://github.com/readmeio/oas-normalize/issues/19)
* chore(dev-deps): Bump eslint from 6.7.2 to 6.8.0 (#20) ([21823ab](https://github.com/readmeio/oas-normalize/commit/21823ab)), closes [#20](https://github.com/readmeio/oas-normalize/issues/20)



## 0.1.0 (2019-11-25)

* chore: Adopting @readme/eslint-config (#13) ([5593e2d](https://github.com/readmeio/oas-normalize/commit/5593e2d)), closes [#13](https://github.com/readmeio/oas-normalize/issues/13)
* chore: Bump eslint from 6.5.1 to 6.7.1 (#12) ([b449c46](https://github.com/readmeio/oas-normalize/commit/b449c46)), closes [#12](https://github.com/readmeio/oas-normalize/issues/12)
* chore: Bump swagger-parser from 8.0.2 to 8.0.3 (#10) ([65ec609](https://github.com/readmeio/oas-normalize/commit/65ec609)), closes [#10](https://github.com/readmeio/oas-normalize/issues/10)
* chore: release 0.1.0 ([d503b6d](https://github.com/readmeio/oas-normalize/commit/d503b6d))
* feat: github action for running ci tests ([27682ca](https://github.com/readmeio/oas-normalize/commit/27682ca))



## <small>0.0.6 (2019-10-14)</small>

* 0.0.6 ([41a685d](https://github.com/readmeio/oas-normalize/commit/41a685d))
* Bump eslint from 6.5.0 to 6.5.1 (#7) ([5bbd15a](https://github.com/readmeio/oas-normalize/commit/5bbd15a)), closes [#7](https://github.com/readmeio/oas-normalize/issues/7)
* deps: Bump swagger-parser from 4.1.0 to 8.0.2 (#8) ([d2c11ec](https://github.com/readmeio/oas-normalize/commit/d2c11ec)), closes [#8](https://github.com/readmeio/oas-normalize/issues/8)



## <small>0.0.5 (2019-09-30)</small>

* 0.0.5 ([d1312c1](https://github.com/readmeio/oas-normalize/commit/d1312c1))
* Bump eslint from 6.4.0 to 6.5.0 (#6) ([4fa1b19](https://github.com/readmeio/oas-normalize/commit/4fa1b19)), closes [#6](https://github.com/readmeio/oas-normalize/issues/6)
* feat: Adding unit tests (#5) ([95adcaa](https://github.com/readmeio/oas-normalize/commit/95adcaa)), closes [#5](https://github.com/readmeio/oas-normalize/issues/5)



## <small>0.0.4 (2019-09-13)</small>

* 0.0.4 ([126138c](https://github.com/readmeio/oas-normalize/commit/126138c))
* bump ([1fafc72](https://github.com/readmeio/oas-normalize/commit/1fafc72))
* Initial commit ([14db2d9](https://github.com/readmeio/oas-normalize/commit/14db2d9))
* Licensing under MIT and adding Github details to the package file. ([30dff9b](https://github.com/readmeio/oas-normalize/commit/30dff9b))
* Remove speccy ([1bc97d5](https://github.com/readmeio/oas-normalize/commit/1bc97d5))
* Update ReadMe ([41c8ac3](https://github.com/readmeio/oas-normalize/commit/41c8ac3))
* Update readme file ([0f64d3e](https://github.com/readmeio/oas-normalize/commit/0f64d3e))
* Use real URL ([cd1e627](https://github.com/readmeio/oas-normalize/commit/cd1e627))



