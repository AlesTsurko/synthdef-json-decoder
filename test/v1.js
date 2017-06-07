"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const decoder = require("../src");

// SynthDef(\sine, { |amp = 0.5, freq = 440|
//   Out.ar(0, SinOsc.ar(freq, 0, amp) ! 2);
// })

fs.readFile(path.join(__dirname, "v1.scsyndef"), (err, buffer) => {
  assert(!err, err);

  const arrayBuffer = new Uint8Array(buffer).buffer;
  const actual1 = decoder.decode(buffer);
  const actual2 = decoder.decode(arrayBuffer);

  const expected = [
    {
      name: "sine",
      consts: [ 0 ],
      paramValues: [ 0.5, 440 ],
      paramIndices: [
        { name: "amp", index: 0, length: 1 },
        { name: "freq", index: 1, length: 1 },
      ],
      units: [
        [ "Control"     , 1, 0, [                                ], [ 1, 1 ] ],
        [ "SinOsc"      , 2, 0, [ [  0, 1 ], [ -1, 0 ]           ], [ 2    ] ],
        [ "BinaryOpUGen", 2, 2, [ [  1, 0 ], [  0, 0 ]           ], [ 2    ] ],
        [ "Out"         , 2, 0, [ [ -1, 0 ], [  2, 0 ], [ 2, 0 ] ], [      ] ]
      ],
      variants: []
    }
  ];

  assert.deepEqual(actual1, expected);
  assert.deepEqual(actual1, actual2);
});
