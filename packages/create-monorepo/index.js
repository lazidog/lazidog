#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
  console.error("❌ Require project name. Ex: create-monorepo my-app");
  process.exit(1);
}

const templateDir = path.join(__dirname, "template");
const targetDir = path.join(process.cwd(), projectName);

fs.mkdirSync(targetDir, { recursive: true });

function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyRecursive(templateDir, targetDir);

const dotFilesMap = {
  "gitignore": ".gitignore",
  "npmrc": ".npmrc"
};

for (const [srcName, destName] of Object.entries(dotFilesMap)) {
  const srcPath = path.join(targetDir, srcName);
  const destPath = path.join(targetDir, destName);
  if (fs.existsSync(srcPath)) {
    fs.renameSync(srcPath, destPath);
  }
}

// Update package.json "name"
const packageJsonPath = path.join(targetDir, "package.json");

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.name = projectName;
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + "\n",
    "utf8"
  );
}

console.log(`✅ Project "${projectName}" created!`);
console.log(`👉 Next:`);
console.log(`   cd ${projectName}`);
console.log(`   pnpm install`);
