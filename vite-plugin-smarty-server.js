// import { resolve } from 'path';
// import Smarty from 'smarty4Js';

// var s = new Smarty({
//     'left_delimiter': '{', // default
//     'right_delimiter': '}', // default
//     'isAmd': false,
//     'isCmd': false,
//     'globalVar': '_smartyTpl' // window._smartyTpl is jsTpl object
// });
//
// s.setBasedir(resolve('./public'));
// var html = s.render('./public/components/foo.tpl', {name: 'smarty4Js'});
// console.log(html);


import { readFileSync } from 'fs'
import JSmart from 'jsmart'
import { join, resolve } from 'path'

// const templateFolder = join(process.cwd(), 'public/components')
//
//
//
// console.log({ tpl, output })

// type Options = {
//     templateDir: string
//     server?: {
//         port?: number
//     }
// }
const defaultOptions/*: Required<Options>*/ = {
    templateDir: join(process.cwd(), 'public/components'),
    server: {
        port: 2222,
    }
}
import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
export const smartyServerPlugin = ({
    templateDir,
    server,
}/*: Options*/) => {
    const port = server?.port||defaultOptions.server.port
    const getTemplate = (name/*: string*/) => {
        return readFileSync(resolve(process.cwd(), templateDir, name), {encoding: 'utf-8'})
    }
    JSmart.prototype.getTemplate = getTemplate
    app.post('/', async ({body: {template, data = {}}}, res) => {
        try {
            const tpl = getTemplate(template)
            const compiledTemplate = new JSmart(tpl)
            const output = await compiledTemplate.fetch(data)
            res.send(output)
        } catch (e) {
            res.json({
                error: e.message,
                input: {template, data}
            })
        }
    })

    app.listen(port, () => {
        console.log(`Smarty server: http://localhost:${port}`)
    })


    return {
        name: 'smarty-server-plugin',
    }
}
