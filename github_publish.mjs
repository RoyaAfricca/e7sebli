import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

let TOKEN = process.argv[2];
if (!TOKEN) {
  try {
    const envContent = fs.readFileSync('e:\\mo3adly\\.env', 'utf8');
    const match = envContent.match(/GITHUB_TOKEN=(.*)/);
    if (match) TOKEN = match[1].trim();
  } catch (e) {}
}
if (!TOKEN) {
  try {
    const configContent = fs.readFileSync('e:\\mo3adly\\gh_pages_config.mjs', 'utf8');
    const match = configContent.match(/const TOKEN = "(.*?)";/);
    if (match) TOKEN = match[1];
  } catch (e) {}
}

const REPO_NAME = 'e7sebli';
const APK_PATH = 'e:\\mo3adly\\apk_output\\E7sebli-v1.0.1-release-signed.apk';

async function run() {
  try {
    console.log('[1] Checking GitHub authentication...');
    const userRes = await fetch('https://api.github.com/user', {
      headers: { Authorization: `token ${TOKEN}` }
    });
    if (!userRes.ok) throw new Error('Invalid token');
    const user = await userRes.json();
    const USERNAME = user.login;
    console.log(`Authenticated as: ${USERNAME}`);

    console.log(`[2] Creating repository ${REPO_NAME} on GitHub...`);
    const repoRes = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        Authorization: `token ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: REPO_NAME,
        description: 'E7sebli Grade Calculator (Tunisia)',
        private: false
      })
    });
    if (!repoRes.ok && repoRes.status !== 422) {
      throw new Error(`Failed to create repo: ${await repoRes.text()}`);
    }
    console.log('Repository ready.');

    console.log('[3] Initializing local Git repository and pushing source code...');
    try {
      execSync('git init', { stdio: 'ignore' });
      execSync('git add .', { stdio: 'ignore' });
      execSync('git commit -m "Initial commit of E7sebli web & android project"', { stdio: 'ignore' });
    } catch(e) {
      // Ignored if nothing to commit
    }
    execSync('git branch -M main', { stdio: 'ignore' });
    try {
      execSync(`git remote add origin https://${TOKEN}@github.com/${USERNAME}/${REPO_NAME}.git`, { stdio: 'ignore' });
    } catch(e) {}
    execSync(`git remote set-url origin https://${TOKEN}@github.com/${USERNAME}/${REPO_NAME}.git`, { stdio: 'ignore' });
    execSync('git push -u origin main -f', { stdio: 'inherit' });
    console.log('Source code pushed.');

    console.log('[4] Creating a new Release (v1.0.1)...');
    const releaseRes = await fetch(`https://api.github.com/repos/${USERNAME}/${REPO_NAME}/releases`, {
      method: 'POST',
      headers: {
        Authorization: `token ${TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        tag_name: 'v1.0.1',
        name: 'E7sebli v1.0.1 - Android APK',
        body: 'Première version officielle de l\'application E7sebli.',
        draft: false,
        prerelease: false
      })
    });
    if (!releaseRes.ok && releaseRes.status !== 422) {
      throw new Error(`Failed to create release: ${await releaseRes.text()}`);
    }
    
    // If it already existed, fetch it to get upload URL
    let uploadUrl = '';
    let releaseId = '';
    if (releaseRes.status === 422) {
      const existingRes = await fetch(`https://api.github.com/repos/${USERNAME}/${REPO_NAME}/releases/tags/v1.0.1`, {
        headers: { Authorization: `token ${TOKEN}` }
      });
      const existing = await existingRes.json();
      uploadUrl = existing.upload_url;
      releaseId = existing.id;
    } else {
      const newRelease = await releaseRes.json();
      uploadUrl = newRelease.upload_url;
      releaseId = newRelease.id;
    }

    // Clean upload URL (remove {?name,label})
    uploadUrl = uploadUrl.split('{')[0] + '?name=E7sebli-v1.0.1.apk';

    console.log('[5] Uploading the APK to the latest release...');
    const apkData = fs.readFileSync(APK_PATH);
    const uploadRes = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        Authorization: `token ${TOKEN}`,
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Length': apkData.length
      },
      body: apkData
    });
    
    if (!uploadRes.ok && uploadRes.status !== 422) {
       throw new Error(`Failed to upload APK: ${await uploadRes.text()}`);
    }

    console.log('\n======================================');
    console.log('SUCCESS! Everything is shared on GitHub.');
    console.log(`Repository UI: https://github.com/${USERNAME}/${REPO_NAME}`);
    console.log(`Download APK : https://github.com/${USERNAME}/${REPO_NAME}/releases/tag/v1.0.1`);
    console.log('======================================\n');
  } catch (err) {
    console.error('ERROR:', err.message);
  }
}

run();
