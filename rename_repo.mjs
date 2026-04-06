const TOKEN = ""; // Should be loaded via environment or separate config

const USERNAME = "RoyaAfricca";
const OLD_REPO = "E7sebli";
const NEW_REPO = "e7sebli";

async function renameRepo() {
  try {
    console.log(`Renaming ${OLD_REPO} to ${NEW_REPO}...`);
    const res = await fetch(`https://api.github.com/repos/${USERNAME}/${OLD_REPO}`, {
      method: "PATCH",
      headers: {
        Authorization: `token ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: NEW_REPO
      })
    });

    if (res.ok) {
      console.log("SUCCESS: Repository renamed to 'e7sebli'.");
    } else {
      const err = await res.text();
      console.error("Failed to rename:", err);
    }
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

renameRepo();
