const utils = require("@graphql-tools/utils");
const { plugin } = require("@graphql-codegen/typescript-resolvers");

Object.assign(exports, {
  plugin: (...args) => {
    // Customize which fields are included when generating TypeScript resolvers for the schema
    const newSchema = utils.filterSchema({
      schema: args[0],
      fieldFilter: (typeName, fieldName, config) => {
        if (typeName === "Query" || typeName === "Mutation") {
          return true;
        }
        return config.astNode.directives.some(
          (d) => d.name.value === "customResolver",
        );
      },
    });
    args[0] = newSchema;
    const ret = plugin(...args);
    return ret;
  },
});
