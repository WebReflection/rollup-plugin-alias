import fs from 'fs';
import path from 'path';

const resolver = (module, entry) => {
  try {
    const resolved = require.resolve(module);
    let base = path.dirname(resolved);
    let i = base.split(path.sep).length;
    while (i--) {
      const name = path.join(base, entry);
      if (fs.existsSync(name)) return name;
      base = base.slice(0, base.lastIndexOf(path.sep));
    }
  } catch (o_O) {}
  throw new Error(`Unable to resolve ${module}`);
};

const cdns = [{
  name: 'unpkg.com',
  matches(id) {
    return /https:\/\/unpkg\.com\/([^@]+?)@[^/]+?\/(.+)$/.test(id);
  },
  resolve(/* id */) {
    // you could use this.matches(id) too
    return resolver(RegExp.$1, RegExp.$2);
  }
}, {
  name: 'rawgit.com',
  matches(id) {
    return /https:\/\/(?:cdn\.)?rawgit\.com\/[^/]+?\/([^/]+?)\/[^/]+?\/(.+)$/.test(id);
  },
  resolve() {
    return resolver(RegExp.$1.toLowerCase(), RegExp.$2);
  }
}];

export default function cdn() {
  return {
    resolveId(id) {
      const cdn = cdns.find(cdn => cdn.matches(id));
      return cdn ? cdn.resolve(id) : null;
    }
  };
}
