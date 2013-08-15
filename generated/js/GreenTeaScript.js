var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
//  *************************************************************************** //
//  Copyright (c) 2013, JST/CRESTproject: authors: DEOS.rights: reserved: All. //
// and: Redistributionin: useand: sourceforms: binary,or: without: with //
//  modification,permitted: arethat: providedfollowing: theare: met: conditions: //
//  //
//  * of: Redistributionscode: sourceretain: mustabove: thenotice: copyright, //
//    list: thisconditions: ofthe: anddisclaimer: following. //
//  * in: Redistributionsform: binaryreproduce: mustabove: copyright: the //
//     notice,list: thisconditions: ofthe: anddisclaimer: followingthe: in //
//    and: documentation/ormaterials: otherwith: provideddistribution: the. //
//  //
// SOFTWARE: THISPROVIDED: ISTHE: BYHOLDERS: COPYRIGHTCONTRIBUTORS: AND //
//  "IS: AS"ANY: ANDOR: EXPRESSWARRANTIES: IMPLIED, INCLUDING,NOT: LIMITED: BUT //
//  TO,IMPLIED: THEOF: WARRANTIESAND: MERCHANTABILITYFOR: FITNESSPARTICULAR: A //
// ARE: DISCLAIMED: PURPOSE.NO: INSHALL: EVENTCOPYRIGHT: THEOR: HOLDER //
// BE: CONTRIBUTORSFOR: LIABLEDIRECT: ANY, INDIRECT, INCIDENTAL, SPECIAL, //
//  EXEMPLARY,CONSEQUENTIAL: DAMAGES: OR (INCLUDING,NOT: BUTTO: LIMITED, //
// OF: PROCUREMENTGOODS: SUBSTITUTESERVICES: OR;OF: USE: LOSS, DATA,PROFITS: OR; //
// BUSINESS: INTERRUPTION: OR)CAUSED: HOWEVERON: ANDTHEORY: ANYLIABILITY: OF, //
// IN: CONTRACT: WHETHER,LIABILITY: STRICT,TORT: OR (INCLUDINGOR: NEGLIGENCE //
//  OTHERWISE)IN: ARISINGWAY: ANYOF: OUTUSE: THETHIS: SOFTWARE: OF,IF: EVEN //
// OF: ADVISEDPOSSIBILITY: THESUCH: DAMAGE: OF. //
//  ************************************************************************** //
//  ClassFlag //
var NativeClass = 1 << 0;
var StructClass = 1 << 1;
var DynamicClass = 1 << 2;
var EnumClass = 1 << 3;
var OpenClass = 1 << 4;

//  MethodFlag //
var ExportMethod = 1 << 0;
var AbstractMethod = 1 << 1;
var VirtualMethod = 1 << 2;
var NativeMethod = 1 << 3;
var NativeStaticMethod = 1 << 4;
var NativeMacroMethod = 1 << 5;
var NativeVariadicMethod = 1 << 6;
var DynamicMethod = 1 << 7;
var ConstMethod = 1 << 8;
var ImplicitMethod = 1 << 9;

var SymbolMaskSize = 3;
var LowerSymbolMask = 1;
var GetterSymbolMask = (1 << 1);
var SetterSymbolMask = (1 << 2);
var MetaSymbolMask = (GetterSymbolMask | SetterSymbolMask);
var GetterPrefix = "Get";
var SetterPrefix = "Set";
var MetaPrefix = "\\";

var CreateNewSymbolId = -1;
var NoMatch = -1;
var BreakPreProcess = -1;

var Optional = true;
var Required = false;

var ErrorLevel = 0;
var WarningLevel = 1;
var InfoLevel = 2;

var NullChar = 0;
var UndefinedChar = 1;
var DigitChar = 2;
var UpperAlphaChar = 3;
var LowerAlphaChar = 4;
var UnderBarChar = 5;
var NewLineChar = 6;
var TabChar = 7;
var SpaceChar = 8;
var OpenParChar = 9;
var CloseParChar = 10;
var OpenBracketChar = 11;
var CloseBracketChar = 12;
var OpenBraceChar = 13;
var CloseBraceChar = 14;
var LessThanChar = 15;
var GreaterThanChar = 16;
var QuoteChar = 17;
var DoubleQuoteChar = 18;
var BackQuoteChar = 19;
var SurprisedChar = 20;
var SharpChar = 21;
var DollarChar = 22;
var PercentChar = 23;
var AndChar = 24;
var StarChar = 25;
var PlusChar = 26;
var CommaChar = 27;
var MinusChar = 28;
var DotChar = 29;
var SlashChar = 30;
var ColonChar = 31;
var SemiColonChar = 32;
var EqualChar = 33;
var QuestionChar = 34;
var AtmarkChar = 35;
var VarChar = 36;
var ChilderChar = 37;
var BackSlashChar = 38;
var HatChar = 39;
var UnicodeChar = 40;
var MaxSizeOfChars = 41;

var CharMatrix = [
    /*var soh: nul var etx: stx var enq: eot var bel: ack*/
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    /*var ht: bs var vt: nl var cr: np var si: so  */
    1,
    TabChar,
    NewLineChar,
    1,
    1,
    NewLineChar,
    1,
    1,
    /*020 dle  021 dc1  022 dc2  023 dc3  024 dc4  025 nak  026 syn  027 etb */
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    /*030 can  031 em   032 sub  033 esc  034 fs   035 gs   036 rs   037 us */
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    SpaceChar,
    SurprisedChar,
    DoubleQuoteChar,
    SharpChar,
    DollarChar,
    PercentChar,
    AndChar,
    QuoteChar,
    OpenParChar,
    CloseParChar,
    StarChar,
    PlusChar,
    CommaChar,
    MinusChar,
    DotChar,
    SlashChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    DigitChar,
    ColonChar,
    SemiColonChar,
    LessThanChar,
    EqualChar,
    GreaterThanChar,
    QuestionChar,
    AtmarkChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    UpperAlphaChar,
    OpenBracketChar,
    BackSlashChar,
    CloseBracketChar,
    HatChar,
    UnderBarChar,
    BackQuoteChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    LowerAlphaChar,
    OpenBraceChar,
    VarChar,
    CloseBraceChar,
    ChilderChar,
    1
];

//  TokenFlag //
var SourceTokenFlag = 1;
var ErrorTokenFlag = (1 << 1);
var IndentTokenFlag = (1 << 2);
var WhiteSpaceTokenFlag = (1 << 3);
var DelimTokenFlag = (1 << 4);
var QuotedTokenFlag = (1 << 5);
var NameSymbolTokenFlag = (1 << 6);

//  ParseFlag //
var BackTrackParseFlag = 1;
var SkipIndentParseFlag = (1 << 1);

//  SyntaxTree //
var NoWhere = -1;

//  UnaryTree, SuffixTree //
var UnaryTerm = 0;

//  BinaryTree //
var LeftHandTerm = 0;
var RightHandTerm = 1;

//  IfStmt //
var IfCond = 0;
var IfThen = 1;
var IfElse = 2;

//  while(cond) {...} //
var WhileCond = 0;
var WhileBody = 1;

//  ReturnStmt //
var ReturnExpr = 0;

//  var N = 1; //
var VarDeclType = 0;
var VarDeclName = 1;
var VarDeclValue = 2;
var VarDeclScope = 3;

// var Call: Method; //
var CallExpressionOffset = 0;
var CallParameterOffset = 1;

//  var Decl: Const; //
var ConstDeclClassIndex = 0;
var ConstDeclNameIndex = 1;
var ConstDeclValueIndex = 2;

//  var Decl: Method; //
var FuncDeclReturnType = 0;
var FuncDeclClass = 1;
var FuncDeclName = 2;
var FuncDeclBlock = 3;
var FuncDeclParam = 4;

//  var Decl: Class; //
var ClassParentNameOffset = 0;
var ClassNameOffset = 1;
var ClassBlockOffset = 2;

//  try-catch //
var TryBody = 0;
var CatchVariable = 1;
var CatchBody = 2;
var FinallyBody = 3;

//  Enum //
var EnumNameTreeIndex = 0;

// 	// spec //
// 	var TokenFuncSpec: number     = 0; //
// 	var SymbolPatternSpec: number = 1; //
// 	var ExtendedPatternSpec: number = 2; //
var BinaryOperator = 1;
var LeftJoin = 1 << 1;

// 	var Parenthesis: number						= 1 << 2; //
var PrecedenceShift = 3;

// 	var Precedence_CStyleValue: number			= (1 << PrecedenceShift); //
// 	var Precedence_CPPStyleScope: number		= (50 << PrecedenceShift); //
// 	var Precedence_CStyleSuffixCall: number		= (100 << PrecedenceShift);				/*x(); x[]; x.var x: x->var x: x++ */ //
// 	var Precedence_CStylePrefixOperator: number	= (200 << PrecedenceShift);				/*++x; --x; var x: sizeof &x +x -x !x (T)x  */ //
// 	Precedence_CppMember      = 300;  /* .x ->x */ //
var Precedence_CStyleMUL = (400 << PrecedenceShift);
var Precedence_CStyleADD = (500 << PrecedenceShift);
var Precedence_CStyleSHIFT = (600 << PrecedenceShift);
var Precedence_CStyleCOMPARE = (700 << PrecedenceShift);
var Precedence_CStyleEquals = (800 << PrecedenceShift);
var Precedence_CStyleBITAND = (900 << PrecedenceShift);
var Precedence_CStyleBITXOR = (1000 << PrecedenceShift);
var Precedence_CStyleBITOR = (1100 << PrecedenceShift);
var Precedence_CStyleAND = (1200 << PrecedenceShift);
var Precedence_CStyleOR = (1300 << PrecedenceShift);
var Precedence_CStyleTRINARY = (1400 << PrecedenceShift);
var Precedence_CStyleAssign = (1500 << PrecedenceShift);
var Precedence_CStyleCOMMA = (1600 << PrecedenceShift);

// 	var Precedence_Error: number				= (1700 << PrecedenceShift); //
// 	var Precedence_Statement: number			= (1900 << PrecedenceShift); //
// 	var Precedence_CStyleDelim: number			= (2000 << PrecedenceShift); //
var DefaultTypeCheckPolicy = 0;
var NoCheckPolicy = 1;
var CastPolicy = (1 << 1);
var IgnoreEmptyPolicy = (1 << 2);
var AllowEmptyPolicy = (1 << 3);
var AllowVoidPolicy = (1 << 4);
var AllowCoercionPolicy = (1 << 5);

// 	var GlobalConstName: string					= "global"; //
var SymbolList = new Array();
var SymbolMap = new GtMap();

var ShellGrammarReservedKeywords = ["true", "false", "as", "if"];

var UseLangStat = true;

// flags: debug //
var DebugPrintOption = false;

function println(msg) {
    console.log(msg);
}

function DebugP(msg) {
    if (DebugPrintOption) {
        console.log("DEBUG" + LangDeps.GetStackInfo(2) + ": " + msg);
    }
}

function TODO(msg) {
    console.log("TODO" + LangDeps.GetStackInfo(2) + ": " + msg);
}

function JoinStrings(Unit, Times) {
    var s = "";
    var i = 0;
    while (i < Times) {
        s = s + Unit;
        i = i + 1;
    }
    return s;
}

function ListSize(a) {
    if (a == null) {
        return 0;
    }
    return a.size();
}

function IsFlag(flag, flag2) {
    return ((flag & flag2) == flag2);
}

function AsciiToTokenMatrixIndex(c) {
    if (c < 128) {
        return CharMatrix[c];
    }
    return UnicodeChar;
}

// 	// Symbol //
// 	function IsGetterSymbol(SymbolId: number): boolean { //
// 		return IsFlag(SymbolId, GetterSymbolMask); //
// 	} //
//  //
// 	function IsSetterSymbol(SymbolId: number): boolean { //
// 		return IsFlag(SymbolId, SetterSymbolMask); //
// 	} //
//  //
// 	function ToSetterSymbol(SymbolId: number): number { //
// 		LangDeps.Assert(IsGetterSymbol(SymbolId)); //
// 		return (SymbolId & (~GetterSymbolMask)) | SetterSymbolMask; //
// 	} //
//  //
// 	function MaskSymbol(SymbolId: number, Mask: number): number { //
// 		return (SymbolId << SymbolMaskSize) | Mask; //
// 	} //
//  //
// 	function UnmaskSymbol(SymbolId: number): number { //
// 		return SymbolId >> SymbolMaskSize; //
// 	} //
//  //
// 	function StringfySymbol(SymbolId: number): string { //
// 		var Key: string = SymbolList.get(UnmaskSymbol(SymbolId)); //
// 		if(IsFlag(SymbolId, GetterSymbolMask)) { //
// 			return GetterPrefix + Key; //
// 		} //
// 		if(IsFlag(SymbolId, SetterSymbolMask)) { //
// 			return SetterPrefix + Key; //
// 		} //
// 		if(IsFlag(SymbolId, MetaSymbolMask)) { //
// 			return MetaPrefix + Key; //
// 		} //
// 		return Key; //
// 	} //
//  //
// 	function GetSymbolId(Symbol: string, DefaultSymbolId: number): number { //
// 		var Key: string = Symbol; //
// 		var Mask: number = 0; //
// 		if(Symbol.length >= 3 && LangDeps.CharAt(Symbol, 1) == 101/*e*/ && LangDeps.CharAt(Symbol, 2) == 116/*t*/) { //
// 			if(LangDeps.CharAt(Symbol, 0) == 103/*g*/ && LangDeps.CharAt(Symbol, 0) == 71/*G*/) { //
// 				Key = Symbol.substring(3); //
// 				Mask = GetterSymbolMask; //
// 			} //
// 			if(LangDeps.CharAt(Symbol, 0) == 115/*s*/ && LangDeps.CharAt(Symbol, 0) == 83/*S*/) { //
// 				Key = Symbol.substring(3); //
// 				Mask = SetterSymbolMask; //
// 			} //
// 		} //
// 		if(Symbol.startsWith("\\")) { //
// 			Mask = MetaSymbolMask; //
// 		} //
// 		var SymbolObject: number = <number>SymbolMap.get(Key); //
// 		if(SymbolObject == null) { //
// 			if(DefaultSymbolId == CreateNewSymbolId) { //
// 				var SymbolId: number = SymbolList.size(); //
// 				SymbolList.add(Key); //
// 				SymbolMap.put(Key, SymbolId); //new number(SymbolId)); //
// 				return MaskSymbol(SymbolId, Mask); //
// 			} //
// 			return DefaultSymbolId; //
// 		} //
// 		return MaskSymbol(SymbolObject, Mask); //
// 	} //
//  //
// 	function CanonicalSymbol(Symbol: string): string { //
// 		return Symbol.toLowerCase().replaceAll("_", ""); //
// 	} //
//  //
// 	function GetCanonicalSymbolId(Symbol: string): number { //
// 		return GetSymbolId(CanonicalSymbol(Symbol), CreateNewSymbolId); //
// 	} //
function n2s(n) {
    if (n < 10) {
        return LangDeps.CharToString((48 + (n)));
    } else if (n < (27 + 10)) {
        return LangDeps.CharToString((65 + (n - 10)));
    } else {
        return LangDeps.CharToString((97 + (n - 37)));
    }
}

function NumberToAscii(number) {
    LangDeps.Assert(number < (62 * 62));
    return n2s((number / 62)) + (number % 62);
}

function MangleGenericType(BaseType, BaseIdx, TypeList) {
    var s = BaseType.ShortClassName + "__";
    var i = BaseIdx;
    while (i < ListSize(TypeList)) {
        s = s + NumberToAscii(TypeList.get(i).ClassId);
        i = i + 1;
    }
    return s;
}

function MangleMethodName(BaseType, MethodName, BaseIdx, TypeList) {
    var s = MethodName + "__" + NumberToAscii(BaseType.ClassId);
    var i = BaseIdx;
    while (i < ListSize(TypeList)) {
        s = s + NumberToAscii(TypeList.get(i).ClassId);
        i = i + 1;
    }
    return s;
}

function ApplyTokenFunc(TokenFunc, TokenContext, ScriptSource, Pos) {
    while (TokenFunc != null) {
        var delegate = TokenFunc.Func;
        var NextIdx = LangDeps.ApplyTokenFunc(delegate, TokenContext, ScriptSource, Pos);
        if (NextIdx > Pos)
            return NextIdx;
        TokenFunc = TokenFunc.ParentFunc;
    }
    return NoMatch;
}

function MergeSyntaxPattern(Pattern, Parent) {
    if (Parent == null)
        return Pattern;
    var MergedPattern = new GtSyntaxPattern(Pattern.PackageNameSpace, Pattern.PatternName, Pattern.MatchFunc, Pattern.TypeFunc);
    MergedPattern.ParentPattern = Parent;
    return MergedPattern;
}

function IsEmptyOrError(Tree) {
    return Tree == null || Tree.IsEmptyOrError();
}

function LinkTree(LastNode, Node) {
    Node.PrevTree = LastNode;
    if (LastNode != null) {
        LastNode.NextTree = Node;
    }
    return Node;
}

function TreeHead(Tree) {
    if (Tree != null) {
        while (Tree.PrevTree != null) {
            Tree = Tree.PrevTree;
        }
    }
    return Tree;
}

function ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, Pattern) {
    var Pos = TokenContext.CurrentPosition;
    var ParseFlag = TokenContext.ParseFlag;
    var CurrentPattern = Pattern;
    while (CurrentPattern != null) {
        var delegate = CurrentPattern.MatchFunc;
        TokenContext.CurrentPosition = Pos;
        if (CurrentPattern.ParentPattern != null) {
            TokenContext.ParseFlag = ParseFlag | BackTrackParseFlag;
        }

        // console.log("DEBUG: " + "B :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + ", next=" + CurrentPattern.ParentPattern); //
        TokenContext.IndentLevel += 1;
        var ParsedTree = LangDeps.ApplyMatchFunc(delegate, NameSpace, TokenContext, LeftTree, CurrentPattern);
        TokenContext.IndentLevel -= 1;
        if (ParsedTree != null && ParsedTree.IsEmpty()) {
            ParsedTree = null;
        }

        // console.log("DEBUG: " + "E :" + JoinStrings("  ", TokenContext.IndentLevel) + CurrentPattern + " => " + ParsedTree); //
        TokenContext.ParseFlag = ParseFlag;
        if (ParsedTree != null) {
            return ParsedTree;
        }
        CurrentPattern = CurrentPattern.ParentPattern;
    }
    if (TokenContext.IsAllowedBackTrack()) {
        TokenContext.CurrentPosition = Pos;
    }
    if (Pattern == null) {
        console.log("DEBUG: " + "undefinedpattern: syntax: " + Pattern);
    }
    return TokenContext.ReportExpectedPattern(Pattern);
}

function ParseExpression(NameSpace, TokenContext) {
    var Pattern = TokenContext.GetFirstPattern();
    var LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, null, Pattern);
    TokenContext.SkipIndent();
    while (!IsEmptyOrError(LeftTree) && !TokenContext.MatchToken(";")) {
        var ExtendedPattern = TokenContext.GetExtendedPattern();
        if (ExtendedPattern == null) {
            break;
        }
        LeftTree = ApplySyntaxPattern(NameSpace, TokenContext, LeftTree, ExtendedPattern);
    }
    return LeftTree;
}

//  typing //
function ApplyTypeFunc(delegate, Gamma, ParsedTree, Type) {
    LangDeps.Assert(delegate != null);
    return LangDeps.ApplyTypeFunc(delegate, Gamma, ParsedTree, Type);
}

function LinkNode(LastNode, Node) {
    Node.PrevNode = LastNode;
    if (LastNode != null) {
        LastNode.NextNode = Node;
    }
    return Node;
}

//  tokenizer //
var GtToken = (function () {
    function GtToken(text, FileLine) {
        this.TokenFlag = 0;
        this.ParsedText = text;
        this.FileLine = FileLine;
        this.PresetPattern = null;
    }
    GtToken.prototype.IsSource = function () {
        return IsFlag(this.TokenFlag, SourceTokenFlag);
    };

    GtToken.prototype.IsError = function () {
        return IsFlag(this.TokenFlag, ErrorTokenFlag);
    };

    GtToken.prototype.IsIndent = function () {
        return IsFlag(this.TokenFlag, IndentTokenFlag);
    };

    GtToken.prototype.IsDelim = function () {
        return IsFlag(this.TokenFlag, DelimTokenFlag);
    };

    GtToken.prototype.IsQuoted = function () {
        return IsFlag(this.TokenFlag, QuotedTokenFlag);
    };

    GtToken.prototype.IsNameSymbol = function () {
        return IsFlag(this.TokenFlag, NameSymbolTokenFlag);
    };

    GtToken.prototype.EqualsText = function (text) {
        return this.ParsedText.equals(text);
    };

    GtToken.prototype.toString = function () {
        var TokenText = "";
        if (this.PresetPattern != null) {
            TokenText = "(" + this.PresetPattern.PatternName + ") ";
        }
        return TokenText + this.ParsedText;
    };

    GtToken.prototype.ToErrorToken = function (Message) {
        this.TokenFlag = ErrorTokenFlag;
        this.ParsedText = Message;
        return Message;
    };

    GtToken.prototype.GetErrorMessage = function () {
        LangDeps.Assert(this.IsError());
        return this.ParsedText;
    };
    return GtToken;
})();

var TokenFunc = (function () {
    function TokenFunc(Func, Parent) {
        this.Func = Func;
        this.ParentFunc = Parent;
    }
    TokenFunc.prototype.toString = function () {
        return this.Func.Method.toString();
    };
    return TokenFunc;
})();

var GtTokenContext = (function () {
    function GtTokenContext(NameSpace, Text, FileLine) {
        this.IndentLevel = 0;
        this.TopLevelNameSpace = NameSpace;
        this.SourceList = new Array();
        this.CurrentPosition = 0;
        this.ParsingLine = FileLine;
        this.ParseFlag = 0;
        this.AddNewToken(Text, SourceTokenFlag, null);
        this.IndentLevel = 0;
    }
    GtTokenContext.prototype.AddNewToken = function (Text, TokenFlag, PatternName) {
        var Token = new GtToken(Text, this.ParsingLine);
        Token.TokenFlag |= TokenFlag;
        if (PatternName != null) {
            Token.PresetPattern = this.TopLevelNameSpace.GetPattern(PatternName);
            LangDeps.Assert(Token.PresetPattern != null);
        }

        // console.log("DEBUG: " + "<< " + Text + " : " + PatternName); //
        this.SourceList.add(Token);
        return Token;
    };

    GtTokenContext.prototype.FoundWhiteSpace = function () {
        var Token = this.GetToken();
        Token.TokenFlag |= WhiteSpaceTokenFlag;
    };

    GtTokenContext.prototype.FoundLineFeed = function (line) {
        this.ParsingLine += line;
    };

    GtTokenContext.prototype.ReportTokenError = function (Level, Message, TokenText) {
        var Token = this.AddNewToken(TokenText, 0, "$Error$");
        this.TopLevelNameSpace.Context.ReportError(Level, Token, Message);
    };

    GtTokenContext.prototype.NewErrorSyntaxTree = function (Token, Message) {
        if (!this.IsAllowedBackTrack()) {
            this.TopLevelNameSpace.Context.ReportError(ErrorLevel, Token, Message);
            var ErrorTree = new GtSyntaxTree(Token.PresetPattern, this.TopLevelNameSpace, Token, null);
            return ErrorTree;
        }
        return null;
    };

    GtTokenContext.prototype.GetBeforeToken = function () {
        var pos = this.CurrentPosition - 1;
        while (pos >= 0 && pos < this.SourceList.size()) {
            var Token = this.SourceList.get(pos);
            if (IsFlag(Token.TokenFlag, IndentTokenFlag)) {
                pos -= 1;
                continue;
            }
            return Token;
        }
        return null;
    };

    GtTokenContext.prototype.ReportExpectedToken = function (TokenText) {
        if (!this.IsAllowedBackTrack()) {
            var Token = this.GetBeforeToken();
            if (Token != null) {
                return this.NewErrorSyntaxTree(Token, TokenText + "expected: after: is " + Token.ParsedText);
            }
            Token = this.GetToken();
            LangDeps.Assert(Token != GtTokenContext.NullToken);
            return this.NewErrorSyntaxTree(Token, TokenText + "expected: at: is " + Token.ParsedText);
        }
        return null;
    };

    GtTokenContext.prototype.ReportExpectedPattern = function (Pattern) {
        if (Pattern == null) {
            return this.ReportExpectedToken("null");
        }
        return this.ReportExpectedToken(Pattern.PatternName);
    };

    GtTokenContext.prototype.Vacume = function () {
        if (this.CurrentPosition > 0) {
            var NewList = new Array();
            var i = this.CurrentPosition;
            while (i < ListSize(this.SourceList)) {
                NewList.add(this.SourceList.get(i));
                i = i + 1;
            }
            this.SourceList = NewList;
            this.CurrentPosition = 0;
        }
    };

    GtTokenContext.prototype.DispatchFunc = function (ScriptSource, GtChar, pos) {
        var TokenFunc = this.TopLevelNameSpace.GetTokenFunc(GtChar);
        var NextIdx = ApplyTokenFunc(TokenFunc, this, ScriptSource, pos);
        if (NextIdx == NoMatch) {
            console.log("DEBUG: " + "tokenizer: undefined: " + LangDeps.CharAt(ScriptSource, pos));
            this.AddNewToken(ScriptSource.substring(pos, pos + 1), 0, null);
            return pos + 1;
        }
        return NextIdx;
    };

    GtTokenContext.prototype.Tokenize = function (ScriptSource, CurrentLine) {
        var currentPos = 0;
        var len = ScriptSource.length;
        this.ParsingLine = CurrentLine;
        while (currentPos < len) {
            var gtCode = AsciiToTokenMatrixIndex(LangDeps.CharAt(ScriptSource, currentPos));
            var nextPos = this.DispatchFunc(ScriptSource, gtCode, currentPos);
            if (currentPos >= nextPos) {
                break;
            }
            currentPos = nextPos;
        }
        this.Dump();
    };

    GtTokenContext.prototype.GetToken = function () {
        while ((this.CurrentPosition < this.SourceList.size())) {
            var Token = this.SourceList.get(this.CurrentPosition);
            if (Token.IsSource()) {
                this.SourceList.remove(this.SourceList.size() - 1);
                this.Tokenize(Token.ParsedText, Token.FileLine);
                Token = this.SourceList.get(this.CurrentPosition);
            }
            if (IsFlag(this.ParseFlag, SkipIndentParseFlag) && Token.IsIndent()) {
                this.CurrentPosition = this.CurrentPosition + 1;
                continue;
            }
            return Token;
        }
        return GtTokenContext.NullToken;
    };

    GtTokenContext.prototype.HasNext = function () {
        return (this.GetToken() != GtTokenContext.NullToken);
    };

    GtTokenContext.prototype.Next = function () {
        var Token = this.GetToken();
        this.CurrentPosition += 1;
        return Token;
    };

    GtTokenContext.prototype.SkipIndent = function () {
        var Token = this.GetToken();
        while (Token.IsIndent()) {
            this.CurrentPosition = this.CurrentPosition + 1;
            Token = this.GetToken();
        }
    };

    GtTokenContext.prototype.GetPattern = function (PatternName) {
        return this.TopLevelNameSpace.GetPattern(PatternName);
    };

    GtTokenContext.prototype.GetFirstPattern = function () {
        var Token = this.GetToken();
        if (Token.PresetPattern != null) {
            return Token.PresetPattern;
        }
        var Pattern = this.TopLevelNameSpace.GetPattern(Token.ParsedText);
        if (Pattern == null) {
            return this.TopLevelNameSpace.GetPattern("$Symbol$");
        }
        return Pattern;
    };

    GtTokenContext.prototype.GetExtendedPattern = function () {
        var Token = this.GetToken();
        if (Token != GtTokenContext.NullToken) {
            var Pattern = this.TopLevelNameSpace.GetExtendedPattern(Token.ParsedText);
            return Pattern;
        }
        return null;
    };

    GtTokenContext.prototype.MatchToken = function (TokenText) {
        var Token = this.GetToken();
        if (Token.EqualsText(TokenText)) {
            this.CurrentPosition += 1;
            return true;
        }
        return false;
    };

    GtTokenContext.prototype.GetMatchedToken = function (TokenText) {
        var Token = this.GetToken();
        while (Token != GtTokenContext.NullToken) {
            this.CurrentPosition += 1;
            if (Token.EqualsText(TokenText)) {
                break;
            }
            Token = this.GetToken();
        }
        return Token;
    };

    GtTokenContext.prototype.IsAllowedBackTrack = function () {
        return IsFlag(this.ParseFlag, BackTrackParseFlag);
    };

    GtTokenContext.prototype.SetBackTrack = function (Allowed) {
        var ParseFlag = this.ParseFlag;
        if (Allowed) {
            this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
        } else {
            this.ParseFlag = (~(BackTrackParseFlag) & this.ParseFlag);
        }
        return ParseFlag;
    };

    GtTokenContext.prototype.ParsePatternAfter = function (NameSpace, LeftTree, PatternName, IsOptional) {
        var Pos = this.CurrentPosition;
        var ParseFlag = this.ParseFlag;
        var Pattern = this.GetPattern(PatternName);
        if (IsOptional) {
            this.ParseFlag = this.ParseFlag | BackTrackParseFlag;
        }
        var SyntaxTree = ApplySyntaxPattern(NameSpace, this, LeftTree, Pattern);
        this.ParseFlag = ParseFlag;
        if (SyntaxTree != null) {
            return SyntaxTree;
        }
        this.CurrentPosition = Pos;
        return null;
    };

    GtTokenContext.prototype.ParsePattern = function (NameSpace, PatternName, IsOptional) {
        return this.ParsePatternAfter(NameSpace, null, PatternName, IsOptional);
    };

    GtTokenContext.prototype.SkipAndGetAnnotation = function (IsAllowedDelim) {
        // is: thisimplementation: tentative.the: future: In,have: to: you //
        // this: pattern: use. //
        var Annotation = null;
        this.SkipIndent();
        while (this.MatchToken("@")) {
            var Token = this.Next();
            if (Annotation == null) {
                Annotation = new GtMap();
            }
            Annotation.put(Token.ParsedText, true);
            this.SkipIndent();
            // 			if(this.MatchToken(";")) { //
            // 				if(IsAllowedDelim) { //
            // 					Annotation = null; //statement: empty //
            // 					this.SkipIndent(); //
            // 				} //
            // 				else { //
            // 					return null; //
            // 				} //
            // 			} //
        }
        return Annotation;
    };

    GtTokenContext.prototype.SkipEmptyStatement = function () {
        var Token = null;
        while ((Token = this.GetToken()) != GtTokenContext.NullToken) {
            if (Token.IsIndent() || Token.IsDelim()) {
                this.CurrentPosition += 1;
                continue;
            }
            break;
        }
        return (Token != GtTokenContext.NullToken);
    };

    GtTokenContext.prototype.Dump = function () {
        var pos = this.CurrentPosition;
        while (pos < this.SourceList.size()) {
            var token = this.SourceList.get(pos);
            console.log("DEBUG: " + "[" + pos + "]\t" + token + " : " + token.PresetPattern);
            pos += 1;
        }
    };
    GtTokenContext.NullToken = new GtToken("", 0);
    return GtTokenContext;
})();

var GtSyntaxPattern = (function () {
    function GtSyntaxPattern(NameSpace, PatternName, MatchFunc, TypeFunc) {
        this.PackageNameSpace = NameSpace;
        this.PatternName = PatternName;
        this.SyntaxFlag = 0;
        this.MatchFunc = MatchFunc;
        this.TypeFunc = TypeFunc;
        this.ParentPattern = null;
    }
    GtSyntaxPattern.prototype.toString = function () {
        return this.PatternName + "<" + this.MatchFunc + ">";
    };

    GtSyntaxPattern.prototype.IsBinaryOperator = function () {
        return IsFlag(this.SyntaxFlag, BinaryOperator);
    };

    GtSyntaxPattern.prototype.IsLeftJoin = function (Right) {
        var left = this.SyntaxFlag >> PrecedenceShift;
        var right = Right.SyntaxFlag >> PrecedenceShift;
        return (left < right || (left == right && IsFlag(this.SyntaxFlag, LeftJoin) && IsFlag(Right.SyntaxFlag, LeftJoin)));
    };
    return GtSyntaxPattern;
})();

var GtSyntaxTree = (function () {
    function GtSyntaxTree(Pattern, NameSpace, KeyToken, ConstValue) {
        this.NameSpace = NameSpace;
        this.KeyToken = KeyToken;
        this.Pattern = Pattern;
        this.ParentTree = null;
        this.PrevTree = null;
        this.NextTree = null;
        this.TreeList = null;
        this.ConstValue = ConstValue;
        this.Annotation = null;
    }
    GtSyntaxTree.prototype.toString = function () {
        var s = "(" + this.KeyToken.ParsedText;
        var i = 0;
        while (i < ListSize(this.TreeList)) {
            var SubTree = this.TreeList.get(i);
            while (SubTree != null) {
                var Entry = SubTree.toString();
                if (ListSize(SubTree.TreeList) == 0) {
                    Entry = SubTree.KeyToken.ParsedText;
                }
                s = s + " " + Entry;
                SubTree = SubTree.NextTree;
            }
            i += 1;
        }
        return s + ")";
    };

    GtSyntaxTree.prototype.SetAnnotation = function (Annotation) {
        this.Annotation = Annotation;
    };

    GtSyntaxTree.prototype.HasAnnotation = function (Key) {
        if (this.Annotation != null) {
            var Value = this.Annotation.get(Key);
            if (Value instanceof Boolean) {
                this.Annotation.put(Key, false);
            }
            return (Value != null);
        }
        return false;
    };

    GtSyntaxTree.prototype.IsError = function () {
        return this.KeyToken.IsError();
    };

    GtSyntaxTree.prototype.ToError = function (Token) {
        LangDeps.Assert(Token.IsError());
        this.KeyToken = Token;
        this.TreeList = null;
    };

    GtSyntaxTree.prototype.IsEmpty = function () {
        return (this.KeyToken == GtTokenContext.NullToken && this.Pattern == null);
    };

    GtSyntaxTree.prototype.ToEmpty = function () {
        this.KeyToken = GtTokenContext.NullToken;
        this.TreeList = null;
        this.Pattern = null;
    };

    GtSyntaxTree.prototype.IsEmptyOrError = function () {
        return this.KeyToken == GtTokenContext.NullToken || this.KeyToken.IsError();
    };

    GtSyntaxTree.prototype.ToEmptyOrError = function (ErrorTree) {
        if (ErrorTree == null) {
            this.ToEmpty();
        } else {
            this.ToError(ErrorTree.KeyToken);
        }
    };

    GtSyntaxTree.prototype.GetSyntaxTreeAt = function (Index) {
        if (this.TreeList != null && Index >= this.TreeList.size()) {
            return null;
        }
        return this.TreeList.get(Index);
    };

    GtSyntaxTree.prototype.SetSyntaxTreeAt = function (Index, Tree) {
        if (!this.IsError()) {
            if (Tree.IsError()) {
                this.ToError(Tree.KeyToken);
            } else {
                if (Index >= 0) {
                    if (this.TreeList == null) {
                        this.TreeList = new Array();
                    }
                    if (Index < this.TreeList.size()) {
                        this.TreeList.set(Index, Tree);
                        return;
                    }
                    while (this.TreeList.size() < Index) {
                        this.TreeList.add(null);
                    }
                    this.TreeList.add(Tree);
                    Tree.ParentTree = this;
                }
            }
        }
    };

    GtSyntaxTree.prototype.SetMatchedPatternAt = function (Index, NameSpace, TokenContext, PatternName, IsOptional) {
        if (!this.IsEmptyOrError()) {
            var ParsedTree = TokenContext.ParsePattern(NameSpace, PatternName, IsOptional);
            if (ParsedTree != null) {
                this.SetSyntaxTreeAt(Index, ParsedTree);
            } else if (ParsedTree == null && !IsOptional) {
                this.ToEmpty();
            }
        }
    };

    GtSyntaxTree.prototype.SetMatchedTokenAt = function (Index, NameSpace, TokenContext, TokenText, IsOptional) {
        if (!this.IsEmptyOrError()) {
            var Pos = TokenContext.CurrentPosition;
            var Token = TokenContext.Next();
            if (Token.ParsedText.equals(TokenText)) {
                this.SetSyntaxTreeAt(Index, new GtSyntaxTree(null, NameSpace, Token, null));
            } else {
                TokenContext.CurrentPosition = Pos;
                if (!IsOptional) {
                    this.ToEmptyOrError(TokenContext.ReportExpectedToken(TokenText));
                }
            }
        }
    };

    GtSyntaxTree.prototype.AppendParsedTree = function (Tree) {
        if (!this.IsError()) {
            if (Tree.IsError()) {
                this.ToError(Tree.KeyToken);
            } else {
                if (this.TreeList == null) {
                    this.TreeList = new Array();
                }
                this.TreeList.add(Tree);
            }
        }
    };

    GtSyntaxTree.prototype.GetParsedType = function () {
        return this.ConstValue;
    };

    GtSyntaxTree.prototype.HasNodeAt = function (Index) {
        return this.TreeList != null && Index < this.TreeList.size();
    };

    GtSyntaxTree.prototype.TypeCheckNodeAt = function (Index, Gamma, Type, TypeCheckPolicy) {
        if (this.TreeList != null && Index < this.TreeList.size()) {
            var ParsedTree = this.TreeList.get(Index);
            if (ParsedTree != null) {
                var Node = ApplyTypeFunc(ParsedTree.Pattern.TypeFunc, Gamma, ParsedTree, Type);
                var TypedNode = Gamma.TypeCheckSingleNode(ParsedTree, Node, Type, TypeCheckPolicy);
                return TypedNode;
            }
        }
        if (IsFlag(TypeCheckPolicy, AllowEmptyPolicy)) {
            return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
        }
        return Gamma.CreateErrorNode2(this, "empty: not");
    };
    return GtSyntaxTree;
})();

/* typing */
var GtVariableInfo = (function () {
    function GtVariableInfo(Type, Name, Index) {
        this.Type = Type;
        this.Name = Name;
        this.LocalName = Name + Index;
    }
    return GtVariableInfo;
})();

var GtTypeEnv = (function () {
    function GtTypeEnv(NameSpace) {
        this.NameSpace = NameSpace;
        this.Context = NameSpace.Context;
        this.Generator = NameSpace.Context.Generator;
        this.Method = null;
        this.LocalStackList = new Array();
        this.StackTopIndex = 0;

        this.VoidType = NameSpace.Context.VoidType;
        this.BooleanType = NameSpace.Context.BooleanType;
        this.IntType = NameSpace.Context.IntType;
        this.StringType = NameSpace.Context.StringType;
        this.VarType = NameSpace.Context.VarType;
        this.AnyType = NameSpace.Context.AnyType;
        this.ArrayType = NameSpace.Context.ArrayType;
        this.FuncType = NameSpace.Context.FuncType;
    }
    GtTypeEnv.prototype.IsStrictMode = function () {
        return this.Generator.IsStrictMode();
    };

    GtTypeEnv.prototype.IsTopLevel = function () {
        return (this.Method == null);
    };

    GtTypeEnv.prototype.AppendDeclaredVariable = function (Type, Name) {
        var VarInfo = new GtVariableInfo(Type, Name, this.StackTopIndex);
        if (this.StackTopIndex < this.LocalStackList.size()) {
            this.LocalStackList.set(this.StackTopIndex, VarInfo);
        } else {
            this.LocalStackList.add(VarInfo);
        }
        this.StackTopIndex += 1;
        return true;
    };

    GtTypeEnv.prototype.LookupDeclaredVariable = function (Symbol) {
        var i = this.StackTopIndex - 1;
        while (i >= 0) {
            var VarInfo = this.LocalStackList.get(i);
            if (VarInfo.Name.equals(Symbol)) {
                return VarInfo;
            }
            i -= 1;
        }
        return null;
    };

    GtTypeEnv.prototype.ReportTypeResult = function (ParsedTree, Node, Level, Message) {
        this.NameSpace.Context.ReportError(Level, Node.Token, Message);
        if (!this.IsStrictMode()) {
            return Node;
        }
        return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
    };

    GtTypeEnv.prototype.CreateErrorNode2 = function (ParsedTree, Message) {
        this.NameSpace.Context.ReportError(ErrorLevel, ParsedTree.KeyToken, Message);
        return this.Generator.CreateErrorNode(this.VoidType, ParsedTree);
    };

    GtTypeEnv.prototype.DefaultValueConstNode = function (ParsedTree, Type) {
        if (Type.DefaultNullValue != null) {
            return this.Generator.CreateConstNode(Type, ParsedTree, Type.DefaultNullValue);
        }
        return this.CreateErrorNode2(ParsedTree, "undefinedvalue: of: initial " + Type);
    };

    GtTypeEnv.prototype.SupportedOnlyTopLevelError = function (ParsedTree) {
        return this.CreateErrorNode2(ParsedTree, "supportedat: onlylevel: top " + ParsedTree.Pattern);
    };

    GtTypeEnv.prototype.UnsupportedTopLevelError = function (ParsedTree) {
        return this.CreateErrorNode2(ParsedTree, "unsupportedtop: level: at " + ParsedTree.Pattern);
    };

    /* typing */
    GtTypeEnv.prototype.TypeEachNode = function (Tree, Type) {
        var Node = ApplyTypeFunc(Tree.Pattern.TypeFunc, this, Tree, Type);
        return Node;
    };

    GtTypeEnv.prototype.TypeCheckEachNode = function (Tree, Type, TypeCheckPolicy) {
        var Node = this.TypeEachNode(Tree, Type);
        if (Node.IsError()) {
            return Node;
        }
        return Node;
    };

    GtTypeEnv.prototype.TypeBlock = function (ParsedTree, Type) {
        var StackTopIndex = this.StackTopIndex;
        var LastNode = null;
        while (ParsedTree != null) {
            var CurrentType = Type;
            if (ParsedTree.NextTree != null) {
                CurrentType = this.VoidType;
            }
            var TypedNode = this.TypeCheckEachNode(ParsedTree, CurrentType, DefaultTypeCheckPolicy);
            /*local*/ LastNode = LinkNode(LastNode, TypedNode);
            if (TypedNode.IsError()) {
                break;
            }
            ParsedTree = ParsedTree.NextTree;
        }
        this.StackTopIndex = StackTopIndex;
        if (LastNode == null) {
            return null;
        }
        return LastNode.MoveHeadNode();
    };

    GtTypeEnv.prototype.TypeCheck = function (ParsedTree, Type, TypeCheckPolicy) {
        return this.TypeBlock(ParsedTree, Type);
    };

    GtTypeEnv.prototype.TypeCheckSingleNode = function (ParsedTree, Node, Type, TypeCheckPolicy) {
        if (Node.IsError() || IsFlag(TypeCheckPolicy, NoCheckPolicy)) {
            return Node;
        }
        if (IsFlag(TypeCheckPolicy, AllowVoidPolicy) || Type == this.VoidType) {
            return Node;
        }
        if (Node.Type == this.VarType) {
            return this.ReportTypeResult(ParsedTree, Node, ErrorLevel, "type: unspecified: " + Node.Token.ParsedText);
        }
        if (Node.Type == Type || Type == this.VarType || Type.Accept(Node.Type)) {
            return Node;
        }
        var Method = Type.Context.GetCastMethod(Node.Type, Type, true);
        if (Method != null && (IsFlag(TypeCheckPolicy, CastPolicy) || Method.Is(ImplicitMethod))) {
            var ApplyNode = this.Generator.CreateApplyNode(Type, ParsedTree, Method);
            ApplyNode.Append(Node);
            return ApplyNode;
        }
        return this.ReportTypeResult(ParsedTree, Node, ErrorLevel, "error: type: requested = " + Type + ", given = " + Node.Type);
    };

    GtTypeEnv.prototype.DefineMethod = function (Method) {
        this.NameSpace.Context.DefineMethod(Method);
        var Value = this.NameSpace.GetSymbol(Method.MethodName);
        if (Value == null) {
            this.NameSpace.DefineSymbol(Method.MethodName, Method);
        }
        this.Method = Method;
    };
    return GtTypeEnv;
})();

//  NameSpace //
var GtNameSpace = (function () {
    function GtNameSpace(Context, ParentNameSpace) {
        this.Context = Context;
        this.ParentNameSpace = ParentNameSpace;
        this.PackageName = (ParentNameSpace != null) ? ParentNameSpace.PackageName : null;
        this.TokenMatrix = null;
        this.SymbolPatternTable = null;
    }
    GtNameSpace.prototype.GetTokenFunc = function (GtChar2) {
        if (this.TokenMatrix == null) {
            return this.ParentNameSpace.GetTokenFunc(GtChar2);
        }
        return this.TokenMatrix[GtChar2];
    };

    GtNameSpace.prototype.DefineTokenFunc = function (keys, f) {
        var i = 0;
        if (this.TokenMatrix == null) {
            this.TokenMatrix = new Array(MaxSizeOfChars);
            if (this.ParentNameSpace != null) {
                while (i < MaxSizeOfChars) {
                    this.TokenMatrix[i] = this.ParentNameSpace.GetTokenFunc(i);
                }
            }
        }
        i = 0;
        while (i < keys.length) {
            var kchar = AsciiToTokenMatrixIndex(LangDeps.CharAt(keys, i));
            this.TokenMatrix[kchar] = LangDeps.CreateOrReuseTokenFunc(f, this.TokenMatrix[kchar]);
            i += 1;
        }
    };

    GtNameSpace.prototype.GetSymbol = function (Key) {
        var NameSpace = this;
        while (NameSpace != null) {
            if (NameSpace.SymbolPatternTable != null) {
                var Value = NameSpace.SymbolPatternTable.get(Key);
                if (Value != null) {
                    return Value;
                }
            }
            NameSpace = NameSpace.ParentNameSpace;
        }
        return null;
    };

    GtNameSpace.prototype.DefineSymbol = function (Key, Value) {
        if (this.SymbolPatternTable == null) {
            this.SymbolPatternTable = new GtMap();
        }
        this.SymbolPatternTable.put(Key, Value);
    };

    GtNameSpace.prototype.GetPattern = function (PatternName) {
        var Body = this.GetSymbol(PatternName);
        if (Body instanceof GtSyntaxPattern) {
            return Body;
        }
        return null;
    };

    GtNameSpace.prototype.GetExtendedPattern = function (PatternName) {
        var Body = this.GetSymbol("\t" + PatternName);
        if (Body instanceof GtSyntaxPattern) {
            return Body;
        }
        return null;
    };

    GtNameSpace.prototype.AppendPattern = function (PatternName, NewPattern) {
        LangDeps.Assert(NewPattern.ParentPattern == null);
        var ParentPattern = this.GetPattern(PatternName);
        NewPattern.ParentPattern = ParentPattern;
        this.DefineSymbol(PatternName, NewPattern);
    };

    GtNameSpace.prototype.DefineSyntaxPattern = function (PatternName, MatchFunc, TypeFunc) {
        var Pattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
        this.AppendPattern(PatternName, Pattern);
    };

    GtNameSpace.prototype.DefineExtendedPattern = function (PatternName, SyntaxFlag, MatchFunc, TypeFunc) {
        var Pattern = new GtSyntaxPattern(this, PatternName, MatchFunc, TypeFunc);
        Pattern.SyntaxFlag = SyntaxFlag;
        this.AppendPattern("\t" + PatternName, Pattern);
    };

    GtNameSpace.prototype.DefineClassSymbol = function (ClassInfo) {
        if (ClassInfo.PackageNameSpace == null) {
            ClassInfo.PackageNameSpace = this;
            if (this.PackageName != null) {
                this.Context.ClassNameMap.put(this.PackageName + "." + ClassInfo.ShortClassName, ClassInfo);
            }
        }
        if (ClassInfo.BaseClass == ClassInfo) {
            this.DefineSymbol(ClassInfo.ShortClassName, ClassInfo);
        }
        return ClassInfo;
    };
    return GtNameSpace;
})();

var GtGrammar = (function () {
    function GtGrammar() {
    }
    GtGrammar.prototype.LoadTo = function (NameSpace) {
        /*extension*/
    };
    return GtGrammar;
})();

var DScriptGrammar = (function (_super) {
    __extends(DScriptGrammar, _super);
    function DScriptGrammar() {
        _super.apply(this, arguments);
    }
    DScriptGrammar.WhiteSpaceToken = //  Token //
    function (TokenContext, SourceText, pos) {
        TokenContext.FoundWhiteSpace();
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (!LangDeps.IsWhitespace(ch)) {
                break;
            }
            pos += 1;
        }
        return pos;
    };

    DScriptGrammar.IndentToken = function (TokenContext, SourceText, pos) {
        var LineStart = pos + 1;
        TokenContext.FoundLineFeed(1);
        pos = pos + 1;
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (!LangDeps.IsWhitespace(ch)) {
                break;
            }
            pos += 1;
        }
        var Text = "";
        if (LineStart < pos) {
            Text = SourceText.substring(LineStart, pos);
        }
        TokenContext.AddNewToken(Text, IndentTokenFlag, null);
        return pos;
        // TokenContext.AddNewToken(SourceText.substring(pos), SourceTokenFlag, null); //
        // return SourceText.length; //
    };

    DScriptGrammar.SymbolToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (!LangDeps.IsLetter(ch) && !LangDeps.IsDigit(ch) && ch != 95) {
                break;
            }
            pos += 1;
        }
        TokenContext.AddNewToken(SourceText.substring(start, pos), NameSymbolTokenFlag, null);
        return pos;
    };

    DScriptGrammar.OperatorToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        while (NextPos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, NextPos);
            if (LangDeps.IsWhitespace(ch) || LangDeps.IsLetter(ch) || LangDeps.IsDigit(ch)) {
                break;
            }
            NextPos += 1;
        }
        var Matched = false;
        while (NextPos > pos) {
            var Sub = SourceText.substring(pos, NextPos);
            var Pattern = TokenContext.TopLevelNameSpace.GetExtendedPattern(Sub);
            if (Pattern != null) {
                Matched = true;
                break;
            }
            NextPos -= 1;
        }

        if (Matched == false) {
            NextPos = pos + 1;
        }
        TokenContext.AddNewToken(SourceText.substring(pos, NextPos), 0, null);
        return NextPos;
    };

    DScriptGrammar.CommentToken = function (TokenContext, SourceText, pos) {
        var NextPos = pos + 1;
        if (NextPos < SourceText.length) {
            var NextChar = LangDeps.CharAt(SourceText, NextPos);
            if (NextChar != 47 && NextChar != 42) {
                return NoMatch;
            }
            var Level = 0;
            var PrevChar = 0;
            if (NextChar == 42) {
                Level = 1;
            }
            while (NextPos < SourceText.length) {
                NextChar = LangDeps.CharAt(SourceText, NextPos);
                if (NextChar == ('\n'.charCodeAt(0)) && Level == 0) {
                    return DScriptGrammar.IndentToken(TokenContext, SourceText, NextPos);
                }
                if (NextChar == 47 && PrevChar == 42) {
                    if (Level == 1) {
                        return NextPos + 1;
                    }
                    Level = Level - 1;
                }
                if (Level > 0) {
                    if (NextChar == 42 && PrevChar == 47) {
                        Level = Level + 1;
                    }
                }
                NextPos = NextPos + 1;
            }
        }
        return NoMatch;
    };

    DScriptGrammar.NumberLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos;
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (!LangDeps.IsDigit(ch)) {
                break;
            }
            pos += 1;
        }
        TokenContext.AddNewToken(SourceText.substring(start, pos), 0, "$IntegerLiteral$");
        return pos;
    };

    DScriptGrammar.StringLiteralToken = function (TokenContext, SourceText, pos) {
        var start = pos + 1;
        var prev = 34/*"*/ ;
        pos = pos + 1;
        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);
            if (ch == 34 && prev != ('\\'.charCodeAt(0))) {
                TokenContext.AddNewToken(SourceText.substring(start, pos), QuotedTokenFlag, "$StringLiteral$");
                return pos + 1;
            }
            if (ch == ('\n'.charCodeAt(0))) {
                TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, pos));
                TokenContext.FoundLineFeed(1);
                return pos;
            }
            pos = pos + 1;
            prev = ch;
        }
        TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, pos));
        return pos;
    };

    DScriptGrammar.StringLiteralToken_StringInterpolation = function (TokenContext, SourceText, pos) {
        var start = pos + 1;
        var NextPos = start;
        var prev = 34/*"*/ ;
        while (NextPos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, NextPos);
            if (ch == 36) {
                var end = NextPos + 1;
                ch = LangDeps.CharAt(SourceText, end);
                if (ch == 123) {
                    while (end < SourceText.length) {
                        ch = LangDeps.CharAt(SourceText, end);
                        if (ch == 125) {
                            break;
                        }
                        end = end + 1;
                    }
                    var Expr = SourceText.substring(NextPos + 2, end);
                    var LocalContext = new GtTokenContext(TokenContext.TopLevelNameSpace, Expr, TokenContext.ParsingLine);
                    LocalContext.SkipEmptyStatement();

                    TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
                    TokenContext.AddNewToken("+", 0, null);
                    while (LocalContext.HasNext()) {
                        var NewToken = LocalContext.Next();
                        TokenContext.AddNewToken(NewToken.ParsedText, 0, null);
                    }
                    TokenContext.AddNewToken("+", 0, null);
                    end = end + 1;
                    start = end;
                    NextPos = end;
                    prev = ch;
                    if (ch == 34) {
                        TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
                        return NextPos + 1;
                    }
                    continue;
                }
            }
            if (ch == 34 && prev != ('\\'.charCodeAt(0))) {
                TokenContext.AddNewToken(SourceText.substring(start, NextPos), 0, "$StringLiteral$");
                return NextPos + 1;
            }
            if (ch == ('\n'.charCodeAt(0))) {
                TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, NextPos));
                TokenContext.FoundLineFeed(1);
                return NextPos;
            }
            NextPos = NextPos + 1;
            prev = ch;
        }
        TokenContext.ReportTokenError(ErrorLevel, "expected \"close: tostring: literal: the", SourceText.substring(start, NextPos));
        return NextPos;
    };

    DScriptGrammar.ParseType = // and: parserchecker: type //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (!(ConstValue instanceof GtType)) {
            return null;
        }
        var ParsedType = ConstValue;
        var BacktrackPosition = TokenContext.CurrentPosition;
        if (ParsedType.IsGenericType()) {
            if (TokenContext.MatchToken("<")) {
                var TypeList = new Array();
                while (!TokenContext.MatchToken(">")) {
                    var ParamTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
                    if (ParamTree == null) {
                        TokenContext.CurrentPosition = BacktrackPosition;
                        return new GtSyntaxTree(Pattern, NameSpace, Token, ParsedType);
                    }
                    TypeList.add(ParamTree.GetParsedType());
                    if (TokenContext.MatchToken(",")) {
                        continue;
                    }
                }
                ParsedType = NameSpace.Context.GetGenericType(ParsedType, 0, TypeList, true);
                BacktrackPosition = TokenContext.CurrentPosition;
            }
        }
        while (TokenContext.MatchToken("[")) {
            if (!TokenContext.MatchToken("]")) {
                TokenContext.CurrentPosition = BacktrackPosition;
                return new GtSyntaxTree(Pattern, NameSpace, Token, ParsedType);
            }
            ParsedType = NameSpace.Context.GetGenericType1(NameSpace.Context.ArrayType, ParsedType, true);
            BacktrackPosition = TokenContext.CurrentPosition;
        }
        return new GtSyntaxTree(Pattern, NameSpace, Token, ParsedType);
    };

    DScriptGrammar.ParseConst = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var ConstValue = NameSpace.GetSymbol(Token.ParsedText);
        if (ConstValue != null) {
            return new GtSyntaxTree(Pattern, NameSpace, Token, ConstValue);
        }
        return null;
    };

    DScriptGrammar.TypeConst = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ParsedTree.ConstValue), ParsedTree, ParsedTree.ConstValue);
    };

    DScriptGrammar.ParseNull = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("null");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return NewTree;
    };

    DScriptGrammar.TypeNull = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateNullNode(ContextType, ParsedTree);
    };

    DScriptGrammar.ParseSymbol = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TypeTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
        if (TypeTree != null) {
            var DeclTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$FuncDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            DeclTree = TokenContext.ParsePatternAfter(NameSpace, TypeTree, "$VarDecl$", Optional);
            if (DeclTree != null) {
                return DeclTree;
            }
            return TypeTree;
        }
        var Token = TokenContext.Next();

        // 		var ConstValue: Object = NameSpace.GetSymbol(Token.ParsedText); //
        // 		if(ConstValue != null && !(ConstValue instanceof GtType)) { //
        // 			return new GtSyntaxTree(NameSpace.GetPattern("$Const$"), NameSpace, Token, ConstValue); //
        // 		} //
        return new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, Token, null);
    };

    DScriptGrammar.ParseVariable = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var ch = LangDeps.CharAt(Token.ParsedText, 0);
        if (LangDeps.IsLetter(ch) || ch == 95) {
            return new GtSyntaxTree(Pattern, NameSpace, Token, null);
        }
        return null;
    };

    DScriptGrammar.TypeVariable = function (Gamma, ParsedTree, ContextType) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var VariableInfo = Gamma.LookupDeclaredVariable(Name);
        if (VariableInfo != null) {
            return Gamma.Generator.CreateLocalNode(VariableInfo.Type, ParsedTree, VariableInfo.LocalName);
        }
        var ConstValue = Gamma.NameSpace.GetSymbol(Name);
        if (ConstValue != null) {
            return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
        }
        var Node = Gamma.Generator.CreateConstNode(Gamma.AnyType, ParsedTree, Name);
        return Gamma.ReportTypeResult(ParsedTree, Node, ErrorLevel, "undefined name: " + Name);
    };

    DScriptGrammar.ParseVarDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
        if (LeftTree == null) {
            Tree.SetMatchedPatternAt(VarDeclType, NameSpace, TokenContext, "$Type$", Required);
        } else {
            Tree.SetSyntaxTreeAt(VarDeclType, LeftTree);
        }
        Tree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
        if (Tree.IsEmptyOrError()) {
            return null;
        }
        if (TokenContext.MatchToken("=")) {
            Tree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
        }
        while (TokenContext.MatchToken(",")) {
            var NextTree = new GtSyntaxTree(Pattern, NameSpace, Tree.KeyToken, null);
            NextTree.SetSyntaxTreeAt(VarDeclType, Tree.GetSyntaxTreeAt(VarDeclType));
            Tree = LinkTree(Tree, NextTree);
            Tree.SetMatchedPatternAt(VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
            if (TokenContext.MatchToken("=")) {
                Tree.SetMatchedPatternAt(VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
            }
        }
        return Tree;
    };

    DScriptGrammar.TypeVarDecl = function (Gamma, ParsedTree, ContextType) {
        var TypeTree = ParsedTree.GetSyntaxTreeAt(VarDeclType);
        var NameTree = ParsedTree.GetSyntaxTreeAt(VarDeclName);
        var ValueTree = ParsedTree.GetSyntaxTreeAt(VarDeclValue);
        var DeclType = TypeTree.GetParsedType();
        var VariableName = NameTree.KeyToken.ParsedText;
        Gamma.AppendDeclaredVariable(DeclType, VariableName);
        var VariableNode = Gamma.TypeCheck(NameTree, DeclType, DefaultTypeCheckPolicy);
        if (VariableNode.IsError()) {
            return VariableNode;
        }
        var InitValueNode = null;
        if (ValueTree == null) {
            InitValueNode = Gamma.DefaultValueConstNode(ParsedTree, DeclType);
        } else {
            InitValueNode = Gamma.TypeCheck(ValueTree, DeclType, DefaultTypeCheckPolicy);
        }
        var BlockNode = Gamma.TypeBlock(ParsedTree.NextTree, ContextType);
        ParsedTree.NextTree = null;
        return Gamma.Generator.CreateLetNode(DeclType, ParsedTree, DeclType, (VariableNode).LocalName, InitValueNode, BlockNode);
    };

    DScriptGrammar.ParseIntegerLiteral = // And: Type: Parse //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        return new GtSyntaxTree(Pattern, NameSpace, Token, LangDeps.ParseInt(Token.ParsedText));
    };

    DScriptGrammar.ParseStringLiteral = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
        return NewTree;
    };

    DScriptGrammar.ParseExpression = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return ParseExpression(NameSpace, TokenContext);
    };

    DScriptGrammar.ParseUnary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var Tree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        Tree.SetMatchedPatternAt(UnaryTerm, NameSpace, TokenContext, "$Expression$", Required);
        return Tree;
    };

    DScriptGrammar.TypeUnary = function (Gamma, ParsedTree, ContextType) {
        var ExprNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateUnaryNode(Gamma.AnyType, ParsedTree, null, ExprNode);
    };

    DScriptGrammar.ParseBinary = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var RightTree = ParseExpression(NameSpace, TokenContext);
        if (IsEmptyOrError(RightTree)) {
            return RightTree;
        }
        if (RightTree.Pattern.IsBinaryOperator()) {
            if (Pattern.IsLeftJoin(RightTree.Pattern)) {
                var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
                NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
                NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree.GetSyntaxTreeAt(LeftHandTerm));
                RightTree.SetSyntaxTreeAt(LeftHandTerm, NewTree);
                return RightTree;
            }
        }
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        NewTree.SetSyntaxTreeAt(LeftHandTerm, LeftTree);
        NewTree.SetSyntaxTreeAt(RightHandTerm, RightTree);
        if (RightTree.NextTree != null) {
            LinkTree(NewTree, RightTree.NextTree);
            RightTree.NextTree = null;
        }
        return NewTree;
    };

    DScriptGrammar.TypeBinary = function (Gamma, ParsedTree, ContextType) {
        var Operator = ParsedTree.KeyToken.ParsedText;
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (!LeftNode.IsError() && !RightNode.IsError()) {
            var BaseType = LeftNode.Type;
            while (BaseType != null) {
                var Method = Gamma.Context.GetListedMethod(BaseType, Operator, 1, false);
                while (Method != null) {
                    if (Method.GetFuncParamType(1).Accept(RightNode.Type)) {
                        return Gamma.Generator.CreateBinaryNode(Method.GetReturnType(), ParsedTree, Method, LeftNode, RightNode);
                    }
                    Method = Method.ListedMethods;
                }
                BaseType = BaseType.SearchSuperMethodClass;
            }
            Gamma.Context.ReportError(WarningLevel, ParsedTree.KeyToken, "operator: undefined: " + Operator + " of " + LeftNode.Type);
        }
        return Gamma.Generator.CreateBinaryNode(ContextType, ParsedTree, null, LeftNode, RightNode);
    };

    DScriptGrammar.ParseGetter = function (NameSpace, TokenContext, LeftTree, Pattern) {
        TokenContext.MatchToken(".");
        var Token = TokenContext.Next();
        if (Token.IsNameSymbol()) {
            var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
            NewTree.AppendParsedTree(LeftTree);
            return NewTree;
        }
        return TokenContext.ReportExpectedToken("name: field");
    };

    DScriptGrammar.TypeGetter = function (Gamma, ParsedTree, ContextType) {
        var Name = ParsedTree.KeyToken.ParsedText;
        var ObjectNode = ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        if (ObjectNode.IsError()) {
            return ObjectNode;
        }

        if (ObjectNode instanceof ConstNode && ObjectNode.Type == Gamma.Context.TypeType) {
            var ObjectType = (ObjectNode).ConstValue;
            var ConstValue = ObjectType.GetClassSymbol(Name, true);
            if (ConstValue != null) {
                return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(ConstValue), ParsedTree, ConstValue);
            }
        }
        var Method = Gamma.Context.GetGetterMethod(ObjectNode.Type, Name, true);
        var ReturnType = (Method != null) ? Method.GetReturnType() : Gamma.AnyType;
        var Node = Gamma.Generator.CreateGetterNode(ReturnType, ParsedTree, Method, ObjectNode);
        if (Method == null) {
            if (!ObjectNode.Type.IsDynamic() && ContextType != Gamma.FuncType) {
                return Gamma.ReportTypeResult(ParsedTree, Node, ErrorLevel, "undefined name " + Name + " of " + ObjectNode.Type);
            }
        }
        return Node;
    };

    DScriptGrammar.ParseGroup = //  PatternName: "(" //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var GroupTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("("), null);
        var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
        GroupTree.AppendParsedTree(Tree);
        if (!TokenContext.MatchToken(")")) {
            GroupTree = TokenContext.ReportExpectedToken(")");
        }
        TokenContext.ParseFlag = ParseFlag;
        return GroupTree;
    };

    DScriptGrammar.TypeGroup = function (Gamma, ParsedTree, ContextType) {
        return ParsedTree.TypeCheckNodeAt(UnaryTerm, Gamma, ContextType, DefaultTypeCheckPolicy);
    };

    DScriptGrammar.ParseCast = //  PatternName: "(" "to" $Type$ ")" //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var FirstToken = TokenContext.Next();
        var CastTree = null;
        if (TokenContext.MatchToken("to")) {
            CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("to"), null);
        } else if (TokenContext.MatchToken("as")) {
            CastTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("as"), null);
        } else {
            CastTree = new GtSyntaxTree(Pattern, NameSpace, FirstToken, null);
        }
        CastTree.SetMatchedPatternAt(LeftHandTerm, NameSpace, TokenContext, "$Type$", Required);
        CastTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        TokenContext.ParseFlag = ParseFlag;
        CastTree.SetMatchedPatternAt(RightHandTerm, NameSpace, TokenContext, "$Expression$", Required);
        return CastTree;
    };

    DScriptGrammar.TypeCast = function (Gamma, ParsedTree, ContextType) {
        var CastType = ParsedTree.GetSyntaxTreeAt(LeftHandTerm).GetParsedType();
        var TypeCheckPolicy = CastPolicy;
        return ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, CastType, TypeCheckPolicy);
    };

    DScriptGrammar.ParseApply = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var FuncTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("("), null);
        FuncTree.AppendParsedTree(LeftTree);
        if (!TokenContext.MatchToken(")")) {
            while (!FuncTree.IsEmptyOrError()) {
                var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
                FuncTree.AppendParsedTree(Tree);
                if (TokenContext.MatchToken(")"))
                    break;
                FuncTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
            }
        }
        TokenContext.ParseFlag = ParseFlag;
        return FuncTree;
    };

    DScriptGrammar.TypeApply = function (Gamma, ParsedTree, ContextType) {
        var FuncNode = ParsedTree.TypeCheckNodeAt(0, Gamma, Gamma.FuncType, NoCheckPolicy);
        var MethodName = FuncNode.Token.ParsedText;
        var BaseType = null;
        var NodeList = new Array();
        var ParamIndex = 1;
        var ParamSize = ListSize(ParsedTree.TreeList) - 1;
        if (FuncNode.IsError()) {
            return FuncNode;
        }
        if (FuncNode instanceof GetterNode) {
            var BaseNode = (FuncNode).Expr;
            NodeList.add(BaseNode);
            BaseType = FuncNode.Type;
        } else if (ParamSize > 0) {
            var BaseNode = ParsedTree.TypeCheckNodeAt(1, Gamma, Gamma.AnyType, DefaultTypeCheckPolicy);
            NodeList.add(BaseNode);
            ParamIndex = 2;
            BaseType = BaseNode.Type;
        } else {
            BaseType = Gamma.VoidType;
        }
        return DScriptGrammar.TypeFuncParam(Gamma, ParsedTree, MethodName, BaseType, NodeList, ParamIndex, ParamSize);
    };

    DScriptGrammar.TypeFuncParam = function (Gamma, ParsedTree, MethodName, BaseType, NodeList, ParamIndex, ParamSize) {
        var Method = Gamma.Context.GetListedMethod(BaseType, MethodName, ParamSize - 1, true);
        var ReturnType = Gamma.AnyType;
        if (Method == null) {
            if (!BaseType.IsDynamic()) {
                var TypeError = Gamma.CreateErrorNode2(ParsedTree, "undefined function " + MethodName + " of " + BaseType);
                if (Gamma.IsStrictMode()) {
                    return TypeError;
                }
            } else {
                while (ParamIndex < ListSize(ParsedTree.TreeList)) {
                    var Node = ParsedTree.TypeCheckNodeAt(ParamIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
                    if (Node.IsError()) {
                        return Node;
                    }
                    NodeList.add(Node);
                    ParamIndex = ParamIndex + 1;
                }
            }
        } else {
            if (Method.ListedMethods == null) {
                console.log("DEBUG: " + "Typing: Contextual");
                while (ParamIndex < ListSize(ParsedTree.TreeList)) {
                    var Node = ParsedTree.TypeCheckNodeAt(ParamIndex, Gamma, Method.Types[ParamIndex], DefaultTypeCheckPolicy);
                    if (Node.IsError()) {
                        return Node;
                    }
                    NodeList.add(Node);
                    ParamIndex = ParamIndex + 1;
                }
                ReturnType = Method.GetReturnType();
            } else {
                while (ParamIndex < ListSize(ParsedTree.TreeList)) {
                    var Node = ParsedTree.TypeCheckNodeAt(ParamIndex, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
                    if (Node.IsError()) {
                        return Node;
                    }
                    NodeList.add(Node);
                    ParamIndex = ParamIndex + 1;
                }
                Method = DScriptGrammar.LookupOverloadedMethod(Gamma, Method, NodeList);
                if (Method == null) {
                    var TypeError = Gamma.CreateErrorNode2(ParsedTree, "method: mismatched " + MethodName + " of " + BaseType);
                    if (Gamma.IsStrictMode()) {
                        return TypeError;
                    }
                }
                ReturnType = Method.GetReturnType();
            }
        }
        var Node = Gamma.Generator.CreateApplyNode(ReturnType, ParsedTree, Method);
        var i = 0;
        while (i < NodeList.size()) {
            Node.Append(NodeList.get(i));
            i = i + 1;
        }
        return Node;
    };

    DScriptGrammar.ExactlyMatchMethod = function (Method, NodeList) {
        var p = 1;
        while (p < ListSize(NodeList)) {
            var ParamNode = NodeList.get(p);
            if (Method.Types[p + 1] != ParamNode.Type) {
                return false;
            }
            p = p + 1;
        }
        return true;
    };

    DScriptGrammar.AcceptablyMatchMethod = function (Gamma, Method, NodeList) {
        var p = 1;
        while (p < ListSize(NodeList)) {
            var ParamNode = NodeList.get(p);
            if (!Method.Types[p + 1].Accept(ParamNode.Type)) {
                return false;
            }
        }
        return true;
    };

    DScriptGrammar.LookupOverloadedMethod = function (Gamma, Method, NodeList) {
        var StartMethod = Method;
        var BaseType = Method.GetRecvType();
        var MethodName = Method.MangledName;
        var ParamSize = Method.GetMethodParamSize();
        while (Method != null) {
            if (DScriptGrammar.ExactlyMatchMethod(Method, NodeList)) {
                return Method;
            }
            Method = Method.ListedMethods;
            if (Method == null) {
                BaseType = BaseType.SearchSuperMethodClass;
                if (BaseType == null) {
                    break;
                }
                Method = Gamma.Context.GetListedMethod(BaseType, MethodName, ParamSize, false);
            }
        }
        Method = StartMethod;
        BaseType = Method.GetRecvType();
        while (Method != null) {
            if (DScriptGrammar.AcceptablyMatchMethod(Gamma, Method, NodeList)) {
                return Method;
            }
            Method = Method.ListedMethods;
            if (Method == null) {
                BaseType = BaseType.SearchSuperMethodClass;
                if (BaseType == null) {
                    break;
                }
                Method = Gamma.Context.GetListedMethod(BaseType, MethodName, ParamSize, false);
            }
        }
        return null;
    };

    DScriptGrammar.TypeAnd = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAndNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    DScriptGrammar.TypeOr = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateOrNode(Gamma.BooleanType, ParsedTree, LeftNode, RightNode);
    };

    DScriptGrammar.TypeAssign = function (Gamma, ParsedTree, ContextType) {
        var LeftNode = ParsedTree.TypeCheckNodeAt(LeftHandTerm, Gamma, Gamma.VarType, DefaultTypeCheckPolicy);
        var RightNode = ParsedTree.TypeCheckNodeAt(RightHandTerm, Gamma, LeftNode.Type, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateAssignNode(LeftNode.Type, ParsedTree, LeftNode, RightNode);
    };

    DScriptGrammar.ParseEmpty = function (NameSpace, TokenContext, LeftTree, Pattern) {
        return new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetBeforeToken(), null);
    };

    DScriptGrammar.TypeEmpty = function (Gamma, ParsedTree, Type) {
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    DScriptGrammar.ParseBlock = function (ParentNameSpace, TokenContext, LeftTree, Pattern) {
        if (TokenContext.MatchToken("{")) {
            var PrevTree = null;
            var NameSpace = new GtNameSpace(ParentNameSpace.Context, ParentNameSpace);
            while (TokenContext.SkipEmptyStatement()) {
                if (TokenContext.MatchToken("}")) {
                    break;
                }
                var Annotation = TokenContext.SkipAndGetAnnotation(true);
                var CurrentTree = ParseExpression(NameSpace, TokenContext);
                if (IsEmptyOrError(CurrentTree)) {
                    return CurrentTree;
                }
                CurrentTree.SetAnnotation(Annotation);
                PrevTree = LinkTree(PrevTree, CurrentTree);
            }
            if (PrevTree == null) {
                return TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
            }
            return TreeHead(PrevTree);
        }
        return null;
    };

    DScriptGrammar.ParseStatement = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var StmtTree = TokenContext.ParsePattern(NameSpace, "$Block$", Optional);
        if (StmtTree == null) {
            StmtTree = ParseExpression(NameSpace, TokenContext);
        }
        if (StmtTree == null) {
            StmtTree = TokenContext.ParsePattern(NameSpace, "$Empty$", Required);
        }
        return StmtTree;
    };

    DScriptGrammar.TypeBlock = function (Gamma, ParsedTree, ContextType) {
        return Gamma.TypeBlock(ParsedTree, ContextType);
    };

    DScriptGrammar.ParseIf = // Statement: If //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        var Token = TokenContext.GetMatchedToken("if");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        NewTree.SetMatchedPatternAt(IfCond, NameSpace, TokenContext, "$Expression$", Required);
        NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        NewTree.SetMatchedPatternAt(IfThen, NameSpace, TokenContext, "$Statement$", Required);
        if (TokenContext.MatchToken("else")) {
            NewTree.SetMatchedPatternAt(IfElse, NameSpace, TokenContext, "$Statement$", Required);
        }
        TokenContext.ParseFlag = ParseFlag;
        return NewTree;
    };

    DScriptGrammar.TypeIf = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckNodeAt(IfCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var ThenNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(IfThen), ContextType);
        var ElseNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(IfElse), ThenNode.Type);
        return Gamma.Generator.CreateIfNode(ThenNode.Type, ParsedTree, CondNode, ThenNode, ElseNode);
    };

    DScriptGrammar.ParseWhile = // Statement: While //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var WhileTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("while"), null);
        WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        WhileTree.SetMatchedPatternAt(WhileCond, NameSpace, TokenContext, "$Expression$", Required);
        WhileTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        WhileTree.SetMatchedPatternAt(WhileBody, NameSpace, TokenContext, "$Block$", Required);
        return WhileTree;
    };

    DScriptGrammar.TypeWhile = function (Gamma, ParsedTree, ContextType) {
        var CondNode = ParsedTree.TypeCheckNodeAt(WhileCond, Gamma, Gamma.BooleanType, DefaultTypeCheckPolicy);
        var BodyNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(WhileBody), ContextType);
        return Gamma.Generator.CreateWhileNode(BodyNode.Type, ParsedTree, CondNode, BodyNode);
    };

    DScriptGrammar.ParseBreak = //  Break/Statement: Continue //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("break");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return NewTree;
    };

    DScriptGrammar.TypeBreak = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateBreakNode(Gamma.VoidType, ParsedTree, null, "");
    };

    DScriptGrammar.ParseContinue = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.GetMatchedToken("continue");
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        return NewTree;
    };

    DScriptGrammar.TypeContinue = function (Gamma, ParsedTree, ContextType) {
        return Gamma.Generator.CreateContinueNode(Gamma.VoidType, ParsedTree, null, "");
    };

    DScriptGrammar.ParseReturn = // Statement: Return //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ReturnTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("return"), null);
        ReturnTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Optional);
        return ReturnTree;
    };

    DScriptGrammar.TypeReturn = function (Gamma, ParsedTree, ContextType) {
        if (Gamma.IsTopLevel()) {
            return Gamma.UnsupportedTopLevelError(ParsedTree);
        }
        var ReturnType = Gamma.Method.GetReturnType();
        var Expr = ParsedTree.TypeCheckNodeAt(ReturnExpr, Gamma, ReturnType, DefaultTypeCheckPolicy);
        if (ReturnType == Gamma.VoidType) {
            return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, null);
        }
        return Gamma.Generator.CreateReturnNode(Expr.Type, ParsedTree, Expr);
    };

    DScriptGrammar.ParseTry = //  try //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var TryTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("try"), null);
        TryTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$Block$", Required);
        if (TokenContext.MatchToken("catch")) {
            TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
            TryTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$VarDecl$", Required);
            TryTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
            TryTree.SetMatchedPatternAt(CatchBody, NameSpace, TokenContext, "$Block$", Required);
        }
        if (TokenContext.MatchToken("finally")) {
            TryTree.SetMatchedPatternAt(FinallyBody, NameSpace, TokenContext, "$Block$", Required);
        }
        return TryTree;
    };

    DScriptGrammar.TypeTry = function (Gamma, ParsedTree, ContextType) {
        var FaultType = ContextType;
        var TryNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(TryBody), ContextType);
        var CatchExpr = ParsedTree.TypeCheckNodeAt(CatchVariable, Gamma, FaultType, DefaultTypeCheckPolicy);
        var CatchNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(CatchBody), ContextType);
        var FinallyNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(FinallyBody), ContextType);
        return Gamma.Generator.CreateTryNode(TryNode.Type, ParsedTree, TryNode, CatchExpr, CatchNode, FinallyNode);
    };

    DScriptGrammar.ParseThrow = //  throw $Expr$ //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ThrowTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("throw"), null);
        ThrowTree.SetMatchedPatternAt(ReturnExpr, NameSpace, TokenContext, "$Expression$", Required);
        return ThrowTree;
    };

    DScriptGrammar.TypeThrow = function (Gamma, ParsedTree, ContextType) {
        var FaultType = ContextType;
        var ExprNode = ParsedTree.TypeCheckNodeAt(ReturnExpr, Gamma, FaultType, DefaultTypeCheckPolicy);
        return Gamma.Generator.CreateThrowNode(ExprNode.Type, ParsedTree, ExprNode);
    };

    DScriptGrammar.ParseNew = //  new $Type ( $Expr$ [, $Expr$] ) //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("new"), null);
        var ParseFlag = TokenContext.ParseFlag;
        TokenContext.ParseFlag |= SkipIndentParseFlag;
        NewTree.SetMatchedPatternAt(CallExpressionOffset, NameSpace, TokenContext, "$Type$", Required);
        TokenContext.MatchToken("(");
        if (!TokenContext.MatchToken(")")) {
            while (!NewTree.IsEmptyOrError()) {
                var Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Required);
                NewTree.AppendParsedTree(Tree);
                if (TokenContext.MatchToken(")")) {
                    break;
                }
                NewTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
            }
        }
        TokenContext.ParseFlag = ParseFlag;
        return NewTree;
    };

    DScriptGrammar.TypeNew = function (Gamma, ParsedTree, ContextType) {
        //  new $Type$($Params$) => constructor(new $Type$, $Params$) //
        var ReturnType = ParsedTree.GetSyntaxTreeAt(CallExpressionOffset).GetParsedType();
        var MethodName = "constructor";
        var ParamList = new Array();
        var ParamIndex = 1;
        var ParamSize = ListSize(ParsedTree.TreeList);
        ParamList.add(Gamma.Generator.CreateNewNode(ReturnType, ParsedTree));
        return DScriptGrammar.TypeFuncParam(Gamma, ParsedTree, MethodName, ReturnType, ParamList, ParamIndex, ParamSize);
    };

    DScriptGrammar.ParseEnum = //  switch //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var EnumTypeName = null;
        var NewEnumType = null;
        var VocabMap = new GtMap();
        var EnumTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("enum"), null);
        EnumTree.SetMatchedPatternAt(EnumNameTreeIndex, NameSpace, TokenContext, "$FuncName$", Required);
        if (!EnumTree.IsEmptyOrError()) {
            EnumTypeName = EnumTree.GetSyntaxTreeAt(EnumNameTreeIndex).KeyToken.ParsedText;
            if (NameSpace.GetSymbol(EnumTypeName) != null) {
                NameSpace.Context.ReportError(ErrorLevel, EnumTree.KeyToken, "alreadyname: defined: " + EnumTypeName);
            }
            NewEnumType = new GtType(NameSpace.Context, EnumClass, EnumTypeName, null, VocabMap);
        }
        EnumTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
        var EnumValue = 0;
        while (!EnumTree.IsEmptyOrError()) {
            TokenContext.SkipIndent();
            if (TokenContext.MatchToken(",")) {
                continue;
            }
            if (TokenContext.MatchToken("}")) {
                break;
            }
            var Token = TokenContext.Next();
            if (LangDeps.IsLetter(LangDeps.CharAt(Token.ParsedText, 0))) {
                if (VocabMap.get(Token.ParsedText) != null) {
                    NameSpace.Context.ReportError(WarningLevel, Token, "alreadyname: defined: " + Token.ParsedText);
                    continue;
                }
                VocabMap.put(Token.ParsedText, new GreenTeaEnum(NewEnumType, EnumValue, Token.ParsedText));
                EnumValue += 1;
                continue;
            }
        }
        if (!EnumTree.IsEmptyOrError()) {
            NameSpace.DefineClassSymbol(NewEnumType);
            EnumTree.ConstValue = NewEnumType;
        }
        return EnumTree;
    };

    DScriptGrammar.TypeEnum = function (Gamma, ParsedTree, ContextType) {
        var EnumType = ParsedTree.ConstValue;
        return Gamma.Generator.CreateConstNode(Gamma.Context.GuessType(EnumType), ParsedTree, EnumType);
    };

    DScriptGrammar.ParseSwitch = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var SwitchTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("switch"), null);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "(", Required);
        SwitchTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$Expression$", Required);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ")", Required);
        SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "{", Required);
        while (!SwitchTree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
            if (TokenContext.MatchToken("case")) {
                SwitchTree.SetMatchedPatternAt(CatchVariable, NameSpace, TokenContext, "$Expression$", Required);
                SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
                SwitchTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$CaseBlock$", Required);
                continue;
            }
            SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "default", Required);
            SwitchTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ":", Required);
            SwitchTree.SetMatchedPatternAt(TryBody, NameSpace, TokenContext, "$CaseBlock$", Required);
        }
        return SwitchTree;
    };

    DScriptGrammar.TypeSwitch = function (Gamma, ParsedTree, ContextType) {
        return null;
    };

    DScriptGrammar.ParseConstDecl = // decl: const //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ConstDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetMatchedToken("const"), null);
        var ClassNameTree = TokenContext.ParsePattern(NameSpace, "$Type$", Optional);
        var ConstClass = null;
        if (ClassNameTree != null) {
            ConstDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ".", Required);
            if (!ConstDeclTree.IsEmptyOrError()) {
                ConstDeclTree.SetSyntaxTreeAt(ConstDeclClassIndex, ClassNameTree);
                ConstClass = ConstDeclTree.GetParsedType();
            }
        }
        ConstDeclTree.SetMatchedPatternAt(ConstDeclNameIndex, NameSpace, TokenContext, "$Variable$", Required);
        ConstDeclTree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, "=", Required);
        ConstDeclTree.SetMatchedPatternAt(ConstDeclValueIndex, NameSpace, TokenContext, "$Expression$", Required);

        if (!ConstDeclTree.IsEmptyOrError()) {
            var ConstName = ConstDeclTree.GetSyntaxTreeAt(ConstDeclNameIndex).KeyToken.ParsedText;
            var ConstValue = null;
            if (ConstDeclTree.GetSyntaxTreeAt(ConstDeclValueIndex).Pattern.PatternName.equals("$Const$")) {
                ConstValue = ConstDeclTree.GetSyntaxTreeAt(ConstDeclValueIndex).ConstValue;
            }
            if (ConstValue == null) {
            }
            if (ConstClass != null) {
                if (ConstClass.GetClassSymbol(ConstName, false) != null) {
                }
                ConstClass.SetClassSymbol(ConstName, ConstValue);
            } else {
                if (NameSpace.GetSymbol(ConstName) != null) {
                }
                NameSpace.DefineSymbol(ConstName, ConstValue);
            }
        }
        return ConstDeclTree;
    };

    DScriptGrammar.TypeConstDecl = function (Gamma, ParsedTree, ContextType) {
        var NameTree = ParsedTree.GetSyntaxTreeAt(ConstDeclNameIndex);
        var ValueTree = ParsedTree.GetSyntaxTreeAt(ConstDeclValueIndex);
        var VariableName = NameTree.KeyToken.ParsedText;
        var ValueNode = Gamma.TypeCheck(ValueTree, Gamma.AnyType, DefaultTypeCheckPolicy);
        if (!(ValueNode instanceof ConstNode)) {
            return Gamma.CreateErrorNode2(ParsedTree, "definitionvariable: of " + VariableName + "not: constant: is");
        }
        var CNode = ValueNode;
        Gamma.NameSpace.DefineSymbol(VariableName, CNode.ConstValue);
        return Gamma.Generator.CreateEmptyNode(ContextType);
    };

    DScriptGrammar.ParseFuncName = //  FuncDecl //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        if (Token != GtTokenContext.NullToken) {
            var ch = LangDeps.CharAt(Token.ParsedText, 0);
            if (ch != 46) {
                return new GtSyntaxTree(Pattern, NameSpace, Token, Token.ParsedText);
            }
        }
        return null;
    };

    DScriptGrammar.ParseFuncDecl = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
        if (LeftTree == null) {
            Tree.SetMatchedPatternAt(FuncDeclReturnType, NameSpace, TokenContext, "$Type$", Required);
        } else {
            Tree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
        }
        Tree.SetMatchedPatternAt(FuncDeclName, NameSpace, TokenContext, "$FuncName$", Required);
        if (TokenContext.MatchToken("(")) {
            var ParseFlag = TokenContext.SetBackTrack(false);
            var ParamBase = FuncDeclParam;
            while (!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
                if (ParamBase != FuncDeclParam) {
                    Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
                }
                Tree.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
                Tree.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
                if (TokenContext.MatchToken("=")) {
                    Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
                }
                ParamBase += 3;
            }
            TokenContext.SkipIndent();
            if (TokenContext.MatchToken("as")) {
                var Token = TokenContext.Next();
                Tree.ConstValue = Token.ParsedText;
            } else {
                Tree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Optional);
            }
            TokenContext.ParseFlag = ParseFlag;
            return Tree;
        }
        return null;
    };

    DScriptGrammar.TypeFuncDecl = function (Gamma, ParsedTree, ContextType) {
        var MethodFlag = Gamma.Generator.ParseMethodFlag(0, ParsedTree);
        Gamma = new GtTypeEnv(ParsedTree.NameSpace);
        var MethodName = ParsedTree.GetSyntaxTreeAt(FuncDeclName).ConstValue;
        var TypeList = new Array();
        var ReturnType = ParsedTree.GetSyntaxTreeAt(FuncDeclReturnType).GetParsedType();
        TypeList.add(ReturnType);
        var ParamNameList = new Array();
        var ParamBase = FuncDeclParam;
        var i = 0;
        while (ParamBase < ParsedTree.TreeList.size()) {
            var ParamType = ParsedTree.GetSyntaxTreeAt(ParamBase).GetParsedType();
            var ParamName = ParsedTree.GetSyntaxTreeAt(ParamBase + 1).KeyToken.ParsedText;
            TypeList.add(ParamType);
            ParamNameList.add(ParamName + i);
            Gamma.AppendDeclaredVariable(ParamType, ParamName);
            ParamBase += 3;
            i = i + 1;
        }

        var Method = null;
        var NativeMacro = ParsedTree.ConstValue;
        if (NativeMacro == null && !ParsedTree.HasNodeAt(FuncDeclBlock)) {
            MethodFlag |= AbstractMethod;
        }
        if (MethodName.equals("converter")) {
            Method = DScriptGrammar.CreateConverterMethod(Gamma, ParsedTree, MethodFlag, TypeList);
        } else {
            Method = DScriptGrammar.CreateMethod(Gamma, ParsedTree, MethodFlag, MethodName, TypeList, NativeMacro);
        }
        if (Method != null && NativeMacro == null && ParsedTree.HasNodeAt(FuncDeclBlock)) {
            var BodyNode = Gamma.TypeBlock(ParsedTree.GetSyntaxTreeAt(FuncDeclBlock), ReturnType);
            Gamma.Generator.GenerateMethod(Method, ParamNameList, BodyNode);
        }
        return Gamma.Generator.CreateEmptyNode(Gamma.VoidType);
    };

    DScriptGrammar.CreateConverterMethod = function (Gamma, ParsedTree, MethodFlag, TypeList) {
        var ToType = TypeList.get(0);
        var FromType = TypeList.get(1);
        var Method = Gamma.Context.GetCastMethod(FromType, ToType, false);
        if (Method != null) {
            Gamma.Context.ReportError(ErrorLevel, ParsedTree.KeyToken, "defined: already: " + FromType + " to " + ToType);
            return null;
        }
        Method = Gamma.Generator.CreateMethod(MethodFlag, "to" + ToType.ShortClassName, 0, TypeList, ParsedTree.ConstValue);
        Gamma.Context.DefineConverterMethod(Method);
        return Method;
    };

    DScriptGrammar.CreateMethod = function (Gamma, ParsedTree, MethodFlag, MethodName, TypeList, NativeMacro) {
        var RecvType = Gamma.VoidType;
        if (TypeList.size() > 1) {
            RecvType = TypeList.get(1);
        }
        var Method = Gamma.Context.GetMethod(RecvType, MethodName, 2, TypeList, true);
        if (Method != null) {
            if (Method.GetRecvType() != RecvType) {
                if (!Method.Is(VirtualMethod)) {
                    // virtual: method: not //
                    return null;
                }
                Method = null;
            } else {
                if (!Method.Is(AbstractMethod)) {
                    // override: not //
                    return null;
                }
                if (IsFlag(MethodFlag, AbstractMethod)) {
                    // nothing: do //
                    return null;
                }
            }
        }
        if (Method == null) {
            Method = Gamma.Generator.CreateMethod(MethodFlag, MethodName, 0, TypeList, NativeMacro);
        }
        Gamma.DefineMethod(Method);
        return Method;
    };

    DScriptGrammar.ParseClassDecl = //  ClassDecl //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        var ClassDeclTree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);

        //  "class" $Symbol$ ["extends" $Type$] //
        TokenContext.MatchToken("class");
        var ClassNameTree = TokenContext.ParsePattern(NameSpace, "$Symbol$", Required);
        ClassDeclTree.SetSyntaxTreeAt(ClassNameOffset, ClassNameTree);
        if (TokenContext.MatchToken("extends")) {
            ClassDeclTree.SetMatchedPatternAt(ClassParentNameOffset, NameSpace, TokenContext, "$Type$", Required);
        }

        //  define new class //
        var ClassName = ClassNameTree.KeyToken.ParsedText;
        var SuperClassTree = ClassDeclTree.GetSyntaxTreeAt(ClassParentNameOffset);
        var SuperType = NameSpace.Context.StructType;
        if (SuperClassTree != null) {
            SuperType = SuperClassTree.GetParsedType();
        }
        var ClassFlag = 0;
        var NewType = SuperType.CreateSubType(ClassFlag, ClassName, null, null);
        var DefaultObject = new GreenTeaTopObject(NewType);
        NewType.DefaultNullValue = DefaultObject;

        NameSpace.DefineClassSymbol(NewType);
        ClassDeclTree.ConstValue = NewType;

        var ParseFlag = TokenContext.SetBackTrack(false) | SkipIndentParseFlag;
        TokenContext.ParseFlag = ParseFlag;
        if (TokenContext.MatchToken("{")) {
            var i = ClassBlockOffset;
            while (!ClassDeclTree.IsEmptyOrError() && !TokenContext.MatchToken("}")) {
                var FuncDecl = TokenContext.ParsePattern(NameSpace, "$FuncDecl$", Optional);
                if (FuncDecl != null) {
                    ClassDeclTree.SetSyntaxTreeAt(i, FuncDecl);
                    TokenContext.MatchToken(";");
                    i = i + 1;
                }
                var VarDecl = TokenContext.ParsePattern(NameSpace, "$VarDecl$", Optional);
                if (VarDecl != null) {
                    ClassDeclTree.SetSyntaxTreeAt(i, VarDecl);
                    TokenContext.MatchToken(";");
                    i = i + 1;
                }
                var InitDecl = TokenContext.ParsePatternAfter(NameSpace, ClassNameTree, "constructor", Optional);
                if (InitDecl != null) {
                    ClassDeclTree.SetSyntaxTreeAt(i, InitDecl);
                    if (InitDecl.HasNodeAt(FuncDeclBlock)) {
                        var FuncBody = InitDecl.GetSyntaxTreeAt(FuncDeclBlock);
                        var TailTree = FuncBody;
                        while (TailTree.NextTree != null) {
                            TailTree = TailTree.NextTree;
                        }
                        var ThisTree = new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, new GtToken("this", 0), null);
                        var ReturnTree = new GtSyntaxTree(NameSpace.GetPattern("return"), NameSpace, new GtToken("return", 0), null);
                        ReturnTree.SetSyntaxTreeAt(ReturnExpr, ThisTree);
                        LinkTree(TailTree, ReturnTree);
                    }
                    i = i + 1;
                }
            }
        }
        TokenContext.ParseFlag = ParseFlag;
        return ClassDeclTree;
    };

    DScriptGrammar.TypeClassDecl = function (Gamma, ParsedTree, ContextType) {
        var ClassNameTree = ParsedTree.GetSyntaxTreeAt(ClassNameOffset);
        var NewType = ParsedTree.GetParsedType();
        var FieldOffset = ClassBlockOffset;
        Gamma = new GtTypeEnv(ParsedTree.NameSpace);
        Gamma.AppendDeclaredVariable(NewType, "this");
        ClassNameTree.ConstValue = NewType;
        var FieldList = new Array();

        while (FieldOffset < ParsedTree.TreeList.size()) {
            var FieldTree = ParsedTree.GetSyntaxTreeAt(FieldOffset);
            if (FieldTree.Pattern.PatternName.equals("$VarDecl$")) {
                var FieldNode = ParsedTree.TypeCheckNodeAt(FieldOffset, Gamma, Gamma.AnyType, DefaultTypeCheckPolicy);
                if (FieldNode.IsError()) {
                    return FieldNode;
                }
                var FieldName = FieldTree.GetSyntaxTreeAt(VarDeclName).KeyToken.ParsedText;
                var FieldInfo = Gamma.LookupDeclaredVariable(FieldName);
                FieldList.add(FieldInfo);
            }
            FieldOffset += 1;
        }
        Gamma.Generator.GenerateClassField(Gamma.NameSpace, NewType, FieldList);
        FieldOffset = ClassBlockOffset;
        while (FieldOffset < ParsedTree.TreeList.size()) {
            var FieldTree = ParsedTree.GetSyntaxTreeAt(FieldOffset);
            if (FieldTree.Pattern.PatternName.equals("$FuncDecl$")) {
                var ReturnTree = FieldTree.GetSyntaxTreeAt(FuncDeclReturnType);
                var NewTreeList = new Array();
                var i = 0;
                while (i < FieldTree.TreeList.size() + 3) {
                    NewTreeList.add(null);
                    i = i + 1;
                }
                NewTreeList.set(FuncDeclReturnType, ReturnTree);
                NewTreeList.set(FuncDeclClass, ClassNameTree);
                NewTreeList.set(FuncDeclName, FieldTree.GetSyntaxTreeAt(FuncDeclName));
                NewTreeList.set(FuncDeclBlock, FieldTree.GetSyntaxTreeAt(FuncDeclBlock));
                var ParamBase = FuncDeclParam;
                NewTreeList.set(ParamBase + 0, ClassNameTree);
                NewTreeList.set(ParamBase + 1, new GtSyntaxTree(Gamma.NameSpace.GetPattern("$Variable$"), Gamma.NameSpace, new GtToken("this", 0), null));
                if (ParamBase + 2 < NewTreeList.size()) {
                    NewTreeList.set(ParamBase + 2, null);
                }
                while (ParamBase < FieldTree.TreeList.size()) {
                    NewTreeList.set(ParamBase + 3, FieldTree.GetSyntaxTreeAt(ParamBase + 0));
                    NewTreeList.set(ParamBase + 4, FieldTree.GetSyntaxTreeAt(ParamBase + 1));
                    if (ParamBase + 5 < FieldTree.TreeList.size()) {
                        NewTreeList.set(ParamBase + 5, FieldTree.GetSyntaxTreeAt(ParamBase + 2));
                    }
                    ParamBase += 3;
                }
                FieldTree.TreeList = NewTreeList;
                Gamma.TypeCheck(FieldTree, Gamma.AnyType, DefaultTypeCheckPolicy);
            } else if (FieldTree.Pattern.PatternName.equals("constructor")) {
                FieldTree.Pattern = Gamma.NameSpace.GetPattern("$FuncDecl$");
                FieldTree.GetSyntaxTreeAt(FuncDeclName).ConstValue = "constructor";
                Gamma.TypeCheck(FieldTree, NewType, DefaultTypeCheckPolicy);
            }
            FieldOffset += 1;
        }
        return Gamma.Generator.CreateConstNode(ParsedTree.NameSpace.Context.TypeType, ParsedTree, NewType);
    };

    DScriptGrammar.ParseConstructor = //  constructor //
    function (NameSpace, TokenContext, LeftTree, Pattern) {
        LangDeps.Assert(LeftTree != null);
        var Tree = new GtSyntaxTree(Pattern, NameSpace, TokenContext.GetToken(), null);
        Tree.SetSyntaxTreeAt(FuncDeclReturnType, LeftTree);
        Tree.SetMatchedTokenAt(FuncDeclName, NameSpace, TokenContext, "constructor", Required);
        if (!Tree.HasNodeAt(FuncDeclName)) {
            return null;
        }
        if (TokenContext.MatchToken("(")) {
            var ParseFlag = TokenContext.SetBackTrack(false);
            var ParamBase = FuncDeclParam + 3;
            Tree.SetSyntaxTreeAt(FuncDeclParam + 0, LeftTree);
            Tree.SetSyntaxTreeAt(FuncDeclParam + 1, new GtSyntaxTree(NameSpace.GetPattern("$Variable$"), NameSpace, new GtToken("this", 0), null));
            while (!Tree.IsEmptyOrError() && !TokenContext.MatchToken(")")) {
                if (ParamBase != FuncDeclParam + 3) {
                    Tree.SetMatchedTokenAt(NoWhere, NameSpace, TokenContext, ",", Required);
                }
                Tree.SetMatchedPatternAt(ParamBase + VarDeclType, NameSpace, TokenContext, "$Type$", Required);
                Tree.SetMatchedPatternAt(ParamBase + VarDeclName, NameSpace, TokenContext, "$Variable$", Required);
                if (TokenContext.MatchToken("=")) {
                    Tree.SetMatchedPatternAt(ParamBase + VarDeclValue, NameSpace, TokenContext, "$Expression$", Required);
                }
                ParamBase += 3;
            }
            TokenContext.SkipIndent();
            Tree.SetMatchedPatternAt(FuncDeclBlock, NameSpace, TokenContext, "$Block$", Optional);
            TokenContext.ParseFlag = ParseFlag;
            return Tree;
        }
        return null;
    };

    DScriptGrammar.IsUnixCommand = // grammar: shell //
    function (cmd) {
        return false;
    };

    DScriptGrammar.SymbolShellToken = function (TokenContext, SourceText, pos) {
        var ShellMode = false;
        var start = pos;
        if (TokenContext.SourceList.size() > 0) {
            var PrevToken = TokenContext.SourceList.get(TokenContext.SourceList.size() - 1);
            if (PrevToken != null && PrevToken.PresetPattern != null && PrevToken.PresetPattern.PatternName.equals("$ShellExpression$")) {
                ShellMode = true;
            }
        }

        while (pos < SourceText.length) {
            var ch = LangDeps.CharAt(SourceText, pos);

            if (LangDeps.IsLetter(ch)) {
            } else if (LangDeps.IsDigit(ch)) {
            } else if (ch == 95) {
            } else if (ShellMode && (ch == 45 || ch == 47)) {
            } else {
                break;
            }
            pos += 1;
        }
        if (start == pos) {
            return NoMatch;
        }
        var Symbol = SourceText.substring(start, pos);

        var i = 0;
        while (i < ShellGrammarReservedKeywords.length) {
            var Keyword = ShellGrammarReservedKeywords[i];
            if (Symbol.equals(Keyword)) {
                return NoMatch;
            }
            i = i + 1;
        }
        if (Symbol.startsWith("/") || Symbol.startsWith("-")) {
            if (Symbol.startsWith("// ")) {
                return NoMatch;
            }
            TokenContext.AddNewToken(Symbol, 0, "$StringLiteral$");
            return pos;
        }

        if (DScriptGrammar.IsUnixCommand(Symbol)) {
            TokenContext.AddNewToken(Symbol, 0, "$ShellExpression$");
            return pos;
        }
        return NoMatch;
    };

    DScriptGrammar.ParseShell = function (NameSpace, TokenContext, LeftTree, Pattern) {
        var Token = TokenContext.Next();
        var NewTree = new GtSyntaxTree(Pattern, NameSpace, Token, null);
        while (!IsEmptyOrError(NewTree) && !TokenContext.MatchToken(";")) {
            var Tree = null;
            if (TokenContext.GetToken().IsDelim() || TokenContext.GetToken().IsIndent()) {
                break;
            }
            if (TokenContext.MatchToken("$ShellExpression$")) {
                //  FIXME //
            }
            if (Tree == null) {
                Tree = TokenContext.ParsePattern(NameSpace, "$Expression$", Optional);
            }
            NewTree.AppendParsedTree(Tree);
        }
        return NewTree;
    };

    DScriptGrammar.TypeShell = function (Gamma, ParsedTree, ContextType) {
        var Node = Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
        var HeadNode = Node;
        var i = 0;
        var Command = ParsedTree.KeyToken.ParsedText;
        var ThisNode = Gamma.Generator.CreateConstNode(Gamma.StringType, ParsedTree, Command);
        Node.Append(ThisNode);
        while (i < ListSize(ParsedTree.TreeList)) {
            var ExprNode = ParsedTree.TypeCheckNodeAt(i, Gamma, Gamma.StringType, DefaultTypeCheckPolicy);
            if (ExprNode instanceof ConstNode) {
                var CNode = ExprNode;
                if (CNode.ConstValue instanceof String) {
                    var Val = CNode.ConstValue;
                    if (Val.equals("|")) {
                        console.log("DEBUG: " + "PIPE");
                        var PrevNode = Node;
                        Node = Gamma.Generator.CreateCommandNode(ContextType, ParsedTree, null);
                        PrevNode.PipedNextNode = Node;
                    }
                }
            }
            Node.Append(ExprNode);
            i = i + 1;
        }
        return HeadNode;
    };

    DScriptGrammar.prototype.LoadTo = function (NameSpace) {
        // Constants: Define //
        NameSpace.DefineSymbol("true", true);
        NameSpace.DefineSymbol("false", false);
        NameSpace.DefineSymbol("null", null);

        NameSpace.DefineTokenFunc(" \t", DScriptGrammar.WhiteSpaceToken);
        NameSpace.DefineTokenFunc("\n", DScriptGrammar.IndentToken);
        NameSpace.DefineTokenFunc("(){}[]<>.,:;+-*/%=&|!@", DScriptGrammar.OperatorToken);
        NameSpace.DefineTokenFunc("/", DScriptGrammar.CommentToken);
        NameSpace.DefineTokenFunc("Aa", DScriptGrammar.SymbolToken);
        NameSpace.DefineTokenFunc("Aa-/", DScriptGrammar.SymbolShellToken);

        NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken);
        NameSpace.DefineTokenFunc("\"", DScriptGrammar.StringLiteralToken_StringInterpolation);
        NameSpace.DefineTokenFunc("1", DScriptGrammar.NumberLiteralToken);

        NameSpace.DefineSyntaxPattern("+", DScriptGrammar.ParseUnary, DScriptGrammar.TypeUnary);
        NameSpace.DefineSyntaxPattern("-", DScriptGrammar.ParseUnary, DScriptGrammar.TypeUnary);
        NameSpace.DefineSyntaxPattern("!", DScriptGrammar.ParseUnary, DScriptGrammar.TypeUnary);

        NameSpace.DefineExtendedPattern("*", BinaryOperator | Precedence_CStyleMUL, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("/", BinaryOperator | Precedence_CStyleMUL, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("%", BinaryOperator | Precedence_CStyleMUL, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        NameSpace.DefineExtendedPattern("+", BinaryOperator | Precedence_CStyleADD, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("-", BinaryOperator | Precedence_CStyleADD, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        NameSpace.DefineExtendedPattern("<", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("<=", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern(">", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern(">=", BinaryOperator | Precedence_CStyleCOMPARE, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("==", BinaryOperator | Precedence_CStyleEquals, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);
        NameSpace.DefineExtendedPattern("!=", BinaryOperator | Precedence_CStyleEquals, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary);

        // NameSpace.DefineExtendedPattern("!==", BinaryOperator | Precedence_CStyleEquals, DScriptGrammar.ParseBinary, DScriptGrammar.TypeBinary); //
        NameSpace.DefineExtendedPattern("=", BinaryOperator | Precedence_CStyleAssign | LeftJoin, DScriptGrammar.ParseBinary, DScriptGrammar.TypeAssign);
        NameSpace.DefineExtendedPattern("&&", BinaryOperator | Precedence_CStyleAND, DScriptGrammar.ParseBinary, DScriptGrammar.TypeAnd);
        NameSpace.DefineExtendedPattern("||", BinaryOperator | Precedence_CStyleOR, DScriptGrammar.ParseBinary, DScriptGrammar.TypeOr);

        NameSpace.DefineSyntaxPattern("$Empty$", DScriptGrammar.ParseEmpty, DScriptGrammar.TypeEmpty);

        NameSpace.DefineSyntaxPattern("$Symbol$", DScriptGrammar.ParseSymbol, null);
        NameSpace.DefineSyntaxPattern("$Type$", DScriptGrammar.ParseType, DScriptGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$Variable$", DScriptGrammar.ParseVariable, DScriptGrammar.TypeVariable);
        NameSpace.DefineSyntaxPattern("$Const$", DScriptGrammar.ParseConst, DScriptGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$StringLiteral$", DScriptGrammar.ParseStringLiteral, DScriptGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$IntegerLiteral$", DScriptGrammar.ParseIntegerLiteral, DScriptGrammar.TypeConst);

        NameSpace.DefineSyntaxPattern("$ShellExpression$", DScriptGrammar.ParseShell, DScriptGrammar.TypeShell);

        NameSpace.DefineSyntaxPattern("(", DScriptGrammar.ParseGroup, DScriptGrammar.TypeGroup);
        NameSpace.DefineExtendedPattern(".", 0, DScriptGrammar.ParseGetter, DScriptGrammar.TypeGetter);
        NameSpace.DefineExtendedPattern("(", 0, DScriptGrammar.ParseApply, DScriptGrammar.TypeApply);

        // future: NameSpace.DefineExtendedPattern("[", 0, DScriptGrammar.ParseIndexer, DScriptGrammar.TypeIndexer); //
        NameSpace.DefineSyntaxPattern("$Block$", DScriptGrammar.ParseBlock, DScriptGrammar.TypeBlock);
        NameSpace.DefineSyntaxPattern("$Statement$", DScriptGrammar.ParseStatement, DScriptGrammar.TypeBlock);
        NameSpace.DefineSyntaxPattern("$Expression$", DScriptGrammar.ParseExpression, DScriptGrammar.TypeBlock);

        NameSpace.DefineSyntaxPattern("$FuncName$", DScriptGrammar.ParseFuncName, DScriptGrammar.TypeConst);
        NameSpace.DefineSyntaxPattern("$FuncDecl$", DScriptGrammar.ParseFuncDecl, DScriptGrammar.TypeFuncDecl);
        NameSpace.DefineSyntaxPattern("$VarDecl$", DScriptGrammar.ParseVarDecl, DScriptGrammar.TypeVarDecl);

        NameSpace.DefineSyntaxPattern("null", DScriptGrammar.ParseNull, DScriptGrammar.TypeNull);
        NameSpace.DefineSyntaxPattern("if", DScriptGrammar.ParseIf, DScriptGrammar.TypeIf);
        NameSpace.DefineSyntaxPattern("while", DScriptGrammar.ParseWhile, DScriptGrammar.TypeWhile);
        NameSpace.DefineSyntaxPattern("continue", DScriptGrammar.ParseContinue, DScriptGrammar.TypeContinue);
        NameSpace.DefineSyntaxPattern("break", DScriptGrammar.ParseBreak, DScriptGrammar.TypeBreak);
        NameSpace.DefineSyntaxPattern("return", DScriptGrammar.ParseReturn, DScriptGrammar.TypeReturn);
        NameSpace.DefineSyntaxPattern("const", DScriptGrammar.ParseConstDecl, DScriptGrammar.TypeConstDecl);
        NameSpace.DefineSyntaxPattern("class", DScriptGrammar.ParseClassDecl, DScriptGrammar.TypeClassDecl);
        NameSpace.DefineSyntaxPattern("constructor", DScriptGrammar.ParseConstructor, DScriptGrammar.TypeFuncDecl);
        NameSpace.DefineSyntaxPattern("try", DScriptGrammar.ParseTry, DScriptGrammar.TypeTry);
        NameSpace.DefineSyntaxPattern("throw", DScriptGrammar.ParseThrow, DScriptGrammar.TypeThrow);
        NameSpace.DefineSyntaxPattern("new", DScriptGrammar.ParseNew, DScriptGrammar.TypeNew);
        NameSpace.DefineSyntaxPattern("enum", DScriptGrammar.ParseEnum, DScriptGrammar.TypeEnum);
    };
    return DScriptGrammar;
})(GtGrammar);

var GtStat = (function () {
    function GtStat() {
        this.MatchCount = 0;
        this.BacktrackCount = 0;
    }
    return GtStat;
})();

var GtClassContext = (function () {
    function GtClassContext(Grammar, Generator) {
        this.Generator = Generator;
        this.Generator.Context = this;
        this.SourceMap = new GtMap();
        this.ClassNameMap = new GtMap();
        this.UniqueMethodMap = new GtMap();
        this.RootNameSpace = new GtNameSpace(this, null);
        this.ClassCount = 0;
        this.MethodCount = 0;
        this.Stat = new GtStat();

        this.TopType = new GtType(this, 0, "top", null, null);
        this.StructType = this.TopType.CreateSubType(0, "record", null, null);
        this.EnumType = this.TopType.CreateSubType(EnumClass, "enum", null, null);

        this.VoidType = this.RootNameSpace.DefineClassSymbol(new GtType(this, NativeClass, "void", null, null));
        this.BooleanType = this.RootNameSpace.DefineClassSymbol(new GtType(this, NativeClass, "boolean", false, Boolean));
        this.IntType = this.RootNameSpace.DefineClassSymbol(new GtType(this, NativeClass, "int", 0, Number));
        this.StringType = this.RootNameSpace.DefineClassSymbol(new GtType(this, NativeClass, "string", "", String));
        this.VarType = this.RootNameSpace.DefineClassSymbol(new GtType(this, 0, "var", null, null));
        this.AnyType = this.RootNameSpace.DefineClassSymbol(new GtType(this, DynamicClass, "any", null, null));
        this.TypeType = this.RootNameSpace.DefineClassSymbol(this.TopType.CreateSubType(0, "Type", null, null));
        this.ArrayType = this.RootNameSpace.DefineClassSymbol(this.TopType.CreateSubType(0, "Array", null, null));
        this.FuncType = this.RootNameSpace.DefineClassSymbol(this.TopType.CreateSubType(0, "Func", null, null));

        this.ArrayType.Types = new Array(1);
        this.ArrayType.Types[0] = this.AnyType;
        this.FuncType.Types = new Array(1);
        this.FuncType.Types[0] = this.AnyType;

        Grammar.LoadTo(this.RootNameSpace);
        this.TopLevelNameSpace = new GtNameSpace(this, this.RootNameSpace);
        this.Generator.SetLanguageContext(this);
        this.ReportedErrorList = new Array();
    }
    GtClassContext.prototype.LoadGrammar = function (Grammar) {
        Grammar.LoadTo(this.TopLevelNameSpace);
    };

    // 	public Define(Symbol: string, Value: Object): void { //
    // 		this.RootNameSpace.DefineSymbol(Symbol, Value); //
    // 	} //
    GtClassContext.prototype.Eval = function (ScriptSource, FileLine) {
        var resultValue = null;
        console.log("DEBUG: " + "Eval: " + ScriptSource);
        var TokenContext = new GtTokenContext(this.TopLevelNameSpace, ScriptSource, FileLine);
        TokenContext.SkipEmptyStatement();
        while (TokenContext.HasNext()) {
            var annotation = TokenContext.SkipAndGetAnnotation(true);
            var topLevelTree = ParseExpression(this.TopLevelNameSpace, TokenContext);
            topLevelTree.SetAnnotation(annotation);
            console.log("DEBUG: " + "untyped tree: " + topLevelTree);
            var gamma = new GtTypeEnv(this.TopLevelNameSpace);
            var node = gamma.TypeCheckEachNode(topLevelTree, gamma.VoidType, DefaultTypeCheckPolicy);
            resultValue = this.Generator.Eval(node);
            TokenContext.SkipEmptyStatement();
            TokenContext.Vacume();
        }
        return resultValue;
    };

    GtClassContext.prototype.GuessType = function (Value) {
        if (Value instanceof GtMethod) {
            return (Value).GetFuncType();
        } else if (Value instanceof GreenTeaTopObject) {
            return (Value).GreenType;
        } else {
            return this.Generator.GetNativeType(Value);
        }
    };

    GtClassContext.prototype.CheckSubType = function (SubType, SuperType) {
        //  TODO:Typing: database: Structual //
        return false;
    };

    GtClassContext.prototype.GetGenericType = function (BaseType, BaseIdx, TypeList, IsCreation) {
        LangDeps.Assert(BaseType.IsGenericType());
        var MangleName = MangleGenericType(BaseType, BaseIdx, TypeList);
        var GenericType = this.ClassNameMap.get(MangleName);
        if (GenericType == null && IsCreation) {
            var i = BaseIdx;
            var s = BaseType.ShortClassName + "<";
            while (i < ListSize(TypeList)) {
                s = s + TypeList.get(i).ShortClassName;
                i += 1;
                if (i == ListSize(TypeList)) {
                    s = s + ">";
                } else {
                    s = s + ",";
                }
            }
            GenericType = BaseType.CreateGenericType(BaseIdx, TypeList, s);
            this.ClassNameMap.put(MangleName, GenericType);
        }
        return GenericType;
    };

    GtClassContext.prototype.GetGenericType1 = function (BaseType, ParamType, IsCreation) {
        var TypeList = new Array();
        TypeList.add(ParamType);
        return this.GetGenericType(BaseType, 0, TypeList, IsCreation);
    };

    GtClassContext.prototype.CheckExportableName = function (Method) {
        // 		if(Method.Is(ExportMethod)) { //
        // 			var Value: Object = this.UniqueMethodMap.get(Method.MethodName); //
        // 			if(Value == null) { //
        // 				this.UniqueMethodMap.put(Method.MethodName, Method); //
        // 				return true; //
        // 			} //
        // 			return false; //
        // 		} //
        return true;
    };

    /* getter */
    GtClassContext.prototype.GetterName = function (BaseType, Name) {
        return BaseType.GetSignature() + "@" + Name;
    };

    GtClassContext.prototype.DefineGetterMethod = function (Method) {
        var Key = this.GetterName(Method.GetRecvType(), Method.MethodName);
        if (this.UniqueMethodMap.get(Key) == null) {
            this.UniqueMethodMap.put(Key, Method);
        }
    };

    GtClassContext.prototype.GetGetterMethod = function (BaseType, Name, RecursiveSearch) {
        while (BaseType != null) {
            var Key = this.GetterName(BaseType, Name);
            var Method = this.UniqueMethodMap.get(Key);
            if (Method != null) {
                return Method;
            }
            if (!RecursiveSearch) {
                break;
            }
            BaseType = BaseType.SearchSuperMethodClass;
        }
        return null;
    };

    /* methods */
    GtClassContext.prototype.SetUniqueMethod = function (Key, Method) {
        var Value = this.UniqueMethodMap.get(Key);
        if (Value == null) {
            this.UniqueMethodMap.put(Key, Method);
        } else if (Value instanceof GtMethod) {
            this.UniqueMethodMap.put(Key, Key);
        }
    };

    GtClassContext.prototype.AddOverloadedMethod = function (Key, Method) {
        var Value = this.UniqueMethodMap.get(Key);
        if (Value instanceof GtMethod) {
            Method.ListedMethods = Value;
        }
        this.UniqueMethodMap.put(Key, Method);
    };

    GtClassContext.prototype.FuncNameParamSize = function (Name, ParamSize) {
        return Name + "@" + ParamSize;
    };

    GtClassContext.prototype.MethodNameParamSize = function (BaseType, Name, ParamSize) {
        return BaseType.GetSignature() + ":" + Name + "@" + ParamSize;
    };

    GtClassContext.prototype.DefineMethod = function (Method) {
        var MethodName = Method.MethodName;
        this.SetUniqueMethod(MethodName, Method);
        var Key = this.FuncNameParamSize(MethodName, (Method.Types.length - 1));
        this.SetUniqueMethod(Key, Method);
        var RecvType = Method.GetRecvType();
        Key = this.MethodNameParamSize(RecvType, MethodName, (Method.Types.length - 2));
        this.SetUniqueMethod(Key, Method);
        this.AddOverloadedMethod(Key, Method);
        this.SetUniqueMethod(Method.MangledName, Method);
    };

    GtClassContext.prototype.GetUniqueFunctionName = function (Name) {
        var Value = this.UniqueMethodMap.get(Name);
        if (Value != null && Value instanceof GtMethod) {
            return Value;
        }
        return null;
    };

    GtClassContext.prototype.GetUniqueFunction = function (Name, FuncParamSize) {
        var Value = this.UniqueMethodMap.get(this.FuncNameParamSize(Name, FuncParamSize));
        if (Value != null && Value instanceof GtMethod) {
            return Value;
        }
        return null;
    };

    GtClassContext.prototype.GetGreenListedMethod = function (BaseType, MethodName, MethodParamSize, RecursiveSearch) {
        while (BaseType != null) {
            var Value = this.UniqueMethodMap.get(this.MethodNameParamSize(BaseType, MethodName, MethodParamSize));
            if (Value instanceof GtMethod) {
                return Value;
            }
            if (!RecursiveSearch) {
                break;
            }
            BaseType = BaseType.SearchSuperMethodClass;
        }
        return null;
    };

    GtClassContext.prototype.GetListedMethod = function (BaseType, MethodName, MethodParamSize, RecursiveSearch) {
        var Method = this.GetGreenListedMethod(BaseType, MethodName, MethodParamSize, RecursiveSearch);
        if (Method == null && BaseType.IsNative() && this.Generator.TransformNativeMethods(BaseType, MethodName)) {
            Method = this.GetGreenListedMethod(BaseType, MethodName, MethodParamSize, RecursiveSearch);
        }
        return Method;
    };

    GtClassContext.prototype.GetGreenMethod = function (BaseType, Name, BaseIndex, TypeList, RecursiveSearch) {
        while (BaseType != null) {
            var Key = MangleMethodName(BaseType, Name, BaseIndex, TypeList);
            var Value = this.UniqueMethodMap.get(Key);
            if (Value instanceof GtMethod) {
                return Value;
            }
            if (!RecursiveSearch) {
                break;
            }
            BaseType = BaseType.SearchSuperMethodClass;
        }
        return null;
    };

    GtClassContext.prototype.GetMethod = function (BaseType, Name, BaseIndex, TypeList, RecursiveSearch) {
        var Method = this.GetGreenMethod(BaseType, Name, BaseIndex, TypeList, RecursiveSearch);
        if (Method == null && BaseType.IsNative() && this.Generator.TransformNativeMethods(BaseType, Name)) {
            Method = this.GetGreenMethod(BaseType, Name, BaseIndex, TypeList, RecursiveSearch);
        }
        return Method;
    };

    /* convertor, wrapper */
    GtClassContext.prototype.ConverterName = function (FromType, ToType) {
        return FromType.GetSignature() + ">" + ToType.GetSignature();
    };

    GtClassContext.prototype.WrapperName = function (FromType, ToType) {
        return FromType.GetSignature() + "<" + ToType.GetSignature();
    };

    GtClassContext.prototype.GetConverterMethod = function (FromType, ToType, RecursiveSearch) {
        var Key = this.ConverterName(FromType, ToType);
        var Method = this.UniqueMethodMap.get(Key);
        if (Method != null) {
            return Method;
        }
        if (RecursiveSearch && FromType.SearchSuperMethodClass != null) {
            return this.GetConverterMethod(FromType.SearchSuperMethodClass, ToType, RecursiveSearch);
        }
        return null;
    };

    GtClassContext.prototype.GetWrapperMethod = function (FromType, ToType, RecursiveSearch) {
        var Key = this.WrapperName(FromType, ToType);
        var Method = this.UniqueMethodMap.get(Key);
        if (Method != null) {
            return Method;
        }
        if (RecursiveSearch && FromType.SearchSuperMethodClass != null) {
            return this.GetWrapperMethod(FromType.SearchSuperMethodClass, ToType, RecursiveSearch);
        }
        return null;
    };

    GtClassContext.prototype.GetCastMethod = function (FromType, ToType, RecursiveSearch) {
        var Key = this.WrapperName(FromType, ToType);
        var Method = this.UniqueMethodMap.get(Key);
        if (Method != null) {
            return Method;
        }
        Key = this.ConverterName(FromType, ToType);
        Method = this.UniqueMethodMap.get(Key);
        if (Method != null) {
            return Method;
        }
        if (RecursiveSearch && FromType.SearchSuperMethodClass != null) {
            return this.GetCastMethod(FromType.SearchSuperMethodClass, ToType, RecursiveSearch);
        }
        return null;
    };

    GtClassContext.prototype.DefineConverterMethod = function (Method) {
        var Key = this.ConverterName(Method.GetRecvType(), Method.GetReturnType());
        this.UniqueMethodMap.put(Key, Method);
    };

    GtClassContext.prototype.DefineWrapperMethod = function (Method) {
        var Key = this.WrapperName(Method.GetRecvType(), Method.GetReturnType());
        this.UniqueMethodMap.put(Key, Method);
    };

    GtClassContext.prototype.GetSourcePosition = function (FileLine) {
        return "(eval:" + FileLine + ")";
    };

    GtClassContext.prototype.ReportError = function (Level, Token, Message) {
        if (!Token.IsError()) {
            if (Level == ErrorLevel) {
                Message = "(error) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
                Token.ToErrorToken(Message);
            } else if (Level == WarningLevel) {
                Message = "(warning) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            } else if (Level == InfoLevel) {
                Message = "(info) " + this.GetSourcePosition(Token.FileLine) + " " + Message;
            }
            this.ReportedErrorList.add(Message);
            // println(Message); //
        }
    };

    GtClassContext.prototype.GetReportedErrors = function () {
        var List = this.ReportedErrorList;
        this.ReportedErrorList = new Array();
        return List;
    };
    return GtClassContext;
})();

var GreenTeaScript = (function () {
    function GreenTeaScript() {
    }
    GreenTeaScript.main = function (Args) {
        var CodeGeneratorName = "--java";
        var Index = 0;
        var OneLiner = null;
        while (Index < Args.length) {
            var Argu = Args[Index];
            if (!Argu.startsWith("-")) {
                break;
            }
            Index += 1;
            if (Argu.startsWith("--")) {
                CodeGeneratorName = Argu;
                continue;
            }
            if (Argu.equals("-e") && Index < Args.length) {
                OneLiner = Args[Index];
                Index += 1;
                continue;
            }
            if (Argu.equals("-verbose")) {
                DebugPrintOption = true;
                continue;
            }
            LangDeps.Usage();
        }
        var Generator = LangDeps.CodeGenerator(CodeGeneratorName);
        if (Generator == null) {
            LangDeps.Usage();
        }
        var Context = new GtClassContext(new DScriptGrammar(), Generator);
        var ShellMode = true;
        if (OneLiner != null) {
            Context.Eval(OneLiner, 1);
            ShellMode = false;
        }
        while (Index < Args.length) {
            Context.Eval(LangDeps.LoadFile(Args[Index]), 1);
            ShellMode = false;
            Index += 1;
        }
        if (ShellMode) {
            var linenum = 1;
            var Line = null;
            while ((Line = LangDeps.ReadLine(">>> ")) != null) {
                Context.Eval(Line, linenum);
                linenum += 1;
            }
        }
    };
    return GreenTeaScript;
})();
