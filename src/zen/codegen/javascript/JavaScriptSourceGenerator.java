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

//ifdef JAVA
package zen.codegen.javascript;

import javax.script.Compilable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import zen.ast.ZenBlockNode;
import zen.ast.ZenCastNode;
import zen.ast.ZenCatchNode;
import zen.ast.ZenFuncDeclNode;
import zen.ast.ZenFunctionLiteralNode;
import zen.ast.ZenInstanceOfNode;
import zen.ast.ZenParamNode;
import zen.ast.ZenReturnNode;
import zen.ast.ZenThrowNode;
import zen.ast.ZenTryNode;
import zen.ast.ZenVarDeclNode;
import zen.ast.ZenNode;
import zen.lang.ZenSystem;
import zen.parser.ZenSourceGenerator;

public class JavaScriptSourceGenerator extends ZenSourceGenerator {

	private final ScriptEngineManager EngineManager;
	private final ScriptEngine Engine;

	public JavaScriptSourceGenerator() {
		super("JavaScript", "1.8");
		this.LineFeed = "\n";
		this.Tab = "\t";
		this.LineComment = "//"; // if not, set null
		this.BeginComment = null; //"'''";
		this.EndComment = null; //"'''";
		this.Camma = ", ";
		this.SemiColon = ";";

		this.TrueLiteral = "true";
		this.FalseLiteral = "false";
		this.NullLiteral = "null";
		this.TopType = "Object";
		this.SetNativeType(ZenSystem.BooleanType, "Boolean");
		this.SetNativeType(ZenSystem.IntType, "Number");
		this.SetNativeType(ZenSystem.FloatType, "Number");
		this.SetNativeType(ZenSystem.StringType, "String");

		this.EngineManager = new ScriptEngineManager();
		this.Engine = this.EngineManager.getEngineByName("js");
	}

	@Override
	public Object EvalTopLevelNode(ZenNode Node) {
		String Code = this.CurrentBuilder.toString() + ";";
		System.out.println(Code);
		this.CurrentBuilder.Clear();
		try {
			return ((Compilable)this.Engine).compile(Code).eval();
		} catch (ScriptException ex) {
			ex.printStackTrace();
		}
		return null;
	}

	@Override
	public void VisitBlockNode(ZenBlockNode Node) {
		this.CurrentBuilder.Append("{");
		this.CurrentBuilder.Indent();
		for (ZenNode SubNode : Node.StatementList) {
			this.CurrentBuilder.AppendLineFeed();
			this.CurrentBuilder.AppendIndent();
			this.GenerateCode(SubNode);
			this.CurrentBuilder.Append(this.SemiColon);
		}
		this.CurrentBuilder.UnIndent();
		this.CurrentBuilder.AppendLineFeed();
		this.CurrentBuilder.AppendIndent();
		this.CurrentBuilder.Append("}");
	}

	@Override public void VisitCastNode(ZenCastNode Node) {
		this.GenerateCode(Node.ExprNode);
	}

	@Override public void VisitInstanceOfNode(ZenInstanceOfNode Node) {
		this.CurrentBuilder.Append("isinstance(");
		this.GenerateCode(Node.LeftNode);
		this.CurrentBuilder.Append(this.Camma);
		this.VisitType(Node.RightNode.Type);
		this.CurrentBuilder.Append(")");
	}

	@Override
	public void VisitThrowNode(ZenThrowNode Node) {
		this.CurrentBuilder.Append("throw ");
		this.GenerateCode(Node.ValueNode);
	}

	@Override
	public void VisitTryNode(ZenTryNode Node) {
		this.CurrentBuilder.Append("try");
		this.GenerateCode(Node.TryNode);
		//for (ZenNode CatchNode : Node.CatchList) {
		//	this.GenerateCode(CatchNode);
		//}
		this.GenerateCode(Node.CatchNode);
		if (Node.FinallyNode != null) {
			this.CurrentBuilder.Append("finally");
			this.GenerateCode(Node.FinallyNode);
		}
	}

	@Override
	public void VisitCatchNode(ZenCatchNode Node) {
		this.CurrentBuilder.Append("catch ");
		this.CurrentBuilder.Append(Node.ExceptionName);
		this.GenerateCode(Node.BodyNode);
	}

	@Override
	public void VisitVarDeclNode(ZenVarDeclNode Node) {
		this.CurrentBuilder.AppendToken("var ");
		this.CurrentBuilder.Append(Node.NativeName);
		this.CurrentBuilder.AppendToken("=");
		this.GenerateCode(Node.InitNode);
	}

	@Override
	public void VisitParamNode(ZenParamNode Node) {
		this.CurrentBuilder.Append(Node.Name);
	}

	@Override
	public void VisitFunctionLiteralNode(ZenFunctionLiteralNode Node) {
		ZenReturnNode ReturnNode = Node.BodyNode.ToReturnNode();
		this.CurrentBuilder.Append("(function");
		this.VisitParamList("(", Node.ArgumentList, ")");
		if(ReturnNode != null && ReturnNode.ValueNode != null) {
			this.CurrentBuilder.Append("{ return ");
			this.GenerateCode(ReturnNode.ValueNode);
			this.CurrentBuilder.Append("; }");
		}
		else {
			this.GenerateCode(Node.BodyNode);
		}
		this.CurrentBuilder.Append(")");
	}

	@Override
	public void VisitFuncDeclNode(ZenFuncDeclNode Node) {
		this.CurrentBuilder.Append("function ");
		this.CurrentBuilder.Append(Node.FuncName);
		this.VisitParamList("(", Node.ArgumentList, ")");
		this.GenerateCode(Node.BodyNode);
	}

}