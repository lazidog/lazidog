# Graphql codegen typescript plugin

This plugin modifies the TypeScript generation process to skip fields with the @customResolver directive.
It overrides the FieldDefinition method of the TsVisitor class to check for this directive and return an empty string if it is present.
This effectively prevents the generation of TypeScript types for those fields, allowing for more control over the generated types.
