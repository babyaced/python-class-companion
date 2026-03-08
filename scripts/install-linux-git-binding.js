/**
 * On Linux x64 (glibc), install the native binding for @napi-rs/simple-git
 * so Nextra's loader works. Optional deps often don't get installed in CI
 * due to npm's optional dependency handling. See:
 * https://github.com/npm/cli/issues/4828
 */
const isLinux = process.platform === 'linux';
const isX64 = process.arch === 'x64';

if (isLinux && isX64) {
  const { execSync } = require('child_process');
  try {
    execSync(
      'npm install @napi-rs/simple-git-linux-x64-gnu@0.1.22 --no-save --no-audit --no-fund',
      { stdio: 'inherit' }
    );
  } catch (e) {
    console.warn(
      'install-linux-git-binding: could not install Linux binding; build may fail.',
      e.message
    );
    process.exitCode = 1;
  }
}
