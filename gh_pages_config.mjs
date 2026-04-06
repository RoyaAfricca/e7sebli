import fs from 'fs';
let TOKEN = "";
try {
  const envContent = fs.readFileSync('e:\\mo3adly\\.env', 'utf8');
  const match = envContent.match(/GITHUB_TOKEN=(.*)/);
  if (match) TOKEN = match[1].trim();
} catch (e) {}

const USERNAME = "RoyaAfricca";
const REPO = "e7sebli";

async function fixPages() {
  try {
    console.log(`Checking Pages for ${REPO}...`);
    const res = await fetch(`https://api.github.com/repos/${USERNAME}/${REPO}/pages`, {
      headers: { Authorization: `token ${TOKEN}` }
    });

    if (res.status === 404) {
      console.log("Pages not enabled. Enabling now...");
      const enableRes = await fetch(`https://api.github.com/repos/${USERNAME}/${REPO}/pages`, {
        method: "POST",
        headers: {
          Authorization: `token ${TOKEN}`,
          "Content-Type": "application/json",
          "Accept": "application/vnd.github.v3+json"
        },
        body: JSON.stringify({
          source: {
            branch: "gh-pages",
            path: "/"
          }
        })
      });
      if (enableRes.ok) console.log("SUCCESS: GitHub Pages enabled on 'gh-pages' branch.");
      else {
        const err = await enableRes.text();
        console.error("Failed to enable Pages:", err);
      }
    } else {
      const data = await res.json();
      console.log("Pages already enabled:", data.html_url);
      console.log("Source branch:", data.source.branch);
      
      if (data.source.branch !== "gh-pages") {
        console.log("Updating source branch to 'gh-pages'...");
        await fetch(`https://api.github.com/repos/${USERNAME}/${REPO}/pages`, {
          method: "PUT",
          headers: {
            Authorization: `token ${TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            source: {
              branch: "gh-pages",
              path: "/"
            }
          })
        });
        console.log("Updated branch to 'gh-pages'.");
      }
    }
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

fixPages();
