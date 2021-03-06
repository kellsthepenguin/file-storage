const { join } = require('path')
const { readFileSync } = require('fs')

/**
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
async function getUpload (req, res) {
  try {
    const dest = req.app.get('dest')
    const path = join(dest, req.params.name)
    const file = readFileSync(path)

    res.end(file)
  } catch (_) {
    res.status(404)
      .send('file not exist')
  }
}

module.exports = getUpload
