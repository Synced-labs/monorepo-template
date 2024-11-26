#!/usr/bin/env bun

import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const projectName = process.argv[2];
  if (!projectName) {
    console.error(chalk.red('Please specify project name'));
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), projectName);

  console.log(chalk.blue(`Creating project in ${projectPath}`));

  // Create basic structure
  fs.mkdirSync(projectPath, { recursive: true });
  fs.mkdirSync(path.join(projectPath, 'apps'), { recursive: true });
  fs.mkdirSync(path.join(projectPath, 'packages'), { recursive: true });

  // Create package.json
  const pkg = {
    name: projectName,
    version: '1.0.0',
    private: true,
    workspaces: [
      'apps/*',
      'packages/*'
    ],
    scripts: {
      dev: 'turbo run dev',
      build: 'turbo run build'
    }
  };

  fs.writeFileSync(
    path.join(projectPath, 'package.json'),
    JSON.stringify(pkg, null, 2)
  );

  console.log(chalk.green('✨ Done!'));
}

main().catch((error) => {
  console.error(chalk.red('Error:'), error);
  process.exit(1);
});