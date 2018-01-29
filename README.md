# quark
Backend http web server for Electron applications

```javascript
  const quark = require('electron-quark');
```

## Usage
Create a quark server in your electron main process

```javascript
  quark({
    port: 9999,
    dir: __dirname,
    description: main
  });
```

The quark server will serve static files from the directory specified.
You can load them into a broswer window by using the `quark.url()` method.

```javascript
  let mainWindow
  
  function create() {
    mainWindow = new BrowserWindow({ width: 600, height: 400});
    
    mainWindow.loadURL(quark.url('index.html'));
  }
```
