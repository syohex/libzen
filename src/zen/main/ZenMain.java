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
package zen.main;

//endif VAJA

import java.io.IOException;

import zen.deps.LibNative;
import zen.deps.LibZen;
import zen.deps.Var;
import zen.deps.ZenArray;
import zen.lang.ZenGrammar;
import zen.lang.ZenSystem;
import zen.parser.ZenGenerator;
import zen.parser.ZenLogger;
import zen.parser.ZenParserConst;
import zen.parser.ZenUtils;

public class ZenMain extends ZenUtils {
	private static jline.ConsoleReader ConsoleReader = null;

	public final static String ReadLine2(String Prompt, String Prompt2) {
		if(ConsoleReader == null) {
			try {
				ConsoleReader = new jline.ConsoleReader();
				//ConsoleReader.setExpandEvents(false);
			}
			catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
		String Line;
		try {
			Line = ConsoleReader.readLine(Prompt);
		}
		catch (IOException e) {
			throw new RuntimeException(e);
		}
		if(Line == null) {
			System.exit(0);
		}
		if(Prompt2 != null) {
			int level = 0;
			while((level = LibZen.CheckBraceLevel(Line)) > 0) {
				String Line2;
				try {
					Line2 = ConsoleReader.readLine(Prompt2);
					//Line2 = ConsoleReader.readLine(Prompt2 + GreenTeaUtils.JoinStrings("  ", level));
				}
				catch (IOException e) {
					throw new RuntimeException(e);
				}
				Line += "\n" + Line2;
			}
			if(level < 0) {
				Line = "";
				LibNative.println(" .. canceled");
			}
		}
		ConsoleReader.getHistory().addToHistory(Line);
		return Line;
	}

	public final static void ExecCommand(String[] Args) {
		@Var String TargetCode = null; // self executable
		@Var String OneLiner = null;
		@Var String RequiredLibName = null;
		@Var String OutputFile = "-"; // stdout
		@Var int Index = 0;
		@Var boolean ShellMode = false;
		while (Index < Args.length) {
			@Var String Argu = Args[Index];
			if (!Argu.startsWith("-")) {
				break;
			}
			Index += 1;
			if ((Argu.equals("-e") || Argu.equals("--eval"))
					&& (Index < Args.length)) {
				OneLiner = Args[Index];
				Index += 1;
				continue;
			}
			if ((Argu.equals("-o") || Argu.equals("--out"))
					&& (Index < Args.length)) {
				if (!Args[Index].endsWith(".green")) { // for safety
					OutputFile = Args[Index];
					Index += 1;
					continue;
				}
			}
			if ((Argu.equals("-l") || Argu.equals("--lang"))
					&& (Index < Args.length)) {
				if (!Args[Index].endsWith(".green")) { // for safety
					TargetCode = Args[Index];
					Index += 1;
					continue;
				}
			}
			if ((Argu.equals("-r") || Argu.equals("--require")) && (Index < Args.length)) {
				RequiredLibName = Args[Index];
				Index += 1;
				continue;
			}
			if (Argu.equals("-i")) {
				ShellMode = true;
				continue;
			}
			if (LibZen.EqualsString(Argu, "--verbose")) {
				LibZen.DebugMode = true;
				ZenLogger.VerboseMask |= (ZenLogger.VerboseFile
						| ZenLogger.VerboseSymbol | ZenLogger.VerboseNative);
				continue;
			}
			if (LibZen.EqualsString(Argu, "--verbose:token")) {
				ZenLogger.VerboseMask |= ZenLogger.VerboseToken;
				continue;
			}
			if (LibZen.EqualsString(Argu, "--verbose:type")) {
				ZenLogger.VerboseMask |= ZenLogger.VerboseType;
				continue;
			}
			if (LibZen.EqualsString(Argu, "--verbose:symbol")) {
				ZenLogger.VerboseMask |= ZenLogger.VerboseSymbol;
				continue;
			}
			if (LibZen.EqualsString(Argu, "--verbose:native")) {
				ZenLogger.VerboseMask |= ZenLogger.VerboseNative;
				continue;
			}
			if (LibZen.EqualsString(Argu, "--verbose:func")) {
				ZenLogger.VerboseMask |= ZenLogger.VerboseFunc;
				continue;
			}
			if (LibZen.EqualsString(Argu, "--verbose:all")) {
				ZenLogger.VerboseMask = -1;
				continue;
			}
			if (LibZen.EqualsString(Argu, "--verbose:no")) {
				ZenLogger.VerboseMask = 0;
				continue;
			}
			ZenMain.Usage(Argu + " is unknown");
		}
		@Var ZenGenerator Generator = LibNative.LoadGenerator(TargetCode, OutputFile);
		LibNative.ImportGrammar(Generator.RootNameSpace, ZenGrammar.class.getName());
		// @Var ZenParserContext Context = new ZenParserContext(new KonohaGrammar(), Generator);
		// if(RequiredLibName != null) {
		// if(!Context.TopLevelNameSpace.LoadRequiredLib(RequiredLibName)) {
		// LibZen.Exit(1, "failed to load required library: " +
		// RequiredLibName);
		// }
		// }
		// if(OneLiner != null) {
		// Context.TopLevelNameSpace.Eval(OneLiner, 1);
		// }
		// Generator.InitContext(TopLevelNameSpace);
		if (!(Index < Args.length)) {
			ShellMode = true;
		}
		@Var ZenArray ARGV = ZenArray.NewArray1(ZenSystem.StringType, 0);
		while (Index < Args.length) {
			ARGV.ArrayBody.add(Args[Index]);
			Index += 1;
		}
		Generator.RootNameSpace.SetSymbol("ARGV", ARGV, null);
		if (ARGV.ArrayBody.size() > 0) {
			@Var String FileName = (/* cast */String) ARGV.ArrayBody.get(0);
			@Var String ScriptText = LibNative.LoadScript(FileName);
			if (ScriptText == null) {
				LibNative.Exit(1, "file not found: " + FileName);
			}
			@Var long FileLine = ZenSystem.GetFileLine(FileName, 1);
			@Var boolean Success = Generator.RootNameSpace.Load(ScriptText, FileLine);
			Generator.Logger.ShowReportedErrors();
			if (!Success) {
				LibNative.Exit(1, "abort loading: " + FileName);
			}
		}
		if (ShellMode) {
			LibNative.println(ZenParserConst.ProgName + ZenParserConst.Version + " (" + ZenParserConst.CodeName + ") on " + LibZen.GetPlatform());
			LibNative.println(ZenParserConst.Copyright);
			LibNative.println("Accept: " + Generator.GetGrammarInfo());
			LibNative.println("Produce: " + Generator.GetTargetLangInfo());
			Generator.Logger.ShowReportedErrors();
			@Var int linenum = 1;
			@Var String Line = null;
			while ((Line = ZenMain.ReadLine2(">>> ", "    ")) != null) {
				try {
					@Var Object EvaledValue = Generator.RootNameSpace.Eval(Line, linenum, true);
					Generator.Logger.ShowReportedErrors();
					if (EvaledValue != null) {
						LibNative.println(" (" + ZenSystem.GuessType(EvaledValue) + ":" + LibNative.GetClassName(EvaledValue) + ") " + LibZen.Stringify(EvaledValue));
					}
					linenum += 1;
				} catch (Exception e) {
					LibZen.PrintStackTrace(e, linenum);
					linenum += 1;
				}
			}
			LibNative.println("");
		}
		/*
		 * else if(TargetCode.equals("minikonoha")) { String SourceCode =
		 * Generator.GetSourceCode(); MiniKonohaExcutor.Eval(SourceCode); }
		 */
		else {
			// Generator.FlushBuffer();
		}
	}

	public final static void Usage(String Message) {
		System.out.println("greentea usage :");
		System.out.println("  --lang|-l LANG        Set Target Language");
		System.out.println("      bash                Bash");
		System.out.println("      C C99               C99");
		System.out.println("      CSharp              CSharp");
		System.out.println("      java java7 java8    Java");
		System.out.println("      javascript js       JavaScript");
		System.out.println("      lua                 Lua");
		System.out.println("      haxe                Haxe");
		System.out.println("      ocaml               OCaml");
		System.out.println("      perl                Perl");
		System.out.println("      python              Python");
		System.out.println("      R                   R");
		System.out.println("      ruby                Ruby");
		System.out.println("      typescript ts       TypeScript");
		System.out.println("");
		System.out.println("  --out|-o  FILE        Output filename");
		System.out.println("  --eval|-e EXPR        Program passed in as string");
		System.out.println("  --require|-r LIBRARY     Load the library");
		System.out.println("  --verbose             Printing Debug infomation");
		System.out.println("     --verbose:token      adding token info");
		System.out.println("     --verbose:type       adding type info");
		System.out.println("     --verbose:symbol     adding symbol info");
		System.out.println("     --verbose:native     adding native class info");
		System.out.println("     --verbose:all        adding all info");
		System.out.println("     --verbose:no         no log");
		LibNative.Exit(0, Message);
	}

	public final static void main(String[] Args) {
		ZenMain.ExecCommand(Args);
	}
}
