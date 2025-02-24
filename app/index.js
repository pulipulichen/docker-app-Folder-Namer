// const ShellSpawn = require('./lib/ShellSpawn')
const ShellExec = require('./lib/ShellExec')
const GetExistedArgv = require('./lib/GetExistedArgv')

const path = require('path')
const fs = require('fs')

const isNamedFolder = require('./folder-namer/isNamedFolder')
const getFiles = require('./folder-namer/getFiles')
const findMiddleFile = require('./folder-namer/findMiddleFile')
const extractFileLocation = require('./folder-namer/extractFileLocation')

const getFolderContext = require('./folder-namer/getFolderContext')
const askDify = require('./folder-namer/askDify')

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
      // console.log(files)

      // =================================================================

      let middleFile = await findMiddleFile(files)
      if (middleFile) {
        middleFile = path.join(directoryPath, middleFile)
      }
      console.log(`Middle file: ${middleFile}`)

      // =================================================================

      let locationInfo = await extractFileLocation(middleFile)
      // console.log(locationInfo)

      // =================================================================

      let folderContext = getFolderContext(files)
      // console.log(folderContext)

      // =================================================================

      let contextList = []
      if (locationInfo) {
        contextList.push(`地理位置資訊：
${JSON.stringify(locationInfo, null, 2)}`)
      }

      if (folderContext && folderContext.length > 0) {
        contextList.push(`資料夾內的檔案列表：
${folderContext}`)
      }

      let contextString = contextList.join('\n\n')
      console.log({contextString})

      // =================================================================



      let askResult = await askDify(middleFile, contextString)
      console.log(`Ask Dify result: ${askResult}`)
      // await askDify()

      if (askResult && askResult.length > 5) {
        fs.renameSync(directoryPath, directoryPath + ' ' + askResult)
      }

      // =================================================================
    } catch (err) {
        console.error("Error:", err);
    }
  }
}

main()