#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync, rmSync, readdirSync } from "fs";
import { resolve } from "path";

const projectName = process.argv[2];
const isCurrentDir = !projectName;

const projectPath = isCurrentDir
  ? process.cwd()
  : resolve(process.cwd(), projectName);

// Safety checks
if (!isCurrentDir && existsSync(projectPath)) {
  console.error(`Error: Folder "${projectName}" already exists.`);
  process.exit(1);
}

if (isCurrentDir && readdirSync(projectPath).length > 0) {
  console.error("Error: Current directory is not empty.");
  process.exit(1);
}

const GIT_REPO =
  "https://github.com/naim0018/starter-template-react-typescript.git";

const runCommand = (command, cwd = process.cwd()) => {
  try {
    execSync(command, { stdio: "inherit", cwd });
  } catch (err) {
    console.error(`Command failed: ${command}`);
    console.error(err.message);
    process.exit(1);
  }
};

// Clone
console.log("Cloning starter template...");
runCommand(
  isCurrentDir
    ? `git clone ${GIT_REPO} .`
    : `git clone ${GIT_REPO} ${projectName}`
);

// Remove git history safely
rmSync(resolve(projectPath, ".git"), { recursive: true, force: true });

// Install deps
console.log("Installing dependencies...");
runCommand("npm install", projectPath);

// Success
console.log("\nProject initialized successfully.");
console.log("\nNext steps:");
console.log("  npm run dev");
