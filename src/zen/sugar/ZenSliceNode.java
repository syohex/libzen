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

package zen.sugar;

import zen.ast.ZenNode;
import zen.deps.Field;
import zen.lang.ZenType;
import zen.parser.ZenToken;

//E.g., $Expr "[" $Index ":" $Index2 "]"
final public class ZenSliceNode extends ZenSymbolNode {
	@Field public ZenNode RecvNode;
	@Field public ZenNode Index1;
	@Field public ZenNode Index2;
	public ZenSliceNode/*constructor*/(ZenType Type, ZenToken Token, ZenNode RecvNode, ZenNode Index1, ZenNode Index2) {
		super(Type, Token, "");
		this.RecvNode = RecvNode;
		this.Index1 = Index1;
		this.Index2 = Index2;
		//		this.SetChild3(RecvNode, Index1, Index2);
	}
	//	@Override public boolean Accept(ZenVisitor Visitor) {
	//		Visitor.VisitSliceNode(this);
	//	}
}