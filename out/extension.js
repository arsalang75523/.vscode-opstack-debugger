"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const solidityScanner_1 = require("./solidityScanner");
const hardhatRunner_1 = require("./hardhatRunner");
function activate(context) {
    console.log('OP Stack Debugger is active');
    // دستور اسکن کد Solidity
    let scanCommand = vscode.commands.registerCommand('opstack-debugger.scanSolidity', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document.languageId === 'solidity') {
            const code = editor.document.getText();
            const diagnostics = (0, solidityScanner_1.scanSolidityCode)(code);
            const diagnosticCollection = vscode.languages.createDiagnosticCollection('solidity');
            diagnosticCollection.set(editor.document.uri, diagnostics);
        }
        else {
            vscode.window.showErrorMessage('Please open a Solidity file (.sol)');
        }
    });
    // دستور اجرای تست‌های Hardhat
    let testCommand = vscode.commands.registerCommand('opstack-debugger.runTests', async () => {
        try {
            const output = await (0, hardhatRunner_1.runHardhatTests)();
            vscode.window.showInformationMessage('Tests completed. Check output for details.');
            const outputChannel = vscode.window.createOutputChannel('OP Stack Debugger');
            outputChannel.appendLine(output);
            outputChannel.show();
        }
        catch (error) {
            vscode.window.showErrorMessage(`Test failed: ${error}`);
        }
    });
    context.subscriptions.push(scanCommand, testCommand);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map