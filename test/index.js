import test from 'ava';
import path from 'path';
import { rollup } from 'rollup';
import cdn from '../dist/rollup-plugin-cdn';

const EXPECTED = require.resolve('hyperhtml').replace('cjs', 'esm');

test(t => {
  t.is(typeof cdn, 'function');
});

test(t => {
  const result = cdn();
  t.is(typeof result, 'object');
  t.is(typeof result.resolveId, 'function');
});

test('hyperHTML ESM via CDN', t => {
  const result = cdn();

  const resolved = result.resolveId(
    'https://unpkg.com/hyperhtml@latest/esm/index.js'
  );

  t.is(resolved, EXPECTED);
});

test('unknown package', t => {
  const result = cdn();

  try {
    const resolved = result.resolveId(
      'https://unpkg.com/hyperhtml-element@latest/esm/index.js'
    );
    t.is(true, false, 'this should actually throw');
  } catch (e) {
    t.is(e.message, 'Unable to resolve hyperhtml-element');
  }
});

test('Will not confuse modules with similar names', t => {
  const result = cdn();

  const resolved = result.resolveId('foo2', '/src/importer.js');
  const resolved2 = result.resolveId('./fooze/bar', '/src/importer.js');
  const resolved3 = result.resolveId('./someFile.foo', '/src/importer.js');

  t.is(resolved, null);
  t.is(resolved2, null);
  t.is(resolved3, null);
});

// Tests in Rollup
test(t =>
  rollup({
    entry: './files/index.js',
    plugins: [cdn()],
  }).then(stats => {
    t.is(stats.modules[0].id.endsWith(path.normalize('/files/nonAliased.js')), true);
    t.is(stats.modules[stats.modules.length - 2].id, EXPECTED);
  })
);
