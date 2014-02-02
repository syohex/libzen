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
package zen.parser;
import java.util.ArrayList;

import zen.ast.ZErrorNode;
import zen.ast.ZNode;
import zen.ast.ZTypeNode;
import zen.deps.Field;
import zen.deps.Init;
import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.deps.Var;
import zen.lang.ZSystem;
import zen.type.ZType;

public final class ZTokenContext {
	// ParseFlag
	public final static int	    BackTrackParseFlag	= 1;
	public final static int	    SkipIndentParseFlag	= (1 << 1);
	public final static int	    MismatchedPosition		= -1;
	public final static int     DisallowSkipIndent   = (1 << 5);
	public final static int     AllowSkipIndent    = (1 << 4);
	public final static int     AllowAnnotation   = (1 << 3);
	public final static int     AllowLineFeed     = (1 << 2);

	public final static boolean     Required2          = true;
	public final static boolean     Optional2          = false;
	public final static boolean     AllowSkipIndent2   = true;
	public final static boolean     NotAllowSkipIndent2   = false;

	@Field @Init public ZNameSpace TopLevelNameSpace;
	@Field public ArrayList<ZToken> SourceTokenList = new ArrayList<ZToken>();
	@Field private int CurrentPosition = 0;
	@Field @Init public long ParsingLine;
	@Field private int ParseFlag = 0;
	@Field public ZToken LatestToken = null;
	@Field int IndentLevel = 0;

	public ZTokenContext(ZNameSpace NameSpace, String Text, long FileLine) {
		this.TopLevelNameSpace = NameSpace;
		this.ParsingLine = FileLine;
		this.AppendParsedToken(Text, ZParserConst.SourceTokenFlag, null);
	}

	//	public int GetParseFlag() {
	//		return this.ParseFlag;
	//	}

	public void SetParseFlag(int ParseFlag) {
		this.ParseFlag = ParseFlag;
	}

	public ZToken AppendParsedToken(String Text, int TokenFlag, String PatternName) {
		@Var ZToken Token = new ZToken(TokenFlag, Text, this.ParsingLine);
		if(PatternName != null) {
			Token.PresetPattern = this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
			LibNative.Assert(Token.PresetPattern != null);
		}
		this.SourceTokenList.add(Token);
		return Token;
	}

	public void FoundWhiteSpace() {
		@Var int index = this.SourceTokenList.size() - 1;
		if(index > -1) {
			@Var ZToken Token = this.SourceTokenList.get(index);
			Token.TokenFlag |= ZParserConst.WhiteSpaceTokenFlag;
		}
	}

	public void FoundLineFeed(long line) {
		this.ParsingLine += line;
	}

	@Deprecated
	public void ReportTokenError1(int Level, String Message, String TokenText) {
		@Var ZToken Token = this.AppendParsedToken(TokenText, 0, "$Error$");
		this.TopLevelNameSpace.Generator.Logger.Report(Level, Token, Message);
	}

	public void SkipErrorStatement() {
		@Var ZToken LeastRecentToken = this.LatestToken;
		while(this.HasNext()) {
			@Var ZToken T = this.GetToken();
			if(T.IsDelim() || T.EqualsText("}")) {
				break;
			}
			this.TopLevelNameSpace.Generator.Logger.ReportDebug(T, "skipping: " + T.ParsedText);
			this.GetTokenAndMoveForward();
		}
		this.LatestToken = LeastRecentToken;
	}

	private ZToken GetBeforeToken() {
		@Var int MovingPos = this.CurrentPosition - 1;
		while(MovingPos >= 0 && MovingPos < this.SourceTokenList.size()) {
			@Var ZToken Token = this.SourceTokenList.get(MovingPos);
			if(!Token.IsIndent()) {
				return Token;
			}
			MovingPos = MovingPos - 1;
		}
		return this.LatestToken;
	}

	public ZNode CreateExpectedErrorNode(ZToken SourceToken, String ExpectedTokenText) {
		if(SourceToken == null || SourceToken.IsNull()) {
			SourceToken = this.GetBeforeToken();
			return new ZErrorNode(SourceToken, ExpectedTokenText + " is expected after " + SourceToken.ParsedText);
		}
		return new ZErrorNode(SourceToken, ExpectedTokenText + " is expected; " + SourceToken.ParsedText + " is given");
	}

	public void Vacume() {
		//		if(this.CurrentPosition > 0) {
		//			for(@Var int i = this.CurrentPosition - 1; i >= 0; i = i - 1) {
		//				ZenToken Token = this.SourceList.get(i);
		//				if(Token == null) {
		//					break;
		//				}
		//				this.SourceList.set(i, null); // unlink object
		//			}
		//			this.CurrentPosition = 0;
		//		}
	}

	private int DispatchFunc(String ScriptSource, int ZenChar, int pos) {
		@Var ZTokenFunc TokenFunc = this.TopLevelNameSpace.GetTokenFunc(ZenChar);
		@Var int NextIdx = ZTokenFunc.ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
		if(NextIdx == ZTokenContext.MismatchedPosition) {
			ZLogger.VerboseLog(ZLogger.VerboseUndefined, "undefined tokenizer: " + ScriptSource.substring(pos, pos+1));
			this.AppendParsedToken(ScriptSource.substring(pos, pos + 1), 0, null);
			return pos + 1;
		}
		return NextIdx;
	}

	private void Tokenize(String ScriptSource, long CurrentLine) {
		@Var int CurrentPos = 0;
		@Var int Length = ScriptSource.length();
		this.ParsingLine = CurrentLine;
		while(CurrentPos < Length) {
			@Var int ZenCode = ZUtils.AsciiToTokenMatrixIndex(LibZen.CharAt(ScriptSource, CurrentPos));
			@Var int NextPos = this.DispatchFunc(ScriptSource, ZenCode, CurrentPos);
			if(CurrentPos >= NextPos) {
				break;
			}
			CurrentPos = NextPos;
		}
		this.Dump();
	}

	public ZToken GetToken2(boolean SkipIndent, boolean MoveForward) {
		while(this.CurrentPosition < this.SourceTokenList.size()) {
			@Var ZToken Token = this.SourceTokenList.get(this.CurrentPosition);
			if(Token.IsSource()) {
				this.SourceTokenList.remove(this.SourceTokenList.size() - 1);
				this.Tokenize(Token.ParsedText, Token.FileLine);
				if(this.CurrentPosition < this.SourceTokenList.size()) {
					Token = this.SourceTokenList.get(this.CurrentPosition);
				}else{
					break;
				}
			}
			if(ZUtils.IsFlag(this.ParseFlag, ZTokenContext.SkipIndentParseFlag) && Token.IsIndent()) {
				this.CurrentPosition = this.CurrentPosition + 1;
				continue;
			}
			this.LatestToken = Token;
			return Token;
		}
		return ZToken.NullToken;
	}

	public ZToken GetToken() {
		while(this.CurrentPosition < this.SourceTokenList.size()) {
			@Var ZToken Token = this.SourceTokenList.get(this.CurrentPosition);
			if(Token.IsSource()) {
				this.SourceTokenList.remove(this.SourceTokenList.size() - 1);
				this.Tokenize(Token.ParsedText, Token.FileLine);
				if(this.CurrentPosition < this.SourceTokenList.size()) {
					Token = this.SourceTokenList.get(this.CurrentPosition);
				}else{
					break;
				}
			}
			if(ZUtils.IsFlag(this.ParseFlag, ZTokenContext.SkipIndentParseFlag) && Token.IsIndent()) {
				this.CurrentPosition = this.CurrentPosition + 1;
				continue;
			}
			this.LatestToken = Token;
			return Token;
		}
		return ZToken.NullToken;
	}

	public boolean HasNext() {
		return (this.GetToken() != ZToken.NullToken);
	}

	public ZToken GetTokenAndMoveForward() {
		@Var ZToken Token = this.GetToken();
		this.CurrentPosition += 1;
		return Token;
	}

	public void SkipIndent() {
		@Var ZToken Token = this.GetToken();
		while(Token.IsIndent()) {
			this.CurrentPosition = this.CurrentPosition + 1;
			Token = this.GetToken();
		}
	}

	public ZToken GetCurrentIndentToken() {
		for(@Var int i = this.CurrentPosition - 1; i >= 0; i -= 1) {
			@Var ZToken Token = this.SourceTokenList.get(i);
			if(Token.IsIndent()) {
				return Token;
			}
		}
		return null;
	}

	public void SkipUntilIndent(ZToken IndentToken) {
		while(this.HasNext()) {
			@Var ZToken Token = this.GetToken();
			if(Token.IsIndent() && Token.CompareIndent(IndentToken) == 0) {
				return;
			}
			this.CurrentPosition = this.CurrentPosition + 1;
		}
	}

	public ZToken ParseLargeToken() {
		@Var ZToken Token = this.GetTokenAndMoveForward();
		if(Token.IsNextWhiteSpace()) {
			return Token;
		}
		@Var String JoinedToken = Token.ParsedText;
		while(this.HasNext() && !Token.IsNextWhiteSpace()) {
			@Var int RollbackPosition = this.CurrentPosition;
			Token = this.GetTokenAndMoveForward();
			if(Token.IsIndent() || Token.EqualsText(";") || Token.EqualsText(",")) {
				this.CurrentPosition = RollbackPosition;
				break;
			}
			JoinedToken = JoinedToken + Token.ParsedText;
		}
		return new ZToken(0, JoinedToken, Token.FileLine);
	}

	//	public ZSyntaxPattern GetExpressionPattern(ZNameSpace NameSpace) {
	//		@Var ZToken Token = this.GetToken();
	//		if(Token.PresetPattern != null) {
	//			return Token.PresetPattern;
	//		}
	//		return NameSpace.GetSyntaxPattern(Token.ParsedText);
	//	}


	public final boolean IsToken(String TokenText) {
		@Var ZToken Token = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		return false;
	}

	public final boolean IsNewLineToken(String TokenText) {
		@Var int RollbackPos = this.CurrentPosition;
		this.SkipIndent();
		@Var ZToken Token = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.CurrentPosition = RollbackPos;
		return false;
	}

	public final boolean MatchToken(String TokenText) {
		@Var int RollbackPos = this.CurrentPosition;
		@Var ZToken Token = this.GetTokenAndMoveForward();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.CurrentPosition = RollbackPos;
		return false;
	}

	public final boolean MatchNewLineToken(String TokenText) {
		@Var int RollbackPos = this.CurrentPosition;
		this.SkipIndent();
		@Var ZToken Token = this.GetTokenAndMoveForward();
		if(Token.EqualsText(TokenText)) {
			return true;
		}
		this.CurrentPosition = RollbackPos;
		return false;
	}

	public ZNode MatchNodeToken(ZNode Base, String TokenText, boolean IsRequired) {
		if(!Base.IsErrorNode()) {
			@Var int RollbackPosition = this.CurrentPosition;
			@Var ZToken Token = this.GetTokenAndMoveForward();
			if(Token.ParsedText.equals(TokenText)) {
				if(Base.SourceToken == null) {
					Base.SourceToken = Token;
				}
			}
			else {
				if(IsRequired) {
					return this.CreateExpectedErrorNode(Token, TokenText);
				}
				else {
					this.CurrentPosition = RollbackPosition;
				}
			}
		}
		return Base;
	}

	public final ZNode ApplyMatchPattern(ZNode ParentNode, ZNode LeftNode, ZSyntaxPattern Pattern, boolean IsRequired) {
		@Var int RollbackPosition = this.CurrentPosition;
		@Var int ParseFlag = this.ParseFlag;
		@Var ZSyntaxPattern CurrentPattern = Pattern;
		@Var ZToken TopToken = this.GetToken();
		@Var ZNode ParsedNode = null;
		while(CurrentPattern != null) {
			this.CurrentPosition = RollbackPosition;
			this.IndentLevel += 1;
			ParsedNode = LibNative.ApplyMatchFunc(CurrentPattern.MatchFunc, ParentNode, this, LeftNode);
			this.IndentLevel -= 1;
			this.SetParseFlag(ParseFlag);
			if(ParsedNode != null && !ParsedNode.IsErrorNode()) {
				return ParsedNode;
			}
			CurrentPattern = CurrentPattern.ParentPattern;
		}
		if(!IsRequired) {
			this.CurrentPosition = RollbackPosition;
			return null;
		}
		this.SkipErrorStatement();
		if(ParsedNode == null) {
			ParsedNode = this.CreateExpectedErrorNode(TopToken, Pattern.PatternName);
		}
		return ParsedNode;
	}

	public final ZNode ParsePatternAfter(ZNode ParentNode, ZNode LeftNode, String PatternName, boolean IsRequired) {
		//		@Var int Pos = this.CurrentPosition;
		//		@Var int ParseFlag = this.ParseFlag;
		//		if(ZUtils.IsFlag(MatchFlag, ZTokenContext.Optional)) {
		//			this.SetParseFlag(this.ParseFlag | ZTokenContext.BackTrackParseFlag);
		//		}
		@Var ZSyntaxPattern Pattern = this.TopLevelNameSpace.GetSyntaxPattern(PatternName);
		@Var ZNode ParsedNode = this.ApplyMatchPattern(ParentNode, LeftNode, Pattern, IsRequired);
		return ParsedNode;
		//		this.SetParseFlag(ParseFlag);
		//		if(ParsedNode != null) {
		//			return ParsedNode;
		//		}
		//		this.CurrentPosition = Pos;
		//		return null; // mismatched
	}

	public final ZNode ParsePattern(ZNode ParentNode, String PatternName, boolean IsRequired) {
		return this.ParsePatternAfter(ParentNode, null, PatternName, IsRequired);
	}

	public ZNode AppendMatchedPattern(ZNode Base, ZNode ParentNode, String PatternName, boolean IsRequired) {
		if(!Base.IsErrorNode()) {
			@Var ZNode ParsedNode = this.ParsePattern(ParentNode, PatternName, IsRequired);
			if(ParsedNode != null) {
				if(ParsedNode.IsErrorNode()) {
					return ParsedNode;
				}
				Base.Append(ParsedNode);
			}
		}
		return Base;
	}

	public ZNode AppendMatchedPatternNtimes(ZNode Base, ZNode ParentNode, String PatternName, String DelimToken, boolean AllowSkipIndent) {
		int ParseFlag = this.ParseFlag;
		while(!Base.IsErrorNode()) {
			if(AllowSkipIndent) {
				this.SetSkipIndent(true);
			}
			@Var ZNode ParsedNode = this.ParsePattern(ParentNode, PatternName, ZTokenContext.Optional2);
			if(ParsedNode == null) {
				break;
			}
			Base.Append(ParsedNode);
			if(AllowSkipIndent) {
				this.SetSkipIndent(true);
			}
			if(!this.MatchToken(DelimToken)) {
				break;
			}
		}
		this.ParseFlag = ParseFlag;
		return Base;
	}

	//	public final ZNode ApplyMatchPattern(ZNameSpace NameSpace, ZNode LeftNode, ZSyntaxPattern Pattern) {
	//		@Var int RollbackPosition = this.CurrentPosition;
	//		@Var int ParseFlag = this.ParseFlag;
	//		@Var ZSyntaxPattern CurrentPattern = Pattern;
	//		@Var ZToken TopToken = this.GetToken();
	//		while(CurrentPattern != null) {
	//			@Var ZFunc MatchFunc = CurrentPattern.MatchFunc;
	//			this.CurrentPosition = RollbackPosition;
	//			if(CurrentPattern.ParentPattern != null) {   // This means it has next patterns
	//				this.SetParseFlag(ParseFlag | ZTokenContext.BackTrackParseFlag);
	//			}
	//			//LibZen.DebugP("B :" + JoinStrings("  ", this.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern);
	//			this.IndentLevel += 1;
	//			//LibZen.DebugP("LeftNode="+LeftNode + ", pattern" + Pattern);
	//			@Var ZNode ParsedNode = LibNative.ApplyMatchFunc(MatchFunc, NameSpace, this, LeftNode);
	//			this.IndentLevel -= 1;
	//			this.SetParseFlag(ParseFlag);
	//			//LibZen.DebugP("E :" + JoinStrings("  ", this.IndentLevel) + CurrentPattern + " => " + ParsedTree);
	//			if(ParsedNode != null && (CurrentPattern.ParentPattern == null || !ParsedNode.IsErrorNode())) {
	//				return ParsedNode;
	//			}
	//			CurrentPattern = CurrentPattern.ParentPattern;
	//		}
	//		if(this.IsAllowedBackTrack()) {
	//			this.CurrentPosition = RollbackPosition;
	//			return null;
	//		}
	//		this.SkipErrorStatement();
	//		if(Pattern == null) {
	//			ZLogger.VerboseLog(ZLogger.VerboseUndefined, "undefined syntax pattern: " + Pattern);
	//		}
	//		return this.CreateExpectedErrorNode(TopToken, Pattern.PatternName);
	//	}


	public final boolean StartsWithToken(String TokenText) {
		@Var ZToken Token = this.GetToken();
		if(Token.EqualsText(TokenText)) {
			this.CurrentPosition += 1;
			return true;
		}
		if(Token.ParsedText.startsWith(TokenText)) {
			Token = new ZToken(0, Token.ParsedText.substring(TokenText.length()), Token.FileLine);
			this.CurrentPosition += 1;
			this.SourceTokenList.add(this.CurrentPosition, Token);
			return true;
		}
		return false;
	}

	public final boolean IsAllowedBackTrack() {
		return ZUtils.IsFlag(this.ParseFlag, ZTokenContext.BackTrackParseFlag);
	}

	public final int SetBackTrack(boolean Allowed) {
		@Var int OldFlag = this.ParseFlag;
		if(Allowed) {
			this.SetParseFlag(this.ParseFlag | ZTokenContext.BackTrackParseFlag);
		}
		else {
			this.SetParseFlag((~(ZTokenContext.BackTrackParseFlag) & this.ParseFlag));
		}
		return OldFlag;
	}

	public final int SetSkipIndent(boolean Allowed) {
		@Var int OldFlag = this.ParseFlag;
		if(Allowed) {
			this.SetParseFlag(this.ParseFlag | ZTokenContext.SkipIndentParseFlag);
		}
		else {
			this.SetParseFlag((~(ZTokenContext.SkipIndentParseFlag) & this.ParseFlag));
		}
		return OldFlag;
	}

	public final void SetRememberFlag(int OldFlag) {
		this.SetParseFlag(OldFlag);
	}


	public final ZType ParseType(ZNode ParentNode, String PatternName, ZType DefaultType) {
		ZTypeNode TypeNode = (ZTypeNode)this.ParsePatternAfter(ParentNode, null, PatternName, Optional2);
		if(TypeNode != null) {
			return TypeNode.Type;
		}
		return DefaultType;
	}

	public final void SkipEmptyStatement() {
		while(this.HasNext()) {
			@Var ZToken Token = this.GetToken();
			if(Token.IsIndent() || Token.IsDelim()) {
				this.CurrentPosition += 1;
				continue;
			}
			break;
		}
	}

	public final void SkipIncompleteStatement() {
		//		if(this.HasNext()) {
		//			@Var ZenToken Token = this.GetToken();
		//			if(!Token.IsIndent() && !Token.IsDelim()) {
		//				this.TopLevelNameSpace.Generator.ReportError(ZenConsts.WarningLevel, Token, "needs ;");
		//				if(Token.EqualsText("}")) {
		//					return;
		//				}
		//				this.CurrentPosition += 1;
		//				while(this.HasNext()) {
		//					Token = this.GetToken();
		//					if(Token.IsIndent() || Token.IsDelim()) {
		//						break;
		//					}
		//					if(Token.EqualsText("}")) {
		//						return;
		//					}
		//					this.CurrentPosition += 1;
		//				}
		//			}
		this.SkipEmptyStatement();
		//		}
	}

	public final String Stringfy(String PreText, int BeginIdx, int EndIdx) {
		@Var String Buffer = PreText;
		for(@Var int Position = BeginIdx; Position < EndIdx; Position += 1) {
			@Var ZToken Token = this.SourceTokenList.get(Position);
			if(Token.IsIndent()) {
				Buffer += "\n";
			}
			Buffer += Token.ParsedText;
			if(Token.IsNextWhiteSpace()) {
				Buffer += " ";
			}
		}
		return Buffer;
	}

	public final void SetSourceMap(String SourceMap) {
		@Var int Index = SourceMap.lastIndexOf(":");
		if(Index != -1) {
			@Var String FileName = SourceMap.substring(0, Index);
			@Var int Line = (int)LibZen.ParseInt(SourceMap.substring(Index+1));
			this.ParsingLine = ZSystem.GetFileLine(FileName, Line);
		}
	}

	public final void DumpPosition() {
		@Var int Position = this.CurrentPosition;
		if(Position < this.SourceTokenList.size()) {
			@Var ZToken Token = this.SourceTokenList.get(Position);
			LibZen.DebugP("Position="+Position+" " + Token);
		}
		else {
			LibZen.DebugP("Position="+Position+" EOF");
		}
	}

	public final void Dump() {
		for(@Var int Position = this.CurrentPosition; Position < this.SourceTokenList.size(); Position += 1) {
			@Var ZToken Token = this.SourceTokenList.get(Position);
			@Var String DumpedToken = this.CurrentPosition == Position ? "*[" : "[";
			DumpedToken = DumpedToken + Position+"] " + Token;
			if(Token.PresetPattern != null) {
				DumpedToken = DumpedToken + " : " + Token.PresetPattern;
			}
			LibZen.DebugP(DumpedToken);
			//			ZenLogger.VerboseLog(ZenLogger.VerboseToken,  DumpedToken);
		}
	}

}
