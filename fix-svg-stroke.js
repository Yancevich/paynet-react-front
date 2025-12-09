import fs from 'fs'
import path from 'path'

const svgDir = './src/assets/sidebar-logos'

fs.readdir(svgDir, (err, files) => {
  if (err) {
    console.error('Reading error:', err)
    return
  }

  files
    .filter((file) => file.endsWith('.svg'))
    .forEach((file) => {
      const filePath = path.join(svgDir, file)
      let content = fs.readFileSync(filePath, 'utf8')

      const newContent = content.replace(
        /stroke="(.*?)"/g,
        `stroke="currentColor"`
      )

      fs.writeFileSync(filePath, newContent, 'utf8')

      console.log(`✔ Updated: ${file}`)
    })
})
