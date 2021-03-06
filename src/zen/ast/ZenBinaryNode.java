// ***************************************************************************
// Copyright (c) 2013-2014, Konoha project authors. All rights reserved.
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// *  Redistributions of source code must retain the above copyright notice,
//    this list of conditions and the following disclaimer.
// *  Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// **************************************************************************

package zen.ast;

import zen.deps.Field;
import zen.deps.Var;
import zen.parser.ZenNameSpace;
import zen.parser.ZenSyntaxPattern;
import zen.parser.ZenToken;
import zen.parser.ZenTokenContext;
import zen.parser.ZenVisitor;

public class ZenBinaryNode extends ZenNode {
	@Field public ZenNode   LeftNode;
	@Field public ZenNode	 RightNode;
	@Field public ZenSyntaxPattern Pattern;
	public ZenBinaryNode/*constructor*/(ZenToken SourceToken, ZenNode Left, ZenSyntaxPattern Pattern) {
		super();
		this.SourceToken = SourceToken;
		this.LeftNode  = this.SetChild(Left);
		this.RightNode = null;
		assert(Pattern != null);
		this.Pattern = Pattern;
	}

	@Override public final void Append(ZenNode Node) {
		this.RightNode = this.SetChild(Node);
	}

	private boolean IsRightJoin(ZenNode Node) {
		if(Node instanceof ZenBinaryNode) {
			return this.Pattern.IsRightJoin(((ZenBinaryNode)Node).Pattern);
		}
		return false;
	}

	private ZenNode RightJoin(ZenNameSpace NameSpace, ZenBinaryNode RightNode) {
		@Var ZenNode RightLeftNode = RightNode.LeftNode;
		//		if(RightLeftNode instanceof ZenBinaryNode && this.Pattern.IsRightJoin(((ZenBinaryNode)RightLeftNode).Pattern)) {
		if(this.IsRightJoin(RightLeftNode)) {
			RightNode.LeftNode = this.RightJoin(NameSpace, (ZenBinaryNode) RightLeftNode);
		}
		else {
			RightNode.LeftNode = RightNode.SetChild(this);
			this.Append(RightLeftNode);
		}
		return RightNode;
	}

	public final ZenNode AppendParsedRightNode(ZenNameSpace NameSpace, ZenTokenContext TokenContext) {

		@Var ZenNode RightNode = TokenContext.ParsePattern(NameSpace, "$Expression$", ZenTokenContext.Required);
		if(RightNode.IsErrorNode()) {
			return RightNode;
		}
		if(this.IsRightJoin(RightNode)) {
			return this.RightJoin(NameSpace, (ZenBinaryNode) RightNode);
		}
		// LeftJoin
		this.Append(RightNode);
		return this;
	}

	@Override public void Accept(ZenVisitor Visitor) {
		Visitor.VisitBinaryNode(this);
	}
}