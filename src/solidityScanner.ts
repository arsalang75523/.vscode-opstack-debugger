import * as vscode from 'vscode';
import * as parser from '@solidity-parser/parser';

export function scanSolidityCode(code: string): vscode.Diagnostic[] {
  const diagnostics: vscode.Diagnostic[] = [];

  try {
    const ast = parser.parse(code, { loc: true });
    parser.visit(ast, {
      FunctionDefinition(node: any) {
        // بررسی توابع بدون بررسی دسترسی (مثل public/private)
        if (!node.visibility) {
          const startLine = node.loc.start.line - 1;
          const endLine = node.loc.end.line - 1;
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(startLine, node.loc.start.column, endLine, node.loc.end.column),
            'Function visibility not specified. Consider adding public/private.',
            vscode.DiagnosticSeverity.Warning
          );
          diagnostics.push(diagnostic);
        }
      },
      BinaryOperation(node: any) {
        // بررسی سرریز در عملیات ریاضی
        if (['+', '-', '*'].includes(node.operator)) {
          const startLine = node.loc.start.line - 1;
          const diagnostic = new vscode.Diagnostic(
            new vscode.Range(startLine, node.loc.start.column, startLine, node.loc.end.column),
            'Potential overflow risk. Consider using SafeMath or Solidity >=0.8.0.',
            vscode.DiagnosticSeverity.Warning
          );
          diagnostics.push(diagnostic);
        }
      }
    });
  } catch (error) {
    diagnostics.push(new vscode.Diagnostic(
      new vscode.Range(0, 0, 0, 0),
      `Parsing error: ${error}`,
      vscode.DiagnosticSeverity.Error
    ));
  }

  return diagnostics;
}