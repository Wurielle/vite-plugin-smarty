import { include } from './core'

export const component = (file: string, params: any = {}) =>  {
    const {data = {}, mounted, ...rest} = params
    return ({
        data() {
            return {
                html: '',
                ...(typeof data === 'function' ? data() : data),
            }
        },
        async mounted() {
            this.html = await include(file, this.$data)
            mounted?.()
        },
        template: '<div v-html="html" />',
        ...rest,
    })
}

export * from './core'
