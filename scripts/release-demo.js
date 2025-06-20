#!/usr/bin/env node

/**
 * Release Demo Script
 * 
 * This script demonstrates how the different branching strategies work
 * and what versions would be generated for different commit types.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  return packageJson.version;
}

function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    return 'unknown';
  }
}

function simulateRelease(commitType, description) {
  log(`\n🎯 Simulating: ${commitType}: ${description}`, 'cyan');
  
  try {
    const result = execSync('npm run release:dry', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    // Extract version from output (this is a simplified version)
    const versionMatch = result.match(/The next release version is (\d+\.\d+\.\d+(?:-[\w\.]+)?)/);
    if (versionMatch) {
      log(`📦 Next version would be: ${versionMatch[1]}`, 'green');
    } else {
      log('ℹ️  No release would be triggered', 'yellow');
    }
  } catch (error) {
    log('ℹ️  Unable to simulate release (GitHub token required)', 'yellow');
  }
}

function main() {
  log('🚀 Release Strategy Demo', 'bright');
  log('='.repeat(50), 'blue');
  
  const currentVersion = getCurrentVersion();
  const currentBranch = getCurrentBranch();
  
  log(`📦 Current version: ${currentVersion}`, 'green');
  log(`🌿 Current branch: ${currentBranch}`, 'blue');
  
  log('\n🎯 Version Bump Examples:', 'bright');
  log('-'.repeat(30), 'blue');
  
  const examples = [
    { type: 'feat', desc: 'add user authentication', bump: 'MINOR' },
    { type: 'fix', desc: 'resolve login issue', bump: 'PATCH' },
    { type: 'perf', desc: 'optimize database queries', bump: 'PATCH' },
    { type: 'feat!', desc: 'redesign API endpoints', bump: 'MAJOR' },
    { type: 'docs', desc: 'update README', bump: 'PATCH (README only)' },
    { type: 'style', desc: 'fix code formatting', bump: 'NO RELEASE' },
    { type: 'test', desc: 'add unit tests', bump: 'NO RELEASE' },
  ];
  
  examples.forEach(({ type, desc, bump }) => {
    const color = bump.includes('MAJOR') ? 'red' : 
                  bump.includes('MINOR') ? 'yellow' : 
                  bump.includes('PATCH') ? 'green' : 'blue';
    
    log(`${type}: ${desc}`, 'cyan');
    log(`  → ${bump}`, color);
  });
  
  log('\n🌿 Branch-Specific Versions:', 'bright');
  log('-'.repeat(30), 'blue');
  
  const branches = [
    { name: 'main', version: '1.1.0', desc: 'Stable release' },
    { name: 'develop', version: '1.1.0-dev.1', desc: 'Development pre-release' },
    { name: 'beta', version: '1.1.0-beta.1', desc: 'Beta pre-release' },
    { name: 'alpha', version: '1.1.0-alpha.1', desc: 'Alpha pre-release' },
    { name: 'release/1.1.0', version: '1.1.0-rc.1', desc: 'Release candidate' },
  ];
  
  branches.forEach(({ name, version, desc }) => {
    const color = name === 'main' ? 'green' : 'yellow';
    log(`${name}: ${version} - ${desc}`, color);
  });
  
  log('\n🛠️  Available Commands:', 'bright');
  log('-'.repeat(20), 'blue');
  
  const commands = [
    'npm run commit - Interactive conventional commit',
    'npm run release:dry - Preview next release',
    'npm run release:dev - Release from develop branch',
    'npm run release:alpha - Release from alpha branch',
    'npm run release:beta - Release from beta branch',
    'npm run version:check - Show current version',
    'npm run changelog:preview - Preview recent changes',
  ];
  
  commands.forEach(cmd => log(`  ${cmd}`, 'cyan'));
  
  log('\n📚 Learn More:', 'bright');
  log('  📖 Read RELEASE_STRATEGY.md for detailed guide', 'blue');
  log('  🌐 Visit https://conventionalcommits.org for commit format', 'blue');
  log('  🔗 Check https://semver.org for versioning rules', 'blue');
}

if (require.main === module) {
  main();
}

module.exports = { getCurrentVersion, getCurrentBranch, simulateRelease };
