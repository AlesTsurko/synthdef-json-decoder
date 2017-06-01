"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const decoder = require("../src");

// SynthDef(\sine, { |amp = 0.5, freq = 440|
//   Out.ar(0, SinOsc.ar(freq, 0, amp) ! 2);
// }, variants:(alpha:[amp:0.25,freq:880], beta:[freq:1760]))

fs.readFile(path.join(__dirname, "v2.scsyndef"), (err, data) => {
  assert(!err, err);

  const buffer = new Uint8Array(data).buffer;
  const actual = decoder.decode(buffer, { version: true });
  const expected = {
    version: 2,
    defs: [
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
        variants: [
          { name: "beta", values: [ 0.5 , 1760 ] },
          { name: "alpha", values: [ 0.25,  880 ] },
        ]
      }
    ]
  };

  assert.deepEqual(actual, expected);
});
