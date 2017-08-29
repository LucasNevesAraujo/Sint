/**
 * Node visitor is a walker for the abstract sysntax tree.
 */
export default class NodeVisitor
{
    /**
     * Visit all nodes of a tree.
     * @param {AST} [node] - The tree or node.
     * @return {*} The result of visiting all nodes.
     */
    visit(node)
    {
        let methodName;
        let visitor;

        if (node)
        {
            methodName = `visit${node.constructor.displayName}`;
            visitor = this[methodName];
        }

        if (!visitor)
        {
            throw new Error(`No ${methodName} method`);
        }

        return visitor.call(this, node);
    }
}
