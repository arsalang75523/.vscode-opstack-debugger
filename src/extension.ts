import * as vscode from 'vscode';
import { scanSolidityCode } from './solidityScanner';
import { runHardhatTests } from './hardhatRunner';

export function activate(context: vscode.ExtensionContext) {
  console.log('OP Stack Debugger is active');

  // دستور اسکن کد Solidity
  let scanCommand = vscode.commands.registerCommand('opstack-debugger.scanSolidity', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor && editor.document.languageId === 'solidity') {
      const code = editor.document.getText();
      const diagnostics = scanSolidityCode(code);
      const diagnosticCollection = vscode.languages.createDiagnosticCollection('solidity');
      diagnosticCollection.set(editor.document.uri, diagnostics);
    } else {
      vscode.window.showErrorMessage('Please open a Solidity file (.sol)');
    }
  });

  // دستور اجرای تست‌های Hardhat
  let testCommand = vscode.commands.registerCommand('opstack-debugger.runTests', async () => {
    try {
      const output = await runHardhatTests();
      vscode.window.showInformationMessage('Tests completed. Check output for details.');
      const outputChannel = vscode.window.createOutputChannel('OP Stack Debugger');
      outputChannel.appendLine(output);
      outputChannel.show();
    } catch (error) {
      vscode.window.showErrorMessage(`Test failed: ${error}`);
    }
  });

  context.subscriptions.push(scanCommand, testCommand);
}

export function deactivate() {}