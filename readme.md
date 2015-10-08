# iBooks Remote

> A menubar app that let's you use your Apple Remote Control (white and aluminium) to flip pages in iBooks.

*Built with Node Electron*

## How does it work?

The Apple Remote (white or aluminium version) first needs to be [paired](https://support.apple.com/kb/PH19087) with your mac. Once paired you may launch the iBooks Remote application and access it via the menubar. You will see a Menubar Item that will let you connect and take control of all IR input from the remote. You will also be able to release control of the remote so you may use it for its default purpose (iTunes, QuickTime, etc).

## Why?

I created this because I use my Apple Remote quite a bit. I didn't want to use the [Remote App](https://itunes.apple.com/us/app/remote/id284417350?mt=8) on my iPhone/iPad just to read books on my macbook's large external display.

## Notes
- I use the "dark" menubar so you may have to export some inverted icons if you use the standard menubar.

## Launch on startup

Follow this [guide](https://github.com/sindresorhus/guides/blob/master/launch-app-on-startup-osx.md) if you would like the app to launch when you start your computer.


## Dev

```
$ npm install
$ npm run rebuild-packages
```

### Run

```
$ npm start
```

### Build

```
$ npm run build
```


## License

MIT © [Bryan Berger](http://bryanberger.com)
