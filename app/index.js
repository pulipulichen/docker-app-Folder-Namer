// const ShellSpawn = require('./lib/ShellSpawn')
const ShellExec = require('./lib/ShellExec')
const GetExistedArgv = require('./lib/GetExistedArgv')

const path = require('path')
const fs = require('fs')

const getFiles = require('./folder-namer/getFiles')

// -------------------------------------------------------------


let main = async function () {
  
  let files = GetExistedArgv()
  for (let i = 0; i < files.length; i++) {
    let directoryPath = files[i]
    const stats = fs.statSync(directoryPath);
    if (stats.isDirectory(directoryPath) === false) {
      // directoryPath = path.dirname(directoryPath)
      continue
    }

    // =====================

    try {
      const files = await getFiles(directoryPath);
      console.log(`Found ${files.length} files`);
      console.log(files)
    } catch (err) {
        console.error("Error:", err);
    }
  }
}

main()