const genUniqueFileName = require('unique-filename')

const { writeFile } = require('fs')

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
function postUpload (req, res) {
  if (!req.file || !req.body.key) { res.send('theres no key/file'); return }
  if (!require('../data/key.json').keys.includes(req.body.key)) { res.send('key not exist'); return }

  const dest = req.app.get('dest')
  const uniqueFileName = genUniqueFileName(dest)

  writeFile(uniqueFileName, req.file.buffer, (err) => {
    if (err) {
      console.log(err)
      res.send(`Sorry, an error occurred ${'Back'.anchor('/')}`)
    }
  })

  res.send(`
  <script>
    window.location.href = '/'
    alert('file path: /upload/${uniqueFileName}')
  </script>
  `)
}

module.exports = postUpload
