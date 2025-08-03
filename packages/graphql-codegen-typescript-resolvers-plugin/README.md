# Graphql codegen typescript resolvers plugin

This plugin modifies the behavior of the TypeScript resolvers generation to include only fields with the @customResolver directive.
It filters the schema to include only those fields, allowing for more control over which resolvers are generated.
The plugin uses the `filterSchema` utility from `@graphql-tools/utils` to apply this filtering based on the directives present in the schema's AST nodes.
