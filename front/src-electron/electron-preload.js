// example which injects window.myAPI.doAThing() into the renderer
// thread (/src/*)

const {
  contextBridge
} = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
