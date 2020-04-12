<img src="./images/p5snap.png" height="70px"/>

<a href="https://github.com/zachkrall/p5snap/issues/"><img src="https://img.shields.io/github/issues/zachkrall/p5snap.svg" height="20px"/></a>
<a href="https://github.com/zachkrall/p5snap/pulls"><img src="https://img.shields.io/github/issues-pr/zachkrall/p5snap"/></a>
<a href="https://github.com/zachkrall/p5snap/commits"><img src="https://img.shields.io/github/last-commit/zachkrall/p5snap.svg" height="20px"/></a>
<br/>
<a href="https://npmjs.com/package/p5snap/"><img src="https://img.shields.io/npm/dy/p5snap"/></a>
<a href="https://github.com/zachkrall/p5snap/graphs/contributors"><img src="https://img.shields.io/github/contributors/zachkrall/p5snap"></a>
<a href="http://newschool.edu"><img src="https://img.shields.io/badge/made%20at-The%20New%20School-E82E21.svg" height="20px"/></a>

## about

**p5snap** is a command-line interface that creates and saves snapshots of a p5 sketch

## installation

with `npm`:

```shell
npm -g install p5snap
```

## usage

to start p5snap, provide a relative file path and the number of images that should be saved

```shell
p5snap <FILE-PATH> -n <NUMBER-OF-IMAGES>
```

for example:

```shell
p5snap ./mySketch.js -n 20
```

will create:<br/>
  • mySketch_0.png<br/>
  • mySketch_1.png<br/>
  • mySketch_2.png<br/>
  • ...<br/>
  • mySketch_19.png

![Example](./images/example.png)

### instance mode

if your sketch is written as a p5 instance, you can use the `--instance` flag to execute **p5snap** in instance mode

instance mode does not require `new p5()`

[view example code for instance mode sketches](./examples/instance.js)

## limitations

**p5snap** currently only saves a single `<canvas/>` context. If your p5 drawing uses or draws DOM elements, it will not be included in the image.

## contributing

Contributions, issues and feature requests are welcome.<br/>Feel free to check [issues](https://github.com/zachkrall/p5snap/issues/) page if you want to contribute.

Check the <a href="https://github.com/zachkrall/p5snap/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22"><img src="https://img.shields.io/github/labels/zachkrall/p5snap/help%20wanted"/></a> tag for suggestions on features to work on.

<img src="https://avatars3.githubusercontent.com/u/2532937?v=4" width="20" height="20"/> <a href="https://github.com/zachkrall">zachkrall</a> (23)<br/>

## license

Copyright © 2020 [Zach Krall](https://zachkrall.com).<br/>This project is [MIT](https://github.com/zachkrall/p5snap/blob/master/LICENSE) licensed.



_Last Updated: Sun, 12 Apr 2020 20:14:49 GMT_
