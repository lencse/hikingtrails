import { parseString } from 'xml2js'

export const xml2json = (xml: string): Promise<any> => new Promise((resolve, reject) => {
    parseString(xml, (err, json) => {
        if (err) {
            reject(err)
        } else {
            resolve(json)
        }
    })
})
