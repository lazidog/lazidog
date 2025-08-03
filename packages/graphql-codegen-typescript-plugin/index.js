// https://zenn.dev/babel/articles/graphql-typing-for-babel

const { TsVisitor, plugin } = require("@graphql-codegen/typescript");

const FieldDefinition = TsVisitor.prototype.FieldDefinition;

Object.assign(exports, {
  TsVisitor,
  plugin: (...args) => {
    TsVisitor.prototype.FieldDefinition = function (...args) {
      /** @type {import('graphql').FieldDefinitionNode} */
      const node = args[0];
      // prevent the generation of TypeScript types for those fields has @customResolver directive
      if (node.directives?.some((d) => d.name === "customResolver")) {
        return "";
      }
      // the original FieldDefinition method (stored above) is called
      return FieldDefinition.apply(this, args);
    };
    const ret = plugin(...args); //  invoke the default GraphQL codegen plugin. The custom FieldDefinition method will be used during this process.
    TsVisitor.prototype.FieldDefinition = FieldDefinition; // restore to original implement
    return ret;
  },
});
