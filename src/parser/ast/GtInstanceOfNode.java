// ***************************************************************************
// Copyright (c) 2013, JST/CREST DEOS project authors. All rights reserved.
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

package parser.ast;


import parser.GtGenerator;
import parser.GtParserContext;
import parser.GtToken;
import parser.GtType;
import parser.deps.LibGreenTea;

//E.g., $ExprNode instanceof TypeInfo
final public class GtInstanceOfNode extends GtNode {
	/*field*/public GtNode   ExprNode;
	/*field*/public GtType	 TypeInfo;
	public GtInstanceOfNode/*constructor*/(GtType Type, GtToken Token, GtNode ExprNode, GtType TypeInfo) {
		super(Type, Token);
		this.ExprNode = ExprNode;
		this.TypeInfo = TypeInfo;
		this.SetChild(ExprNode);
	}
	@Override public void Accept(GtGenerator Visitor) {
		Visitor.VisitInstanceOfNode(this);
	}
	@Override public Object ToConstValue(GtParserContext Context, boolean EnforceConst)  {
		/*local*/Object Value = this.ExprNode.ToConstValue(Context, EnforceConst) ;
		if(Value != null) {
			return LibGreenTea.DynamicInstanceOf(Value, this.TypeInfo);
		}
		return Value;
	}
}