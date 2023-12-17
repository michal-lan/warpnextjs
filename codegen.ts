import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema:
        process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL ??
        'http://localhost/graphql',
    documents: ['src/**/*.graphql'],
    generates: {
        './src/__generated__/graphql.tsx': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
        },
        './schema.graphql.json': {
            plugins: ['introspection'],
        },
    },
    ignoreNoDocuments: true,
    overwrite: true,
}

export default config
