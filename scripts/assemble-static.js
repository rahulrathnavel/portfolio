const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const gatsbyPublic = path.join(root, 'public');
const legacyOut = path.join(root, 'legacy-os', 'out');
const gameDist = path.join(root, '.game-tour-dist');
const finalDist = path.join(root, 'dist');

const ensureExists = target => {
  if (!fs.existsSync(target)) {
    throw new Error(`Expected build output is missing: ${target}`);
  }
};

const removeTree = target => {
  if (!fs.existsSync(target)) {
    return;
  }

  for (const name of fs.readdirSync(target)) {
    const child = path.join(target, name);
    const stat = fs.lstatSync(child);

    if (stat.isDirectory()) {
      removeTree(child);
    } else {
      fs.unlinkSync(child);
    }
  }

  fs.rmdirSync(target);
};

const copyTree = (source, destination) => {
  const sourceStat = fs.lstatSync(source);

  if (!sourceStat.isDirectory()) {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
    return;
  }

  fs.mkdirSync(destination, { recursive: true });

  for (const name of fs.readdirSync(source)) {
    copyTree(path.join(source, name), path.join(destination, name));
  }
};

ensureExists(gatsbyPublic);
ensureExists(legacyOut);
ensureExists(gameDist);

removeTree(finalDist);
copyTree(gatsbyPublic, finalDist);

// Preserve the OS exactly as a separate static application.
copyTree(legacyOut, path.join(finalDist, 'os'));

// The legacy OS uses absolute asset paths. These compatibility copies let it
// keep working from /os/ without changing the OS source or the game source.
const rootCompatibilityEntries = [
  '_next',
  'System',
  'Program Files',
  'Users',
  '.index',
  'assets',
  'resume',
  'session.json',
  'screenshot.png',
  'profile-veshti.jpg',
];

for (const entry of rootCompatibilityEntries) {
  const source = path.join(legacyOut, entry);
  if (fs.existsSync(source)) {
    copyTree(source, path.join(finalDist, entry));
  }
}

// The standalone game build owns the public /game-tour/ route.
copyTree(gameDist, path.join(finalDist, 'game-tour'));

console.log('Composed static portfolio at dist/.');
