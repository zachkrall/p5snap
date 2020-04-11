<img src="./p5snap.png" height="70px"/></div>

## about

<span style="color:#ED225D">**p5snap**</span> is a command-line interface that creates and saves snapshots of a p5 sketch

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
p5snap ./mySketch.js -n 5
```

will create:<br/>
• mySketch_0.png<br/>
• mySketch_1.png<br/>
• mySketch_2.png<br/>
• mySketch_3.png<br/>
• mySketch_4.png<br/>
• mySketch_0.png

### instance mode

if your sketch is written as a p5 instance, you can use the `--instance` flag to execute <span style="color:#ED225D">**p5snap**</span> in instance mode

## limitations

<span style="color:#ED225D">**p5snap**</span> currently only saves a single `<canvas/>` context. If your p5 drawing uses or draws DOM elements, it will not be included in the image.

## contributing
Contributions, issues and feature requests are welcome.<br/>Feel free to check [issues](https://github.com/zachkrall/p5snap/issues/) page if you want to contribute.

## license
Copyright © 2020 [Zach Krall](https://zachkrall.com)<br/>This project is [MIT](https://github.com/zachkrall/p5snap/blob/master/LICENSE) licensed.
