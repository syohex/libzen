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

package zen.lang;

import zen.deps.Field;
import zen.parser.ZToken;

public class ZenVarType extends ZenType {
	@Field public ZToken SourceToken;
	@Field public int AlphaId;

	public ZenVarType(String Name, int AlphaId, ZToken SourceToken) {
		super(0, Name, ZenSystem.VarType);
		this.SourceToken = SourceToken;
		this.TypeId = this.RefType.TypeId;
		this.AlphaId = AlphaId;
	}

	@Override public final ZenType GetRealType() {
		return this.RefType;
	}

	@Override public int GetParamSize() {
		return this.RefType.GetParamSize();
	}

	@Override public ZenType GetParamType(int Index) {
		return this.RefType.GetParamType(Index);
	}

	@Override public boolean IsFuncType() {
		return this.RefType.IsFuncType();
	}

	@Override public String toString() {
		return "typeof("+this.ShortName+"): " + this.RefType;
	}

	public void Infer(ZenType ContextType, ZToken SourceToken) {
		if(this.RefType.IsVarType()) {
			if(ContextType instanceof ZenVarType && ContextType.IsVarType()) {
				ZenVarType VarType = (ZenVarType)ContextType;
				if(this.AlphaId < VarType.AlphaId) {
					VarType.AlphaId = this.AlphaId;
				}
				else {
					this.AlphaId = VarType.AlphaId;
				}
			}
			else {
				this.RefType = ContextType.GetRealType();
				this.SourceToken = SourceToken;
				this.TypeId = this.RefType.TypeId;
				this.TypeFlag = this.RefType.TypeFlag;
			}
		}
	}
}
