'use strict';
var path = require('path');
var fixPath = require('fix-path');
var app = require('app');
var dialog = require('dialog');
var Tray = require('tray');
var Menu = require('menu');
var MenuItem = require('menu-item');

var applescript = require('applescript');
var remote = require('node-apple-remote');
remote.close(); // release the remote on startup by default

var tray;
var menu;
var isConnected = false;

var template = [
  {label: 'iBook Remote', enabled: false},
  {type: 'separator'},
  {label: 'Connect Remote', click: toggle},
  {type: 'separator'},
  {label: 'Quit', click: app.quit},
];

require('crash-reporter').start();
app.dock.hide();

// fix the $PATH on OS X
fixPath();

function createTrayMenu() {
  menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  tray.setContextMenu(menu);

  return menu;
}

function toggle() {
  if(!isConnected) {
    connect();
  } else {
    disconnect();
  }
}

/* hack to allow updating of MenuItem Labels.
https://github.com/atom/electron/issues/528 */
function updateMenu() {
  if(!isConnected){
    template[2].label = 'Release Remote';
  } else {
    template[2].label = 'Connect Remote';
  }

  createTrayMenu();
}

function connect() {

  try {
    remote._register();
    remote
      .on('left', onLeft)
      .on('right', onRight);

    activateIBooks();
    updateMenu();
    isConnected = true;

  } catch (e) {
    // an exception is thrown if the apple remote
    // device was not found on the system
    console.log('no remote found', e);
  }
}

function disconnect() {
  updateMenu();
  isConnected = false;

  remote.close();
}

function onLeft() {
  var script = 'tell application "System Events" to keystroke (ASCII character 28)';

  applescript.execString(script, function(err, rtn) {
    if (err) {
      console.log('error sending left keystroke.')
    }
  });
}

function onRight() {
  var script = 'tell application "System Events" to keystroke (ASCII character 29)';

  applescript.execString(script, function(err, rtn) {
    if (err) {
      console.log('error sending right keystroke.')
    }
  });
}

function activateIBooks() {
  var script = 'activate application "iBooks"';

  applescript.execString(script, function(err, rtn) {
    if (err) {
      console.log('error activating iBooks.');
    }
  });
}

app.on('will-quit', function() {
  remote.close();
});

app.on('ready', function () {
  tray = new Tray(path.join(__dirname, '/menubar-icon.png'));
  tray.setPressedImage(path.join(__dirname, 'menubar-icon-alt.png'));

  createTrayMenu();
});
