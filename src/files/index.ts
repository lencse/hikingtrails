import { resolve } from 'path'
import { promises } from 'fs'

export async function fileContent(relativePath: string): Promise<string> {
    return promises.readFile(resolve(process.cwd(), relativePath)).then(buff => buff.toString())
}