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

//ifdef JAVA
package zen.lang;
import zen.deps.Field;
import zen.deps.LibZen;
import zen.deps.Var;
import zen.parser.ZenToken;
import zen.parser.ZenUtils;
//endif VAJA

public class ZenType implements ZenTypeConst {
	@Field public int			  TypeFlag;
	@Field public int             TypeId;
	@Field public String		  ShortName;
	@Field public ZenType		  RefType;

	public ZenType(int TypeFlag, String ShortName, ZenType RefType) {
		this.TypeFlag = TypeFlag;
		this.ShortName = ShortName;
		this.RefType = RefType;
		if(ZenUtils.IsFlag(TypeFlag, UniqueType)) {
			this.TypeId = ZenSystem.IssueTypeId(this);
		}
		else {
			this.TypeId = -1;  // unused
		}
	}

	public ZenType GetRealType() {
		return this;
	}

	public ZenType GetSuperType() {
		return this.RefType;
	}

	public ZenType GetBaseType() {
		return this;
	}

	public void Infer(ZenType Type, ZenToken SourceToken) {
		// ZenVarInfo should be implemented
	}

	public boolean IsFoundTypeError() {
		// ZenVarInfo should be implemented
		return false;
	}

	public int GetParamSize() {
		return 0;
	}

	public ZenType GetParamType(int Index) {
		return null;
	}

	public boolean IsFuncType() {
		return false;
	}

	public final boolean Equals(ZenType Type) {
		return (this.GetRealType() == Type.GetRealType());
	}

	public final boolean Accept(ZenType Type) {
		@Var ZenType ThisType = this.GetRealType();
		if(ThisType == Type.GetRealType() || ThisType == ZenSystem.AnyType) {
			return true;
		}
		@Var ZenType SuperClass = Type.GetSuperType();
		while(SuperClass != null) {
			if(SuperClass == ThisType) {
				return true;
			}
			SuperClass = SuperClass.GetSuperType();
		}
		return ZenSystem.CheckSubType(Type, this);
	}


	public final boolean IsTopType() {
		return (this.GetRealType() == ZenSystem.TopType);
	}

	public final boolean IsVoidType() {
		return (this.GetRealType() == ZenSystem.VoidType);
	}

	public final boolean IsVarType() {
		return (this.GetRealType() == ZenSystem.VarType);
	}

	public final boolean IsAnyType() {
		return (this.GetRealType() == ZenSystem.AnyType);
	}

	public final boolean IsTypeType() {
		return (this.GetRealType() == ZenSystem.TypeType);
	}

	public final boolean IsBooleanType() {
		return (this.GetRealType() == ZenSystem.BooleanType);
	}

	public final boolean IsIntType() {
		return (this.GetRealType() == ZenSystem.IntType);
	}

	public final boolean IsFloatType() {
		return (this.GetRealType() == ZenSystem.FloatType);
	}
	public final boolean IsStringType() {
		return (this.GetRealType() == ZenSystem.StringType);
	}

	public final boolean IsArrayType() {
		return (this.GetBaseType() == ZenSystem.ArrayType);
	}

	public final boolean IsMapType() {
		return (this.GetBaseType() == ZenSystem.ArrayType);
	}

	public final boolean IsEnumType() {
		return ZenUtils.IsFlag(this.TypeFlag, EnumType);
	}

	public ZenType CreateSubType(int ClassFlag, String ClassName) {
		@Var ZenType SubType = new ZenType(ClassFlag, ClassName, this);
		return SubType;
	}

	//	public final boolean IsAbstractType() {
	//		return (this.TypeBody == null && this.ReferenceType == ZenTypeSystem.TopType/*default*/);
	//	}
	//	public final boolean IsNativeType() {
	//		return ZenUtils.IsFlag(this.TypeFlag, NativeType);
	//	}

	//	public final boolean IsDynamicType() {
	//		return ZenUtils.IsFlag(this.TypeFlag, DynamicType);
	//	}
	//
	//	public boolean IsVirtualType() {
	//		return ZenUtils.IsFlag(this.TypeFlag, VirtualType);
	//	}
	//
	//	public final boolean IsUnboxType() {
	//		return ZenUtils.IsFlag(this.BaseType.TypeFlag, UnboxType);
	//	}
	//
	//	public final boolean IsGenericType() {
	//		return ZenUtils.IsFlag(this.TypeFlag, GenericVariable);
	//	}

	@Override public String toString() {
		return this.ShortName;
	}

	public final String GetNativeName() {
		if(ZenUtils.IsFlag(this.TypeFlag, ExportType)) {
			return this.ShortName;
		}
		else {
			return this.GetBaseType().ShortName + NativeNameSuffix + this.TypeId;
		}
	}

	public final String GetUniqueName() {
		if(ZenUtils.IsFlag(this.TypeFlag, TypeVariable)) {
			return this.ShortName;
		}
		else {
			if(LibZen.DebugMode) {
				return this.GetBaseType().ShortName + NativeNameSuffix + this.TypeId;
			}
			else {
				return NativeNameSuffix + this.TypeId;
			}
		}
	}


	//	public final boolean Accept(ZenType Type) {
	//		boolean b = this.Accept_(Type);
	//		System.err.println("" + this + " accepts " + Type + " ? " + b);
	//		return b;
	//	}

	public final boolean AcceptValue(Object Value) {
		return (Value != null) ? this.Accept(ZenSystem.GuessType(Value)) : true;
	}

	//	public void SetClassField(ZenClassField ClassField) {
	//		this.TypeBody = ClassField;
	//	}
	//
	//	public boolean IsDynamicNaitiveLoading() {
	//		return this.IsNativeType() /*&& !ZenUtils.IsFlag(this.TypeFlag, CommonType)*/;
	//	}
	//
	//	public final boolean IsTypeVariable() {   // T
	//		return ZenUtils.IsFlag(this.TypeFlag, TypeVariable);
	//	}
	//
	//	public final boolean HasTypeVariable() {
	//		return ZenUtils.IsFlag(this.TypeFlag, TypeVariable) || ZenUtils.IsFlag(this.TypeFlag, GenericVariable);
	//	}
	//
	//	public int AppendTypeVariable(ZenNameSpace GenericNameSpace, int Count) {
	//		if(ZenUtils.IsFlag(this.TypeFlag, TypeVariable)) {
	//			@Var ZenType TypeVar = GenericNameSpace.GetType(this.ShortName);
	//			if(TypeVar != null && TypeVar.IsTypeVariable()) {
	//				return Count;
	//			}
	//			GenericNameSpace.SetSymbol(this.ShortName, this, null);
	//			return Count + 1;
	//		}
	//		if(ZenUtils.IsFlag(this.TypeFlag, GenericVariable)) {
	//			for(@Var int i = 0; i < this.TypeParams.length; i += 1) {
	//				Count = this.TypeParams[i].AppendTypeVariable(GenericNameSpace, Count);
	//			}
	//		}
	//		return Count;
	//	}
	//
	//	private ZenType GivenParamType(ZenType GivenType, int ParamIndex) {
	//		if(GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
	//			return GivenType.TypeParams[ParamIndex];
	//		}
	//		return GivenType;
	//	}
	//
	//	public ZenType RealType(ZenNameSpace GenericNameSpace, ZenType GivenType) {
	//		if(ZenUtils.IsFlag(this.TypeFlag, TypeVariable)) {
	//			@Var ZenType TypeVar = GenericNameSpace.GetType(this.ShortName);
	//			//System.err.println("TypeVar="+this.ShortName + ", " + TypeVar);
	//			if(TypeVar != null && TypeVar.IsTypeVariable()) {
	//				GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
	//				return GivenType;
	//			}
	//			else {
	//				return TypeVar;
	//			}
	//		}
	//		if(ZenUtils.IsFlag(this.TypeFlag, GenericVariable)) {
	//			@Var ArrayList<ZenType> TypeList = new ArrayList<ZenType>();
	//			for(@Var int i = 0; i < this.TypeParams.length; i += 1) {
	//				@Var ZenType RealParamType = this.TypeParams[i].RealType(GenericNameSpace, this.GivenParamType(GivenType, i));
	//				TypeList.add(RealParamType);
	//			}
	//			return ZenTypeSystem.GetGenericType(this.BaseType, 0, TypeList, true);
	//		}
	//		return this;
	//	}
	//
	//	public boolean Match(ZenNameSpace GenericNameSpace, ZenType GivenType) {
	//
	//		if(ZenUtils.IsFlag(this.TypeFlag, TypeVariable)) {
	//			@Var ZenType TypeVar = GenericNameSpace.GetType(this.ShortName);
	//			if(TypeVar.IsTypeVariable()) {
	//				//System.err.println("updating "+ this.ShortName + " " + GivenType);
	//				GenericNameSpace.SetSymbol(this.ShortName, GivenType, null);
	//				return true;
	//			}
	//			return TypeVar.Accept(GivenType);
	//		}
	//		if(ZenUtils.IsFlag(this.TypeFlag, GenericVariable)) {
	//			if(GivenType.BaseType == this.BaseType && GivenType.TypeParams.length == this.TypeParams.length) {
	//				for(@Var int i = 0; i < this.TypeParams.length; i += 1) {
	//					if(!this.TypeParams[i].Match(GenericNameSpace, GivenType.TypeParams[i])) {
	//						return false;
	//					}
	//				}
	//				return true;
	//			}
	//			return false;
	//		}
	//		return this.Accept(GivenType);
	//	}
	//
	////	public boolean Match(ZenNameSpace GenericNameSpace, ZenType GivenType) {
	////		boolean b = this.Match_(GenericNameSpace, GivenType);
	////		System.err.println("matching.. " + this + ", given = " + GivenType + ", results=" + b);
	////		return b;
	////	}

}