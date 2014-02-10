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

package zen.codegen.jvm;

import static org.objectweb.asm.Opcodes.ACC_ABSTRACT;
import static org.objectweb.asm.Opcodes.ACC_FINAL;
import static org.objectweb.asm.Opcodes.ACC_PRIVATE;
import static org.objectweb.asm.Opcodes.ACC_PROTECTED;
import static org.objectweb.asm.Opcodes.ACC_PUBLIC;
import static org.objectweb.asm.Opcodes.ACC_STATIC;
import static org.objectweb.asm.Opcodes.ALOAD;
import static org.objectweb.asm.Opcodes.CHECKCAST;
import static org.objectweb.asm.Opcodes.DUP;
import static org.objectweb.asm.Opcodes.GETFIELD;
import static org.objectweb.asm.Opcodes.GOTO;
import static org.objectweb.asm.Opcodes.IFEQ;
import static org.objectweb.asm.Opcodes.IFNE;
import static org.objectweb.asm.Opcodes.ILOAD;
import static org.objectweb.asm.Opcodes.INVOKEINTERFACE;
import static org.objectweb.asm.Opcodes.INVOKESPECIAL;
import static org.objectweb.asm.Opcodes.INVOKESTATIC;
import static org.objectweb.asm.Opcodes.INVOKEVIRTUAL;
import static org.objectweb.asm.Opcodes.IRETURN;
import static org.objectweb.asm.Opcodes.NEW;
import static org.objectweb.asm.Opcodes.PUTFIELD;
import static org.objectweb.asm.Opcodes.PUTSTATIC;
import static org.objectweb.asm.Opcodes.RETURN;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Stack;

import org.objectweb.asm.Label;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.Type;

import zen.ast.ZAndNode;
import zen.ast.ZArrayLiteralNode;
import zen.ast.ZBinaryNode;
import zen.ast.ZBlockNode;
import zen.ast.ZBooleanNode;
import zen.ast.ZBreakNode;
import zen.ast.ZCastNode;
import zen.ast.ZCatchNode;
import zen.ast.ZClassDeclNode;
import zen.ast.ZComparatorNode;
import zen.ast.ZConstNode;
import zen.ast.ZErrorNode;
import zen.ast.ZFieldNode;
import zen.ast.ZFloatNode;
import zen.ast.ZFuncCallNode;
import zen.ast.ZFunctionNode;
import zen.ast.ZGetIndexNode;
import zen.ast.ZGetNameNode;
import zen.ast.ZGetterNode;
import zen.ast.ZGroupNode;
import zen.ast.ZIfNode;
import zen.ast.ZInstanceOfNode;
import zen.ast.ZIntNode;
import zen.ast.ZLetNode;
import zen.ast.ZMapLiteralNode;
import zen.ast.ZMethodCallNode;
import zen.ast.ZNewArrayNode;
import zen.ast.ZNewObjectNode;
import zen.ast.ZNode;
import zen.ast.ZNotNode;
import zen.ast.ZNullNode;
import zen.ast.ZOrNode;
import zen.ast.ZParamNode;
import zen.ast.ZReturnNode;
import zen.ast.ZSetIndexNode;
import zen.ast.ZSetNameNode;
import zen.ast.ZSetterNode;
import zen.ast.ZStringNode;
import zen.ast.ZThrowNode;
import zen.ast.ZTryNode;
import zen.ast.ZUnaryNode;
import zen.ast.ZVarDeclNode;
import zen.ast.ZWhileNode;
import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.deps.Var;
import zen.deps.ZFunction;
import zen.deps.ZMatchFunction;
import zen.deps.ZObject;
import zen.deps.ZTokenFunction;
import zen.deps.ZenMap;
import zen.lang.ZenClassType;
import zen.lang.ZenField;
import zen.parser.ZSourceContext;
import zen.parser.ZTokenContext;
import zen.type.ZFuncType;
import zen.type.ZType;
import zen.type.ZTypePool;

public class JavaAsmGenerator extends JavaSolution {
	AsmClassLoader AsmLoader = null;
	Stack<TryCatchLabel> TryCatchLabel;
	AsmMethodBuilder AsmBuilder;

	public JavaAsmGenerator() {
		super("java", "1.6");
		this.TryCatchLabel = new Stack<TryCatchLabel>();
		this.AsmLoader = new AsmClassLoader(this);
		this.InitFuncClass();
		JavaCommonApi.LoadCommonApi(this);
	}

	@Override public final Class<?> GetJavaClass(ZType zType) {
		if(zType instanceof ZFuncType) {
			return this.LoadFuncClass((ZFuncType)zType);
		}
		else {
			return JavaTypeTable.GetJavaClass(zType, Object.class);
		}
	}

	final Type AsmType(ZType zType) {
		return Type.getType(this.GetJavaClass(zType));
	}

	final String GetTypeDesc(ZType zType) {
		Class<?> JClass = this.GetJavaClass(zType);
		return Type.getDescriptor(JClass);
	}

	final String GetMethodDescriptor(ZFuncType FuncType) {
		@Var Type ReturnType = this.AsmType(FuncType.GetReturnType());
		@Var Type[] ArgTypes = new Type[FuncType.GetFuncParamSize()];
		for(int i = 0; i < ArgTypes.length; i++) {
			ZType ParamType = FuncType.GetFuncParamType(i);
			ArgTypes[i] = this.AsmType(ParamType);
		}
		String Desc = Type.getMethodDescriptor(ReturnType, ArgTypes);
		//System.out.println(" ** Desc: " + Desc + ", FuncType: " + FuncType);
		return Desc;
	}


	@Override public void VisitNullNode(ZNullNode Node) {
		this.AsmBuilder.visitInsn(Opcodes.ACONST_NULL);
	}

	@Override public void VisitBooleanNode(ZBooleanNode Node) {
		this.AsmBuilder.PushBoolean(Node.BooleanValue);
	}

	@Override public void VisitIntNode(ZIntNode Node) {
		this.AsmBuilder.PushLong(Node.IntValue);
	}

	@Override public void VisitFloatNode(ZFloatNode Node) {
		this.AsmBuilder.PushDouble(Node.FloatValue);
	}

	@Override public void VisitStringNode(ZStringNode Node) {
		this.AsmBuilder.visitLdcInsn(Node.StringValue);
	}

	@Override public void VisitArrayLiteralNode(ZArrayLiteralNode Node) {
		Class<?> ArrayClass = LibAsm.AsArrayClass(Node.Type);
		String Owner = Type.getInternalName(ArrayClass);
		this.AsmBuilder.visitTypeInsn(NEW, Owner);
		this.AsmBuilder.visitInsn(DUP);
		this.AsmBuilder.PushInt(Node.Type.TypeId);
		this.AsmBuilder.PushNodeListAsArray(LibAsm.AsElementClass(Node.Type), 0, Node);
		this.AsmBuilder.SetLineNumber(Node);
		this.AsmBuilder.visitMethodInsn(INVOKESPECIAL, Owner, "<init>", LibAsm.NewArrayDescriptor(Node.Type));
	}

	@Override public void VisitMapLiteralNode(ZMapLiteralNode Node) {
		this.Debug("TODO");
		this.AsmBuilder.visitInsn(Opcodes.ACONST_NULL);
		// TODO Auto-generated method stub
	}

	@Override public void VisitNewArrayNode(ZNewArrayNode Node) {
		this.Debug("TODO");
		this.AsmBuilder.visitInsn(Opcodes.ACONST_NULL);
		//		this.CurrentBuilder.LoadConst(Node.Type);
		//		this.CurrentBuilder.LoadNewArray(this, 0, Node.NodeList);
		//		this.CurrentBuilder.InvokeMethodCall(Node.Type, JLib.NewArray);
	}

	@Override public void VisitNewObjectNode(ZNewObjectNode Node) {
		if(Node.Type.IsVarType()) {
			this.Logger.ReportError(Node.SourceToken, "no class for new operator");
			this.AsmBuilder.visitInsn(Opcodes.ACONST_NULL);
		}
		else {
			String ClassName = Type.getInternalName(this.GetJavaClass(Node.Type));
			this.AsmBuilder.visitTypeInsn(NEW, ClassName);
			this.AsmBuilder.visitInsn(DUP);
			Constructor<?> jMethod = this.GetConstructor(Node.Type, Node);
			if(jMethod != null) {
				Class<?>[] P = jMethod.getParameterTypes();
				for(int i = 0; i < P.length; i++) {
					this.AsmBuilder.PushNode(P[i], Node.GetListAt(i));
				}
				this.AsmBuilder.SetLineNumber(Node);
				this.AsmBuilder.visitMethodInsn(INVOKESPECIAL, ClassName, "<init>", Type.getConstructorDescriptor(jMethod));
			}
			else {
				this.Logger.ReportError(Node.SourceToken, "no constructor: " + Node.Type);
				this.AsmBuilder.visitInsn(Opcodes.ACONST_NULL);
			}
		}
	}

	@Override public void VisitVarDeclNode(ZVarDeclNode Node) {
		Class<?> DeclClass = this.GetJavaClass(Node.DeclType);
		this.AsmBuilder.AddLocal(DeclClass, Node.NativeName);
		this.AsmBuilder.PushNode(DeclClass, Node.AST[ZVarDeclNode.InitValue]);
		this.AsmBuilder.StoreLocal(Node.NativeName);
		this.VisitBlockNode(Node);
		this.AsmBuilder.RemoveLocal(DeclClass, Node.NativeName);
	}

	@Override public void VisitGetNameNode(ZGetNameNode Node) {
		this.AsmBuilder.LoadLocal(Node.VarName);
		this.AsmBuilder.CheckReturnCast(Node, this.AsmBuilder.GetLocalType(Node.VarName));
	}

	@Override public void VisitSetNameNode(ZSetNameNode Node) {
		this.AsmBuilder.PushNode(this.AsmBuilder.GetLocalType(Node.VarName), Node.AST[ZSetNameNode.Expr]);
		this.AsmBuilder.StoreLocal(Node.VarName);
	}

	@Override public void VisitGroupNode(ZGroupNode Node) {
		Node.AST[ZGetterNode.Recv].Accept(this);
	}

	private Field GetField(Class<?> RecvClass, String Name) {
		try {
			return RecvClass.getField(Name);
		} catch (Exception e) {
			LibNative.FixMe(e);
		}
		return null;  // type checker guarantees field exists
	}

	@Override public void VisitGetterNode(ZGetterNode Node) {
		if(Node.HasUntypedNode()) {
			Method sMethod = JavaMethodTable.GetStaticMethod("GetField");
			ZNode NameNode = new ZStringNode(Node, null, Node.FieldName);
			this.AsmBuilder.ApplyStaticMethod(Node, sMethod, new ZNode[] {Node.AST[ZGetterNode.Recv], NameNode});
		}
		else {
			Class<?> RecvClass = this.GetJavaClass(Node.AST[ZGetterNode.Recv].Type);
			Field jField = this.GetField(RecvClass, Node.FieldName);
			String Owner = Type.getType(RecvClass).getInternalName();
			String Desc = Type.getType(jField.getType()).getDescriptor();
			if(Modifier.isStatic(jField.getModifiers())) {
				this.AsmBuilder.visitFieldInsn(Opcodes.GETSTATIC, Owner, Node.FieldName, Desc);
			}
			else {
				this.AsmBuilder.PushNode(null, Node.AST[ZGetterNode.Recv]);
				this.AsmBuilder.visitFieldInsn(GETFIELD, Owner, Node.FieldName, Desc);
			}
			this.AsmBuilder.CheckReturnCast(Node, jField.getType());
		}
	}

	@Override public void VisitSetterNode(ZSetterNode Node) {
		if(Node.HasUntypedNode()) {
			Method sMethod = JavaMethodTable.GetStaticMethod("SetField");
			ZNode NameNode = new ZStringNode(Node, null, Node.FieldName);
			this.AsmBuilder.ApplyStaticMethod(Node, sMethod, new ZNode[] {Node.AST[ZGetterNode.Recv], NameNode, Node.AST[ZSetterNode.Expr]});
		}
		else {
			Class<?> RecvClass = this.GetJavaClass(Node.AST[ZGetterNode.Recv].Type);
			Field jField = this.GetField(RecvClass, Node.FieldName);
			String Owner = Type.getType(RecvClass).getInternalName();
			String Desc = Type.getType(jField.getType()).getDescriptor();
			if(Modifier.isStatic(jField.getModifiers())) {
				this.AsmBuilder.PushNode(jField.getType(), Node.AST[ZSetterNode.Expr]);
				this.AsmBuilder.visitFieldInsn(PUTSTATIC, Owner, Node.FieldName, Desc);
			}
			else {
				this.AsmBuilder.PushNode(null, Node.AST[ZGetterNode.Recv]);
				this.AsmBuilder.PushNode(jField.getType(), Node.AST[ZSetterNode.Expr]);
				this.AsmBuilder.visitFieldInsn(PUTFIELD, Owner, Node.FieldName, Desc);
			}
		}
	}

	@Override public void VisitGetIndexNode(ZGetIndexNode Node) {
		Method sMethod = JavaMethodTable.GetBinaryStaticMethod(Node.AST[ZGetterNode.Recv].Type, "[]", Node.AST[ZGetIndexNode.Index].Type);
		this.AsmBuilder.ApplyStaticMethod(Node, sMethod, new ZNode[] {Node.AST[ZGetterNode.Recv], Node.AST[ZGetIndexNode.Index]});
	}

	@Override public void VisitSetIndexNode(ZSetIndexNode Node) {
		Method sMethod = JavaMethodTable.GetBinaryStaticMethod(Node.AST[ZGetterNode.Recv].Type, "[]=", Node.AST[ZSetIndexNode.Index].Type);
		this.AsmBuilder.ApplyStaticMethod(Node, sMethod, new ZNode[] {Node.AST[ZGetterNode.Recv], Node.AST[ZSetIndexNode.Index], Node.AST[ZSetIndexNode.Expr]});
	}

	private int GetInvokeType(Method jMethod) {
		if(Modifier.isStatic(jMethod.getModifiers())) {
			return INVOKESTATIC;
		}
		if(Modifier.isInterface(jMethod.getModifiers())) {
			return INVOKEINTERFACE;
		}
		return INVOKEVIRTUAL;
	}

	@Override public void VisitMethodCallNode(ZMethodCallNode Node) {
		this.AsmBuilder.SetLineNumber(Node);
		Method jMethod = this.GetMethod(Node.AST[ZGetterNode.Recv].Type, Node.MethodName, Node);
		if(jMethod != null) {
			if(!Modifier.isStatic(jMethod.getModifiers())) {
				this.AsmBuilder.PushNode(null, Node.AST[ZGetterNode.Recv]);
			}
			Class<?>[] P = jMethod.getParameterTypes();
			for(int i = 0; i < P.length; i++) {
				this.AsmBuilder.PushNode(P[i], Node.GetListAt(i));
			}
			int inst = this.GetInvokeType(jMethod);
			String owner = Type.getInternalName(jMethod.getDeclaringClass());
			this.AsmBuilder.visitMethodInsn(inst, owner, jMethod.getName(), Type.getMethodDescriptor(jMethod));
			this.AsmBuilder.CheckReturnCast(Node, jMethod.getReturnType());
		}
		else {
			jMethod = JavaMethodTable.GetStaticMethod("InvokeUnresolvedMethod");
			this.AsmBuilder.PushNode(Object.class, Node.AST[ZGetterNode.Recv]);
			this.AsmBuilder.PushConst(Node.MethodName);
			this.AsmBuilder.PushNodeListAsArray(Object.class, 0, Node);
			this.AsmBuilder.ApplyStaticMethod(Node, jMethod);
		}
	}

	@Override public void VisitFuncCallNode(ZFuncCallNode Node) {
		this.AsmBuilder.SetLineNumber(Node);
		if(Node.ResolvedFunc != null) {
			this.AsmBuilder.ApplyFuncName(Node, Node.ResolvedFunc, Node);
		}
		else {
			if(Node.AST[ZFuncCallNode.Func].Type.IsFuncType()) {
				ZFuncType FuncType = (ZFuncType)Node.AST[ZFuncCallNode.Func].Type;
				Class<?> FuncClass = this.LoadFuncClass(FuncType);
				this.AsmBuilder.ApplyFuncObject(Node, FuncClass, Node.AST[ZFuncCallNode.Func], FuncType, Node);
			}
			else {

			}
		}
	}

	@Override public void VisitUnaryNode(ZUnaryNode Node) {
		Method sMethod = JavaMethodTable.GetUnaryStaticMethod(Node.SourceToken.GetText(), Node.AST[ZGetterNode.Recv].Type);
		this.AsmBuilder.ApplyStaticMethod(Node, sMethod, new ZNode[] {Node.AST[ZGetterNode.Recv]});
	}

	@Override public void VisitNotNode(ZNotNode Node) {
		Method sMethod = JavaMethodTable.GetUnaryStaticMethod(Node.SourceToken.GetText(), Node.AST[ZGetterNode.Recv].Type);
		this.AsmBuilder.ApplyStaticMethod(Node, sMethod, new ZNode[] {Node.AST[ZGetterNode.Recv]});
	}

	@Override public void VisitCastNode(ZCastNode Node) {
		if(Node.Type.IsVoidType()) {
			Node.AST[ZCastNode.Expr].Accept(this);
			this.AsmBuilder.Pop(Node.AST[ZCastNode.Expr].Type);
		}
		else {
			Class<?> C1 = this.GetJavaClass(Node.Type);
			Class<?> C2 = this.GetJavaClass(Node.AST[ZCastNode.Expr].Type);
			Method sMethod = JavaMethodTable.GetCastMethod(C1, C2);
			if(sMethod != null) {
				this.AsmBuilder.ApplyStaticMethod(Node, sMethod, new ZNode[] {Node.AST[ZCastNode.Expr]});
			}
			else if(!C1.isAssignableFrom(C2)) {
				this.AsmBuilder.visitTypeInsn(CHECKCAST, C1);
			}
		}
	}

	@Override public void VisitInstanceOfNode(ZInstanceOfNode Node) {
		// TODO Auto-generated method stub

	}

	@Override public void VisitBinaryNode(ZBinaryNode Node) {
		Method sMethod = JavaMethodTable.GetBinaryStaticMethod(Node.AST[ZBinaryNode.Left].Type, Node.SourceToken.GetText(), Node.AST[ZBinaryNode.Right].Type);
		this.AsmBuilder.ApplyStaticMethod(Node, sMethod, new ZNode[] {Node.AST[ZBinaryNode.Left], Node.AST[ZBinaryNode.Right]});
	}

	@Override public void VisitComparatorNode(ZComparatorNode Node) {
		Method sMethod = JavaMethodTable.GetBinaryStaticMethod(Node.AST[ZBinaryNode.Left].Type, Node.SourceToken.GetText(), Node.AST[ZBinaryNode.Right].Type);
		this.AsmBuilder.ApplyStaticMethod(Node, sMethod, new ZNode[] {Node.AST[ZBinaryNode.Left], Node.AST[ZBinaryNode.Right]});
	}

	@Override public void VisitAndNode(ZAndNode Node) {
		Label elseLabel = new Label();
		Label mergeLabel = new Label();
		this.AsmBuilder.PushNode(boolean.class, Node.AST[ZBinaryNode.Left]);
		this.AsmBuilder.visitJumpInsn(IFEQ, elseLabel);

		this.AsmBuilder.PushNode(boolean.class, Node.AST[ZBinaryNode.Right]);
		this.AsmBuilder.visitJumpInsn(IFEQ, elseLabel);

		this.AsmBuilder.visitLdcInsn(true);
		this.AsmBuilder.visitJumpInsn(GOTO, mergeLabel);

		this.AsmBuilder.visitLabel(elseLabel);
		this.AsmBuilder.visitLdcInsn(false);
		this.AsmBuilder.visitJumpInsn(GOTO, mergeLabel);

		this.AsmBuilder.visitLabel(mergeLabel);
	}

	@Override public void VisitOrNode(ZOrNode Node) {
		Label thenLabel = new Label();
		Label mergeLabel = new Label();
		this.AsmBuilder.PushNode(boolean.class, Node.AST[ZBinaryNode.Left]);
		this.AsmBuilder.visitJumpInsn(IFNE, thenLabel);

		this.AsmBuilder.visitLdcInsn(true);
		this.AsmBuilder.PushNode(boolean.class, Node.AST[ZBinaryNode.Right]);
		this.AsmBuilder.visitJumpInsn(IFNE, thenLabel);

		this.AsmBuilder.visitLdcInsn(false);
		this.AsmBuilder.visitJumpInsn(GOTO, mergeLabel);

		this.AsmBuilder.visitLabel(thenLabel);
		this.AsmBuilder.visitLdcInsn(true);
		this.AsmBuilder.visitJumpInsn(GOTO, mergeLabel);

		this.AsmBuilder.visitLabel(mergeLabel);
	}

	@Override public void VisitBlockNode(ZBlockNode Node) {
		for (int i = 0; i < Node.GetListSize(); i++) {
			Node.GetListAt(i).Accept(this);

		}
	}

	@Override public void VisitIfNode(ZIfNode Node) {
		Label ElseLabel = new Label();
		Label EndLabel = new Label();
		this.AsmBuilder.PushNode(boolean.class, Node.AST[ZIfNode.Cond]);
		this.AsmBuilder.visitJumpInsn(IFEQ, ElseLabel);
		// Then
		Node.AST[ZIfNode.Then].Accept(this);
		this.AsmBuilder.visitJumpInsn(GOTO, EndLabel);
		// Else
		this.AsmBuilder.visitLabel(ElseLabel);
		if(Node.AST[ZIfNode.Else] != null) {
			Node.AST[ZIfNode.Else].Accept(this);
			this.AsmBuilder.visitJumpInsn(GOTO, EndLabel);
		}
		// End
		this.AsmBuilder.visitLabel(EndLabel);
	}

	@Override public void VisitReturnNode(ZReturnNode Node) {
		if(Node.AST[ZReturnNode.Expr] != null) {
			Node.AST[ZReturnNode.Expr].Accept(this);
			Type type = this.AsmType(Node.AST[ZReturnNode.Expr].Type);
			this.AsmBuilder.visitInsn(type.getOpcode(IRETURN));
		}
		else {
			this.AsmBuilder.visitInsn(RETURN);
		}
	}

	@Override public void VisitWhileNode(ZWhileNode Node) {
		Label continueLabel = new Label();
		Label breakLabel = new Label();
		this.AsmBuilder.BreakLabelStack.push(breakLabel);
		this.AsmBuilder.ContinueLabelStack.push(continueLabel);

		this.AsmBuilder.visitLabel(continueLabel);
		this.AsmBuilder.PushNode(boolean.class, Node.AST[ZWhileNode.Cond]);
		this.AsmBuilder.visitJumpInsn(IFEQ, breakLabel); // condition
		Node.AST[ZWhileNode.Block].Accept(this);
		this.AsmBuilder.visitJumpInsn(GOTO, continueLabel);
		this.AsmBuilder.visitLabel(breakLabel);

		this.AsmBuilder.BreakLabelStack.pop();
		this.AsmBuilder.ContinueLabelStack.pop();
	}

	@Override public void VisitBreakNode(ZBreakNode Node) {
		Label l = this.AsmBuilder.BreakLabelStack.peek();
		this.AsmBuilder.visitJumpInsn(GOTO, l);
	}

	@Override public void VisitThrowNode(ZThrowNode Node) {
		// use wrapper
		//String name = Type.getInternalName(ZenThrowableWrapper.class);
		//this.CurrentVisitor.MethodVisitor.visitTypeInsn(NEW, name);
		//this.CurrentVisitor.MethodVisitor.visitInsn(DUP);
		//Node.Expr.Accept(this);
		//this.box();
		//this.CurrentVisitor.typeStack.pop();
		//this.CurrentVisitor.MethodVisitor.visitMethodInsn(INVOKESPECIAL, name, "<init>", "(Ljava/lang/Object;)V");
		//this.CurrentVisitor.MethodVisitor.visitInsn(ATHROW);
	}

	@Override public void VisitTryNode(ZTryNode Node) {
		MethodVisitor mv = this.AsmBuilder;
		TryCatchLabel Label = new TryCatchLabel();
		this.TryCatchLabel.push(Label); // push

		// try block
		mv.visitLabel(Label.beginTryLabel);
		Node.AST[ZTryNode.Try].Accept(this);
		mv.visitLabel(Label.endTryLabel);
		mv.visitJumpInsn(GOTO, Label.finallyLabel);

		// finally block
		mv.visitLabel(Label.finallyLabel);
		if(Node.AST[ZTryNode.Finally] != null) {
			Node.AST[ZTryNode.Finally].Accept(this);
		}
		this.TryCatchLabel.pop();
	}

	@Override public void VisitCatchNode(ZCatchNode Node) {
		MethodVisitor mv = this.AsmBuilder;
		Label catchLabel = new Label();
		TryCatchLabel Label = this.TryCatchLabel.peek();

		// prepare
		//TODO: add exception class name
		String throwType = this.AsmType(Node.ExceptionType).getInternalName();
		mv.visitTryCatchBlock(Label.beginTryLabel, Label.endTryLabel, catchLabel, throwType);

		// catch block
		this.AsmBuilder.AddLocal(this.GetJavaClass(Node.ExceptionType), Node.ExceptionName);
		mv.visitLabel(catchLabel);
		this.AsmBuilder.StoreLocal(Node.ExceptionName);
		Node.AST[ZCatchNode.Block].Accept(this);
		mv.visitJumpInsn(GOTO, Label.finallyLabel);

		this.AsmBuilder.RemoveLocal(this.GetJavaClass(Node.ExceptionType), Node.ExceptionName);
	}

	public void VisitStaticField(JavaStaticFieldNode Node) {
		String FieldDesc = Type.getDescriptor(this.GetJavaClass(Node.Type));
		this.AsmBuilder.visitFieldInsn(Opcodes.GETSTATIC, Type.getInternalName(Node.StaticClass), Node.FieldName, FieldDesc);
	}

	@Override public void VisitLetNode(ZLetNode Node) {
		if(!(Node.AST[ZLetNode.InitValue] instanceof ZConstNode)) {
			String ClassName = "Symbol" + Node.GlobalName;
			@Var AsmClassBuilder ClassBuilder = this.AsmLoader.NewClass(ACC_PUBLIC|ACC_FINAL, Node, ClassName, "java/lang/Object");
			Class<?> ValueClass = this.GetJavaClass(Node.AST[ZLetNode.InitValue].Type);
			ClassBuilder.AddField(ACC_PUBLIC|ACC_STATIC, "_", ValueClass, null);

			AsmMethodBuilder StaticInitMethod = ClassBuilder.NewMethod(ACC_PUBLIC | ACC_STATIC, "<clinit>", "()V");
			StaticInitMethod.PushNode(ValueClass, Node.AST[ZLetNode.InitValue]);
			StaticInitMethod.visitFieldInsn(Opcodes.PUTSTATIC, ClassName, "_",  Type.getDescriptor(ValueClass));
			StaticInitMethod.visitInsn(RETURN);
			StaticInitMethod.Finish();

			Class<?> StaticClass = this.AsmLoader.LoadGeneratedClass(ClassName);
			Node.Set(ZLetNode.InitValue, new JavaStaticFieldNode(null, StaticClass, Node.AST[ZLetNode.InitValue].Type, "_"));
		}
		Node.GetNameSpace().SetLocalSymbol(Node.Symbol, Node.AST[ZLetNode.InitValue]);
	}

	private static String NameFuncClass(ZFuncType FuncType) {
		return "ZFunc"+ FuncType.TypeId;
	}

	private void InitFuncClass() {
		ArrayList<ZType> TypeList = new ArrayList<ZType>();
		TypeList.add(ZType.BooleanType);
		TypeList.add(JavaTypeTable.GetZenType(ZSourceContext.class));
		ZFuncType FuncType = ZTypePool.LookupFuncType(TypeList);
		this.GeneratedClassMap.put(NameFuncClass(FuncType), ZTokenFunction.class);
		TypeList.clear();
		TypeList.add(JavaTypeTable.GetZenType(ZNode.class));
		TypeList.add(JavaTypeTable.GetZenType(ZNode.class));
		TypeList.add(JavaTypeTable.GetZenType(ZTokenContext.class));
		TypeList.add(JavaTypeTable.GetZenType(ZNode.class));
		FuncType = ZTypePool.LookupFuncType(TypeList);
		this.GeneratedClassMap.put(NameFuncClass(FuncType), ZMatchFunction.class);
	}

	Class<?> LoadFuncClass(ZFuncType FuncType) {
		String ClassName = NameFuncClass(FuncType);
		Class<?> FuncClass = this.GeneratedClassMap.GetOrNull(ClassName);
		if(FuncClass == null) {
			@Var String SuperClassName = Type.getInternalName(ZFunction.class);
			@Var AsmClassBuilder ClassBuilder = this.AsmLoader.NewClass(ACC_PUBLIC| ACC_ABSTRACT, null, ClassName, ZFunction.class);
			AsmMethodBuilder InvokeMethod = ClassBuilder.NewMethod(ACC_PUBLIC | ACC_ABSTRACT, "Invoke", FuncType);
			InvokeMethod.Finish();

			AsmMethodBuilder InitMethod = ClassBuilder.NewMethod(ACC_PUBLIC, "<init>", "(ILjava/lang/String;)V");
			InitMethod.visitVarInsn(ALOAD, 0);
			InitMethod.visitVarInsn(ILOAD, 1);
			InitMethod.visitVarInsn(ALOAD, 2);
			InitMethod.visitMethodInsn(INVOKESPECIAL, SuperClassName, "<init>", "(ILjava/lang/String;)V");
			InitMethod.visitInsn(RETURN);
			InitMethod.Finish();

			FuncClass = this.AsmLoader.LoadGeneratedClass(ClassName);
			this.GeneratedClassMap.put(ClassName, FuncClass);
		}
		return FuncClass;
	}

	String NameFunctionClass(String FuncName, ZFuncType FuncType) {
		return "F" + FuncType.StringfySignature(FuncName);
	}

	public Class<?> GetDefinedFunctionClass(String FuncName, ZFuncType FuncType) {
		return this.GeneratedClassMap.GetOrNull(this.NameFunctionClass(FuncName, FuncType));
	}

	@Override public void VisitFunctionNode(ZFunctionNode Node) {
		if(Node.FuncName == null) {
			Node.FuncName = "f" + this.GetUniqueNumber();
		}
		@Var ZFuncType FuncType = Node.GetFuncType(null);

		//
		String ClassName = this.NameFunctionClass(Node.FuncName, FuncType);
		Class<?> FuncClass = this.LoadFuncClass(FuncType);
		@Var AsmClassBuilder ClassBuilder = this.AsmLoader.NewClass(ACC_PUBLIC|ACC_FINAL, Node, ClassName, FuncClass);

		AsmMethodBuilder InvokeMethod = ClassBuilder.NewMethod(ACC_PUBLIC | ACC_FINAL, "Invoke", FuncType);
		int index = 1;
		for(int i = 0; i < FuncType.GetFuncParamSize(); i++) {
			Type AsmType = this.AsmType(FuncType.GetFuncParamType(i));
			InvokeMethod.visitVarInsn(AsmType.getOpcode(ILOAD), index);
			index += AsmType.getSize();
		}
		InvokeMethod.visitMethodInsn(INVOKESTATIC, ClassName, "f", FuncType);
		InvokeMethod.visitReturn(FuncType.GetReturnType());
		InvokeMethod.Finish();

		ClassBuilder.AddField(ACC_PUBLIC | ACC_STATIC | ACC_FINAL, "function", FuncClass, null);

		// static init
		AsmMethodBuilder StaticInitMethod = ClassBuilder.NewMethod(ACC_PUBLIC | ACC_STATIC , "<clinit>", "()V");
		StaticInitMethod.visitTypeInsn(NEW, ClassName);
		StaticInitMethod.visitInsn(DUP);
		StaticInitMethod.visitMethodInsn(INVOKESPECIAL, ClassName, "<init>", "()V");
		StaticInitMethod.visitFieldInsn(PUTSTATIC, ClassName, "function",  FuncClass);
		StaticInitMethod.visitInsn(RETURN);
		StaticInitMethod.Finish();

		AsmMethodBuilder InitMethod = ClassBuilder.NewMethod(ACC_PRIVATE, "<init>", "()V");
		InitMethod.visitVarInsn(ALOAD, 0);
		InitMethod.visitLdcInsn(FuncType.TypeId);
		InitMethod.visitLdcInsn(Node.FuncName);
		InitMethod.visitMethodInsn(INVOKESPECIAL, Type.getInternalName(FuncClass), "<init>", "(ILjava/lang/String;)V");
		InitMethod.visitInsn(RETURN);
		InitMethod.Finish();

		AsmMethodBuilder StaticFuncMethod = ClassBuilder.NewMethod(ACC_PUBLIC | ACC_STATIC, "f", FuncType);
		for(int i = 0; i < Node.GetListSize(); i++) {
			ZParamNode ParamNode = Node.GetParamNode(i);
			Class<?> DeclClass = this.GetJavaClass(ParamNode.Type);
			StaticFuncMethod.AddLocal(DeclClass, ParamNode.Name);
		}
		Node.AST[ZFunctionNode.Block].Accept(this);
		StaticFuncMethod.Finish();

		FuncClass = this.AsmLoader.LoadGeneratedClass(ClassName);
		this.SetMethod(Node.FuncName, FuncType, FuncClass);
		this.GeneratedClassMap.put(ClassName, FuncClass);
		Node.GetNameSpace().SetLocalSymbol(Node.FuncName, new JavaStaticFieldNode(null, FuncClass, FuncType, "function"));
	}

	private ZFunction LoadFunction(Class<?> WrapperClass, Class<?> StaticMethodClass) {
		try {
			Field f = StaticMethodClass.getField("function");
			Object func = f.get(null);
			if(WrapperClass != null) {
				Constructor<?> c = WrapperClass.getConstructor(func.getClass().getSuperclass());
				func = c.newInstance(func);
			}
			return (ZFunction)func;
		}
		catch(Exception e) {
			e.printStackTrace();
			LibNative.Exit(1, "failed: " + e);
		}
		return null;
	}

	private void SetMethod(String FuncName, ZFuncType FuncType, Class<?> FuncClass) {
		ZType RecvType = FuncType.GetRecvType();
		if(RecvType instanceof ZenClassType && FuncName != null) {
			ZenClassType ClassType = (ZenClassType)RecvType;
			ZType FieldType = ClassType.GetFieldType(FuncName, null);
			if(FieldType == null || !FieldType.IsFuncType()) {
				FuncName = LibZen.AnotherName(FuncName);
				FieldType = ClassType.GetFieldType(FuncName, null);
				if(FieldType == null || !FieldType.IsFuncType()) {
					return;
				}
			}
			if(FieldType.Equals(FuncType)) {
				this.SetMethod(ClassType, FuncName, this.LoadFunction(null, FuncClass));
			}
			else if(this.IsMethodFuncType((ZFuncType)FieldType, FuncType)) {
				Class<?> WrapperClass = this.MethodWrapperClass((ZFuncType)FieldType, FuncType);
				this.SetMethod(ClassType, FuncName, this.LoadFunction(WrapperClass, FuncClass));
			}
		}
	}

	private boolean IsMethodFuncType(ZFuncType FieldType, ZFuncType FuncType) {
		if(FuncType.GetFuncParamSize() == FieldType.GetFuncParamSize() && FuncType.GetReturnType().Equals(FieldType.GetReturnType())) {
			for(int i = 1; i < FuncType.GetFuncParamSize(); i++) {
				if(!FuncType.GetFuncParamType(i).Equals(FieldType.GetFuncParamType(i))) {
					return false;
				}
			}
		}
		return true;
	}

	private final ZenMap<Class<?>> GeneratedClassMap = new ZenMap<Class<?>>(null);

	private Class<?> MethodWrapperClass(ZFuncType FuncType, ZFuncType SourceFuncType) {
		String ClassName = "W" + FuncType.GetUniqueName() + "W" + SourceFuncType.GetUniqueName();
		Class<?> WrapperClass = this.GeneratedClassMap.GetOrNull(ClassName);
		if(WrapperClass == null) {
			Class<?> FuncClass = this.LoadFuncClass(FuncType);
			Class<?> SourceClass = this.LoadFuncClass(SourceFuncType);
			@Var AsmClassBuilder ClassBuilder = this.AsmLoader.NewClass(ACC_PUBLIC|ACC_FINAL, null, ClassName, FuncClass);

			ClassBuilder.AddField(ACC_PUBLIC, "f", SourceClass, null);

			AsmMethodBuilder InitMethod = ClassBuilder.NewMethod(ACC_PUBLIC, "<init>", "(L"+Type.getInternalName(SourceClass)+";)V");
			InitMethod.visitVarInsn(Opcodes.ALOAD, 0);
			LibAsm.PushInt(InitMethod, FuncType.TypeId);
			InitMethod.visitLdcInsn(SourceFuncType.ShortName);
			InitMethod.visitMethodInsn(INVOKESPECIAL, Type.getInternalName(FuncClass), "<init>", "(ILjava/lang/String;)V");
			InitMethod.visitVarInsn(Opcodes.ALOAD, 0);
			InitMethod.visitVarInsn(Opcodes.ALOAD, 1);
			InitMethod.visitFieldInsn(PUTFIELD, ClassName, "f", Type.getDescriptor(SourceClass));
			InitMethod.visitInsn(RETURN);
			InitMethod.Finish();

			AsmMethodBuilder InvokeMethod = ClassBuilder.NewMethod(ACC_PUBLIC | ACC_FINAL, "Invoke", FuncType);
			InvokeMethod.visitVarInsn(ALOAD, 0);
			InvokeMethod.visitFieldInsn(GETFIELD, ClassName, "f", Type.getDescriptor(SourceClass));
			InvokeMethod.visitVarInsn(ALOAD, 1);
			//			System.out.println("CAST: " + Type.getInternalName(this.GetJavaClass(SourceFuncType.GetFuncParamType(0))));
			InvokeMethod.visitTypeInsn(CHECKCAST, this.GetJavaClass(SourceFuncType.GetFuncParamType(0)));
			int index = 2;
			for(int i = 1; i < FuncType.GetFuncParamSize(); i++) {
				Type AsmType = this.AsmType(FuncType.GetFuncParamType(i));
				InvokeMethod.visitVarInsn(AsmType.getOpcode(ILOAD), index);
				index += AsmType.getSize();
			}
			//String owner = "C" + FuncType.StringfySignature(FuncName);
			InvokeMethod.visitMethodInsn(Opcodes.INVOKEVIRTUAL, Type.getInternalName(SourceClass), "Invoke", this.GetMethodDescriptor(SourceFuncType));
			InvokeMethod.visitReturn(FuncType.GetReturnType());
			InvokeMethod.Finish();

			WrapperClass = this.AsmLoader.LoadGeneratedClass(ClassName);
			this.GeneratedClassMap.put(ClassName, WrapperClass);
		}
		return WrapperClass;
	}


	// -----------------------------------------------------------------------

	private Class<?> GetSuperClass(ZType SuperType) {
		@Var Class<?> SuperClass = null;
		if(SuperType != null) {
			SuperClass = this.GetJavaClass(SuperType);
		}
		else {
			SuperClass = ZObject.class;
		}
		return SuperClass;
	}

	private final static String NameClassMethod(ZType ClassType, String FieldName) {
		return FieldName + ClassType.TypeId;
	}

	private void SetMethod(ZenClassType ClassType, String FuncName, ZFunction FuncObject) {
		try {
			Class<?> StaticClass = this.GetJavaClass(ClassType);
			Field f = StaticClass.getField(NameClassMethod(ClassType, FuncName));
			f.set(null, FuncObject);
		}
		catch (Exception e) {
			e.printStackTrace();
			LibNative.Exit(1, "failed " + e);
		}
	}

	@Override public void VisitClassDeclNode(ZClassDeclNode Node) {
		@Var Class<?> SuperClass = this.GetSuperClass(Node.SuperType);
		@Var AsmClassBuilder ClassBuilder = this.AsmLoader.NewClass(ACC_PUBLIC, Node, Node.ClassName, SuperClass);
		for(@Var int i = 0; i < Node.GetListSize(); i++) {
			@Var ZFieldNode Field = Node.GetFieldNode(i);
			if(Field.ClassType.Equals(Node.ClassType)) {
				ClassBuilder.AddField(ACC_PUBLIC, Field.FieldName, Field.DeclType, this.GetConstValue(Field.AST[ZFieldNode.InitValue]));
			}
		}
		for(@Var int i = 0; i < Node.ClassType.GetFieldSize(); i++) {
			@Var ZenField Field = Node.ClassType.GetFieldAt(i);
			if(Field.FieldType.IsFuncType()) {
				ClassBuilder.AddField(ACC_PUBLIC|ACC_STATIC, NameClassMethod(Node.ClassType, Field.FieldName), Field.FieldType, null);
			}
		}
		AsmMethodBuilder InitMethod = ClassBuilder.NewMethod(ACC_PUBLIC, "<init>", "()V");
		InitMethod.visitVarInsn(Opcodes.ALOAD, 0);
		InitMethod.PushInt(Node.ClassType.TypeId);
		InitMethod.visitMethodInsn(INVOKESPECIAL, Node.ClassName, "<init>", "(I)V");
		InitMethod.visitInsn(RETURN);
		InitMethod.Finish();

		InitMethod = ClassBuilder.NewMethod(ACC_PROTECTED, "<init>", "(I)V");
		InitMethod.visitVarInsn(Opcodes.ALOAD, 0);
		InitMethod.visitVarInsn(Opcodes.ILOAD, 1);
		InitMethod.visitMethodInsn(INVOKESPECIAL, Type.getInternalName(SuperClass), "<init>", "(I)V");
		for(@Var int i = 0; i < Node.GetListSize(); i++) {
			@Var ZFieldNode Field = Node.GetFieldNode(i);
			if(!Field.DeclType.IsFuncType()) {
				//			System.out.println("FieldName:" + Field.ClassType + "." + Field.FieldName + ", init=" + Field.AST[ZFieldNode.InitValue]);				System.out.println("FieldName:" + Field.FieldName + ", init=" + Field.AST[ZFieldNode.InitValue]);
				InitMethod.visitVarInsn(Opcodes.ALOAD, 0);
				InitMethod.PushNode(this.GetJavaClass(Field.DeclType), Field.AST[ZFieldNode.InitValue]);
				InitMethod.visitFieldInsn(PUTFIELD, Node.ClassName, Field.FieldName, Type.getDescriptor(this.GetJavaClass(Field.DeclType)));
			}
		}
		for(@Var int i = 0; i < Node.ClassType.GetFieldSize(); i++) {
			@Var ZenField Field = Node.ClassType.GetFieldAt(i);
			if(Field.FieldType.IsFuncType()) {
				//System.out.println("FieldName:" + Field.ClassType + "." + Field.FieldName + ", type=" + Field.FieldType);
				String FieldDesc = Type.getDescriptor(this.GetJavaClass(Field.FieldType));
				Label JumpLabel = new Label();
				InitMethod.visitFieldInsn(Opcodes.GETSTATIC, Node.ClassName, NameClassMethod(Node.ClassType, Field.FieldName), FieldDesc);
				InitMethod.visitJumpInsn(Opcodes.IFNONNULL, JumpLabel);
				InitMethod.visitVarInsn(Opcodes.ALOAD, 0);
				InitMethod.visitFieldInsn(Opcodes.GETSTATIC, Node.ClassName, NameClassMethod(Node.ClassType, Field.FieldName), FieldDesc);
				//System.out.println("************" + Field.ClassType + ", " + Type.getInternalName(this.GetJavaClass(Field.ClassType)));
				InitMethod.visitFieldInsn(Opcodes.PUTFIELD, Field.ClassType.ShortName, Field.FieldName, FieldDesc);
				InitMethod.visitLabel(JumpLabel);
			}
		}
		InitMethod.visitInsn(RETURN);
		InitMethod.Finish();

		JavaTypeTable.SetTypeTable(Node.ClassType, this.AsmLoader.LoadGeneratedClass(Node.ClassName));
	}

	@Override public void VisitErrorNode(ZErrorNode Node) {
		String Message = this.Logger.ReportError(Node.SourceToken, Node.ErrorMessage);
		this.AsmBuilder.PushConst(Message);
		Method sMethod = JavaMethodTable.GetStaticMethod("ThrowError");
		this.AsmBuilder.ApplyStaticMethod(Node, sMethod);
	}

	@Override public void VisitExtendedNode(ZNode Node) {
	}


}

