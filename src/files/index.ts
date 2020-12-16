import { resolve } from 'path'
import { readFileSync } from 'fs'

export const fileContent = (relativePath: string): string =>
    readFileSync(
        resolve(process.cwd(), relativePath)
    ).toString()
