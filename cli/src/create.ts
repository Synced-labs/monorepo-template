#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import prompts from 'prompts';
import chalk from 'chalk';

async function main() {
  try {
    // Get project name and configuration
    const response = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'What is your project name?',
        initial: 'my-monorepo'
      },
      {
        type: 'confirm',
        name: 'useFirebase',
        message: 'Do you want to include Firebase configuration?',
        initial: true
      },
      {
        type: 'confirm',
        name: 'useHelm',
        message: 'Do you want to include Helm charts?',
        initial: true
      }
    ]);

    const projectDir = path.join(process.cwd(), response.projectName);

    // Check if directory already exists
    if (fs.existsSync(projectDir)) {
      console.error(chalk.red(`Error: Directory ${response.projectName} already exists`));
      process.exit(1);
    }

    console.log(chalk.blue('\n🚀 Creating your monorepo project...\n'));

    // Clone the repository
    execSync(
      `git clone --depth 1 https://github.com/yourusername/monorepo-template ${response.projectName}`,
      { stdio: 'ignore' }
    );

    // Remove .git folder
    fs.removeSync(path.join(projectDir, '.git'));

    // Update package.json
    const packageJsonPath = path.join(projectDir, 'package.json');
    const packageJson = await fs.readJson(packageJsonPath);
    packageJson.name = response.projectName;
    packageJson.version = '0.1.0';
    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

    // Remove components based on user choices
    if (!response.useHelm) {
      fs.removeSync(path.join(projectDir, 'helm'));
      fs.removeSync(path.join(projectDir, 'scripts/helm'));
    }

    if (!response.useFirebase) {
      // Remove Firebase config from backend
      const envPath = path.join(projectDir, 'apps/backend/.env.example');
      let envContent = await fs.readFile(envPath, 'utf8');
      envContent = envContent.replace(/FIREBASE_.*\n/g, '');
      await fs.writeFile(envPath, envContent);
    }

    // Initialize new git repository
    execSync(`cd ${response.projectName} && git init`, { stdio: 'ignore' });

    // Install dependencies
    console.log(chalk.blue('\n📦 Installing dependencies...\n'));
    execSync(`cd ${response.projectName} && bun install`, { stdio: 'inherit' });

    console.log(chalk.green(`
✨ Successfully created ${response.projectName}!

To get started:
  ${chalk.cyan(`cd ${response.projectName}`)}
  ${chalk.cyan('bun run dev')}

The following commands are available:
  ${chalk.cyan('bun run dev')}      - Start development servers
  ${chalk.cyan('bun run build')}    - Build all packages
  ${chalk.cyan('bun run lint')}     - Lint all packages
  
Project structure:
  apps/               - Frontend (Next.js) and Backend (Deno) applications
  packages/           - Shared packages and configurations
  ${response.useHelm ? 'helm/              - Kubernetes Helm charts\n' : ''}
For more information, check out the README.md file.
`));

  } catch (error) {
    console.error(chalk.red('\n❌ Error creating project:'), error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(chalk.red('\n❌ Unexpected error:'), error);
  process.exit(1);
});