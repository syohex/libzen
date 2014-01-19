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

import java.util.ArrayList;

import zen.deps.Constructor;
import zen.deps.Field;
import zen.lang.ZenType;
import zen.parser.ZenNameSpace;
import zen.parser.ZenVisitor;

final public class ZenClassDeclNode extends ZenNode {
	@Field public String ClassName;
	@Field public ZenType ClassType;
	@Field public ZenType SuperType;
	@Field public ZenNameSpace NameSpace;
	@Field public ArrayList<ZenFieldNode>  FieldList;
	@Constructor public ZenClassDeclNode(ZenNameSpace NameSpace) {
		super();
		this.NameSpace = NameSpace.GetRootNameSpace();
		this.ClassName = null;
		this.ClassType = null;
		this.SuperType = null;
		this.FieldList = new ArrayList<ZenFieldNode>();
	}

	@Override public void Append(ZenNode Node) {
		if(Node instanceof ZenFieldNode) {
			this.FieldList.add((ZenFieldNode)this.SetChild(Node));
		}
		else if(Node instanceof ZenTypeNode) {
			this.SuperType = Node.Type;
		}
		else if(this.ClassName == null) {
			this.ClassName = Node.SourceToken.ParsedText;
			this.SourceToken = Node.SourceToken;
			this.ClassType = this.NameSpace.GetType(this.ClassName, this.SourceToken);
		}
	}
	@Override public void Accept(ZenVisitor Visitor) {
		Visitor.VisitClassDeclNode(this);
	}

}