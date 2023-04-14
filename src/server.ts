import { readFileSync } from 'fs'
import JSmart from 'jsmart'
import { join, resolve } from 'path'

type Options = {
    templateDir: string,
}
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
    }: Options) => {


    return {
        name: 'smarty-server-plugin',
        config(config: any) {
            const port = config.define.VITE_PLUGIN_SMARTY_SERVER_PORT || 2222
            const getTemplate = (name: string) => {
                return readFileSync(resolve(process.cwd(), templateDir, name), {encoding: 'utf-8'})
            }
            JSmart.prototype.getTemplate = getTemplate
            app.post('/', async ({body: {file, data = {}}}, res) => {
                try {
                    const tpl = getTemplate(file)
                    const compiledTemplate = new JSmart(tpl)
                    const output = await compiledTemplate.fetch(data)
                    res.send(output)
                } catch (e) {
                    res.json({
                        error: (e as any).message,
                        input: {file, data}
                    })
                }
            })

            app.listen(port)
        }
    }
}
