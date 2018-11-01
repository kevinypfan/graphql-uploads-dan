import { createWriteStream } from 'fs'
import { resolve } from 'path'
import { sync } from 'mkdirp'
import { generate } from 'shortid'

const uploadDir = resolve(__dirname, '../uploads')

// Ensure upload directory exists
sync(uploadDir)

const storeUpload = async ({ stream, filename, path }) => {
    if (!path) return false
    sync(path)
    const id = generate()
    const file = `${id}-${filename}`
    const filePath = `${path}/${file}`

    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(filePath))
            .on('finish', () => resolve({ id, filePath }))
            .on('error', reject),
    )
}

export async function processUpload(path, file) {
    const { stream, filename, mimetype, encoding } = await file
    const { id, filePath } = await storeUpload({ stream, filename, path })
    return { id, filename, mimetype, encoding, path: filePath, timestamp: Date.now() }
}