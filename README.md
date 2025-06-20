# Next.js Semantic Release Template 🚀

A professional Next.js template with automated semantic versioning, GitHub releases, and Vercel deployment - all without managing environment files in your repository.

## ✨ Features

- 🔄 **Automated Semantic Releases** - Version bumping based on conventional commits
- 📝 **Auto-generated Changelogs** - Beautiful release notes from your commit messages
- 🚀 **Automatic Vercel Deployment** - Deploy on every release
- 🔐 **Envless Approach** - No `.env` files in your repo, all managed through GitHub Secrets
- 💻 **Guided Commits** - Interactive conventional commit helper
- 🎯 **Type Safety** - Full TypeScript support
- 🎨 **Tailwind CSS** - Modern styling with Tailwind CSS v4
- 📦 **Zero NPM Publishing** - GitHub-only releases

## 🚀 Quick Start

### 1. Use This Template

Click "Use this template" or clone this repository:

```bash
git clone https://github.com/yourusername/next-semantic-template.git
cd next-semantic-template
npm install
```

### 2. Set Up GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

#### Required Vercel Secrets:
- `VERCEL_TOKEN` - Your Vercel deployment token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID

#### Environment Variables:
- `NEXT_PUBLIC_APP_NAME` - Your app name (e.g., "My Amazing App")
- `NEXT_PUBLIC_API_URL` - Your API URL (e.g., "https://api.myapp.com")

### 3. Create Local Environment

Create `.env.local` for local development:

```bash
# .env.local
NEXT_PUBLIC_APP_NAME=My Local App
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_SECRET_KEY=your_local_secret_here
```

### 4. Link to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login and link your project
vercel login
vercel link
```

## 🔧 Getting Vercel Configuration

### Get Vercel Token
1. Visit [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it "GitHub Actions Deploy"
4. Copy the token

### Get Project IDs
After running `vercel link`:

```bash
# View your project configuration
cat .vercel/project.json
```

This will show your `projectId` and `orgId`.

## 📝 Making Your First Release

### Using Guided Commits

Use the interactive commit helper:

```bash
npm run commit
```

Select commit type:
- `feat` - New feature (bumps minor version: 0.1.0 → 0.2.0)
- `fix` - Bug fix (bumps patch version: 0.1.0 → 0.1.1)
- `feat!` or add "BREAKING CHANGE:" - Major version (0.x.x → 1.0.0)

### Example Workflow

```bash
# Make changes to your code
git add .

# Use guided commit
npm run commit
# Choose: feat
# Description: add user authentication system

# Push to trigger release
git push origin main
```

This will:
1. ✅ Create version `0.1.0`
2. ✅ Generate changelog
3. ✅ Create GitHub release
4. ✅ Deploy to Vercel automatically

## 🔄 Release Workflow

### Development Phase (0.x.x)
```bash
feat: add login system        # → 0.1.0
fix: resolve login bug        # → 0.1.1
feat: add user dashboard      # → 0.2.0
```

### Production Ready (1.x.x)
```bash
feat!: stable API release     # → 1.0.0
feat: add premium features    # → 1.1.0
fix: critical security patch  # → 1.0.1
```

## 🏗️ Architecture

### GitHub Actions Workflows

**Release Workflow** (`.github/workflows/release.yml`)
- Triggers on push to `main`
- Analyzes commits for version bump
- Generates changelog
- Creates GitHub release

**Deploy Workflow** (`.github/workflows/deploy.yml`)
- Triggers after successful release
- Deploys to Vercel with environment variables

### Environment Variable Strategy

**Public Variables** (accessible in browser):
- `NEXT_PUBLIC_APP_NAME` - Your application name
- `NEXT_PUBLIC_API_URL` - Your API endpoint

**Server Variables** (server-side only):
- `API_SECRET_KEY` - Secret keys, tokens, etc.

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       ├── release.yml       # Semantic release workflow
│       └── deploy.yml        # Vercel deployment workflow
├── .husky/
│   └── commit-msg           # Commit message linting
├── src/
│   └── app/
│       ├── page.tsx         # Main page with env display
│       └── layout.tsx
├── package.json             # Semantic release config
└── README.md
```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run commit       # Guided conventional commit
```

## 🔧 Configuration Files

### Semantic Release Config (package.json)
```json
{
  "release": {
    "branches": ["main"],
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator", 
      "@semantic-release/changelog",
      "@semantic-release/git",
      "@semantic-release/github"
    ]
  }
}
```

### Conventional Commits
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Formatting changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance

## 🎯 Version Display

The template includes a component that displays:
- Current version from package.json
- Environment variables
- Useful development information

See it in action at `src/app/page.tsx`.

## 🔍 Troubleshooting

### Common Issues

**"No release published"**
- Make sure your commit follows conventional commit format
- Use `npm run commit` for guided commits
- Check that you're pushing to the `main` branch

**Vercel deployment fails**
- Verify all GitHub secrets are set correctly
- Check `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`
- Ensure your Vercel project is linked with `vercel link`

**Environment variables not working**
- Public variables must start with `NEXT_PUBLIC_`
- Server variables are not accessible in browser code
- Check GitHub secrets match your usage

### Debug Steps

1. Check GitHub Actions logs
2. Verify secrets are set in repository settings
3. Test Vercel deployment locally with `vercel --prod`
4. Check `.vercel/project.json` for correct IDs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Use `npm run commit` for conventional commits
4. Push your changes
5. Create a Pull Request

## 📄 License

MIT License - feel free to use this template for your projects!

## 🙏 Acknowledgments

- [Semantic Release](https://semantic-release.gitbook.io/) for automated versioning
- [Conventional Commits](https://conventionalcommits.org/) for commit standards
- [Vercel](https://vercel.com/) for seamless deployment
- [Next.js](https://nextjs.org/) for the amazing framework

---

**Happy coding! 🎉**

Need help? [Create an issue](../../issues) or check the [discussions](../../discussions).
