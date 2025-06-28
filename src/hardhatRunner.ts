import { exec } from 'child_process';
import { promisify } from 'util';
import * as vscode from 'vscode';
import * as path from 'path';

const execPromise = promisify(exec);

export async function runHardhatTests(): Promise<string> {
  try {
    let projectPath = 'C:\\vscode-opstack-debugger\\hardhat-project';
    if (vscode.workspace.workspaceFolders && vscode.workspace.workspaceFolders.length > 0) {
      const hardhatFolder = vscode.workspace.workspaceFolders.find(folder => 
        folder.uri.fsPath.includes('hardhat-project')
      );
      projectPath = hardhatFolder 
        ? hardhatFolder.uri.fsPath 
        : path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'hardhat-project');
      console.log('Using project path:', projectPath);
    } else {
      console.log('No workspace folder found, using default path:', projectPath);
    }
    console.log('Executing Hardhat command...');
    const { stdout, stderr } = await execPromise(
      'npx hardhat test --network baseSepolia',
      { 
        cwd: projectPath,
        timeout: 120000 // 120 ثانیه تایم‌اوت
      }
    );
    console.log('Hardhat stdout:', stdout);
    if (stderr) {
      console.log('Hardhat stderr:', stderr);
      return stderr;
    }
    return stdout;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Hardhat test error:', error.message);
      console.error('Full error:', JSON.stringify(error, null, 2));
      throw new Error(`Hardhat test failed: ${error.message}`);
    } else {
      console.error('Hardhat test error:', error);
      throw new Error('Hardhat test failed: Unknown error');
    }
  }
}