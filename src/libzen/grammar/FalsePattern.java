package libzen.grammar;

import zen.ast.ZBooleanNode;
import zen.ast.ZNode;
import zen.deps.ZMatchFunction;
import zen.parser.ZTokenContext;

public class FalsePattern extends ZMatchFunction {

	@Override public ZNode Invoke(ZNode ParentNode, ZTokenContext TokenContext, ZNode LeftNode) {
		return new ZBooleanNode(ParentNode, TokenContext.GetToken(ZTokenContext.MoveNext), false);
	}

}
