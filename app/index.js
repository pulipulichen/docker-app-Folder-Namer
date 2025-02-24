// const ShellSpawn = require('./lib/ShellSpawn')
const ShellExec = require('./lib/ShellExec')
const GetExistedArgv = require('./lib/GetExistedArgv')

const path = require('path')
const fs = require('fs')

const isNamedFolder = require('./folder-namer/isNamedFolder')
const getFiles = require('./folder-namer/getFiles')
const findMiddleFile = require('./folder-namer/findMiddleFile')

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

    if (isNamedFolder(directoryPath)) {
      continue
    }
    
    // console.log(directoryPath)

    try {
      const files = await getFiles(directoryPath);
      console.log(`Found ${files.length} files`);
      console.log(files)

      let middleFile = await findMiddleFile(files)
      if (middleFile) {
        middleFile = path.join(directoryPath, middleFile)
      }
      console.log(`Found ${middleFile}`)
    } catch (err) {
        console.error("Error:", err);
    }
  }
}

main()