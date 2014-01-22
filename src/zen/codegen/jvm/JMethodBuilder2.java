package zen.codegen.jvm;

import static org.objectweb.asm.Opcodes.ILOAD;
import static org.objectweb.asm.Opcodes.INVOKESTATIC;
import static org.objectweb.asm.Opcodes.ISTORE;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Stack;

import org.objectweb.asm.Label;
import org.objectweb.asm.Type;
import org.objectweb.asm.tree.MethodNode;

import zen.ast.ZNode;
import zen.lang.ZSystem;
import zen.lang.ZType;

public class JMethodBuilder2 extends MethodNode {

	final JMethodBuilder2          Parent;
	final JavaByteCodeGenerator2   Generator;
	ArrayList<JLocalVarStack>     LocalVals;
	int                           LocalSize;
	Stack<Label>                  BreakLabelStack;
	Stack<Label>                  ContinueLabelStack;
	int PreviousLine;

	public JMethodBuilder2(int acc, String Name, String Desc, JavaByteCodeGenerator2 Generator, JMethodBuilder2 Parent) {
		super(acc, Name, Desc, null, null);
		this.Parent = Parent;
		this.Generator = Generator;
		this.LocalVals = new ArrayList<JLocalVarStack>();
		this.LocalSize = 0;
		this.BreakLabelStack = new Stack<Label>();
		this.ContinueLabelStack = new Stack<Label>();
		this.PreviousLine = 0;
	}

	void SetLineNumber(long FileLine) {
		if(FileLine != 0) {
			int Line = ZSystem.GetFileLineNumber(FileLine);
			if(Line != this.PreviousLine) {
				Label LineLabel = new Label();
				this.visitLineNumber(Line, LineLabel);
				this.PreviousLine = Line;
			}
		}
	}

	void SetLineNumber(ZNode Node) {
		this.SetLineNumber(Node.SourceToken.FileLine);
	}

	void LoadConst(Object Value) {
		if(Value instanceof Boolean || Value instanceof Long || Value instanceof Double || Value instanceof String) {
			this.visitLdcInsn(Value);
			return;
		}

		//		if(Value instanceof ZType) {
		//			int id = ((ZType)Value).TypeId;
		//			this.visitLdcInsn(id);
		//			this.InvokeMethodCall(ZType.class, JLib.GetTypeById);
		//			return;
		//		}
		//		int id = ZSystem.AddConstPool(Value);
		//		this.AsmVisitor.visitLdcInsn(id);
		//		this.InvokeMethodCall(Value.getClass(), JLib.GetConstPool);
	}

	JLocalVarStack AddLocal(Class<?> JType, String Name) {
		Type LocalType =  Type.getType(JType);
		JLocalVarStack local = new JLocalVarStack(this.LocalSize, JType, LocalType, Name);
		this.LocalVals.add(local);
		this.LocalSize += LocalType.getSize();
		return local;
	}

	JLocalVarStack FindLocalVariable(String Name) {
		for(int i = 0; i < this.LocalVals.size(); i++) {
			JLocalVarStack l = this.LocalVals.get(i);
			if(l.Name.equals(Name)) {
				return l;
			}
		}
		return null;
	}

	Class<?> GetLocalType(String Name) {
		JLocalVarStack local = this.FindLocalVariable(Name);
		return local.JavaType;
	}

	void LoadLocal(String Name) {
		JLocalVarStack local = this.FindLocalVariable(Name);
		Type type = local.AsmType;
		this.visitVarInsn(type.getOpcode(ILOAD), local.Index);
	}

	void StoreLocal(String Name) {
		JLocalVarStack local = this.FindLocalVariable(Name);
		Type type = local.AsmType;
		this.visitVarInsn(type.getOpcode(ISTORE), local.Index);
	}

	void CheckParamCast(Class<?> C1, ZType T2) {
		Class<?> C2 = JavaTypeTable.GetJClass(T2);
		if(C1 != C2) {
			Method sMethod = JavaMethodTable.GetCastMethod(C1, C2);
			String owner = Type.getInternalName(sMethod.getDeclaringClass());
			this.visitMethodInsn(INVOKESTATIC, owner, sMethod.getName(), Type.getMethodDescriptor(sMethod));
		}
	}

	void CheckReturnCast(ZType T1, Class<?> C2) {
		Class<?> C1 = JavaTypeTable.GetJClass(T1);
		if(C1 != C2) {
			Method sMethod = JavaMethodTable.GetCastMethod(C1, C2);
			String owner = Type.getInternalName(sMethod.getDeclaringClass());
			this.visitMethodInsn(INVOKESTATIC, owner, sMethod.getName(), Type.getMethodDescriptor(sMethod));
		}
	}

	void PushNode(Class<?> T, ZNode Node) {
		Node.Accept(this.Generator);
		this.CheckParamCast(T, Node.Type);
	}

	void ApplyStaticMethod(ZType ReturnType, Method sMethod, ZNode[] Nodes) {
		Class<?>[] P = sMethod.getParameterTypes();
		for(int i = 0; i < P.length; i++) {
			this.PushNode(P[i], Nodes[i]);
		}
		String owner = Type.getInternalName(sMethod.getDeclaringClass());
		this.visitMethodInsn(INVOKESTATIC, owner, sMethod.getName(), Type.getMethodDescriptor(sMethod));
		this.CheckReturnCast(ReturnType, sMethod.getReturnType());
	}


}
