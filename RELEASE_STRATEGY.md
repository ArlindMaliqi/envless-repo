# 🚀 Release Strategy & Branching Guide

This project follows a **GitFlow-inspired** branching strategy with automated semantic versioning and releases.

## 📋 Branch Strategy

### Production Branches

| Branch | Purpose | Release Type | Version Example | Description |
|--------|---------|--------------|-----------------|-------------|
| `main` | Production releases | Stable | `1.0.0`, `1.1.0` | Production-ready code |
| `release/x.x.x` | Release candidates | Pre-release (rc) | `1.1.0-rc.1` | Final testing before production |

### Development Branches

| Branch | Purpose | Release Type | Version Example | Description |
|--------|---------|--------------|-----------------|-------------|
| `develop` | Development | Pre-release (dev) | `1.1.0-dev.1` | Latest development features |
| `beta` | Beta testing | Pre-release (beta) | `1.1.0-beta.1` | Feature-complete, needs testing |
| `alpha` | Alpha testing | Pre-release (alpha) | `1.1.0-alpha.1` | Early features, may be unstable |

## 🏷️ Semantic Versioning

We follow [Semantic Versioning (SemVer)](https://semver.org/):

- **MAJOR** (`2.0.0`) - Breaking changes
- **MINOR** (`1.1.0`) - New features (backward compatible)
- **PATCH** (`1.0.1`) - Bug fixes (backward compatible)

### Pre-release Versions

- **Alpha** (`1.1.0-alpha.1`) - Very early development, unstable
- **Beta** (`1.1.0-beta.1`) - Feature complete, testing phase
- **RC** (`1.1.0-rc.1`) - Release candidate, final testing
- **Dev** (`1.1.0-dev.1`) - Development snapshot

## 📝 Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) for automatic version bumping:

### Commit Types & Version Impact

| Type | Version Bump | Description | Example |
|------|--------------|-------------|---------|
| `feat:` | **MINOR** | New feature | `feat: add user authentication` |
| `fix:` | **PATCH** | Bug fix | `fix: resolve login issue` |
| `perf:` | **PATCH** | Performance improvement | `perf: optimize database queries` |
| `refactor:` | **PATCH** | Code refactoring | `refactor: restructure auth module` |
| `build:` | **PATCH** | Build system changes | `build: update webpack config` |
| `docs:` | **PATCH** (README only) | Documentation | `docs: update API documentation` |
| `style:` | **No release** | Code formatting | `style: fix indentation` |
| `test:` | **No release** | Tests | `test: add unit tests for auth` |
| `ci:` | **No release** | CI changes | `ci: update GitHub Actions` |

### Breaking Changes

Any commit with `BREAKING CHANGE:` in the footer triggers a **MAJOR** version bump:

```
feat: redesign user interface

BREAKING CHANGE: The API endpoints have changed structure
```

## 🔄 Release Workflow

### 1. Development Phase
```bash
# Work on develop branch
git checkout develop
git commit -m "feat: add new feature"
git push origin develop
# → Triggers 1.1.0-dev.1 release
```

### 2. Alpha Testing
```bash
# Create alpha branch for early testing
git checkout -b alpha develop
git push origin alpha
# → Triggers 1.1.0-alpha.1 release
```

### 3. Beta Testing
```bash
# Create beta branch when features are complete
git checkout -b beta develop
git push origin beta
# → Triggers 1.1.0-beta.1 release
```

### 4. Release Candidate
```bash
# Create release branch for final testing
git checkout -b release/1.1.0 beta
git push origin release/1.1.0
# → Triggers 1.1.0-rc.1 release
```

### 5. Production Release
```bash
# Merge to main for production release
git checkout main
git merge release/1.1.0
git push origin main
# → Triggers 1.1.0 stable release
```

## 🛠️ NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `npm run commit` | Interactive commit | Use conventional commits |
| `npm run release:dry` | Dry run release | Preview next release |
| `npm run release:alpha` | Alpha release | Release from alpha branch |
| `npm run release:beta` | Beta release | Release from beta branch |
| `npm run release:dev` | Dev release | Release from develop branch |
| `npm run version:check` | Check version | Show current version |
| `npm run changelog:preview` | Preview changelog | Show recent changes |

## 🎯 Examples

### Adding a New Feature
```bash
git checkout develop
git commit -m "feat: add user profile management"
# → Releases 1.1.0-dev.1
```

### Fixing a Bug
```bash
git checkout develop
git commit -m "fix: resolve memory leak in profile component"
# → Releases 1.0.1-dev.1
```

### Breaking Change
```bash
git checkout develop
git commit -m "feat: redesign authentication system

BREAKING CHANGE: Auth API endpoints have changed"
# → Releases 2.0.0-dev.1
```

## 🚀 CI/CD Integration

The release process is automated through GitHub Actions:

1. **Push to any tracked branch** → Automatic version bump and release
2. **GitHub Release created** → Deployment triggered
3. **CHANGELOG.md updated** → Documentation stays current
4. **package.json versioned** → NPM version synchronized

## 📋 Branch Protection

Recommended branch protection rules:

- **main**: Require PR reviews, restrict force pushes
- **develop**: Require status checks, allow force pushes for maintainers
- **release/\***: Require PR reviews, restrict direct pushes

---

*This strategy ensures clean, predictable releases while supporting continuous development and testing phases.*
