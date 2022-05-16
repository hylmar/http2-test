'use strict';
/* global require */

var test = require('tape');
var fs = require('fs');
var byLine = require('../index').byLine;

var source = fs.readFileSync('./test/fixtures/doc.jade', 'utf8');


/**
 * Test line numbers
 */

test('By line', function(assert){
  var actual, expected;
  
  actual = byLine(source, 1);
  expected = 'mixin foo\n  div\n    | foo\n    | foo';
  assert.equal(actual, expected, 'should be code block at line 1');
  
  actual = byLine(source, 5);
  expected = '    ';
  assert.equal(actual, expected, 'should be space at line 5');
  
  actual = byLine(source, 6);
  expected = 'mixin bar\n  div\n    | bar\n    | bar';
  assert.equal(actual, expected, 'should be code block at line 6');
  
  actual = byLine(source, 11);
  expected = 'mixin baz\n  div\n    | baz\n    | baz';
  assert.equal(actual, expected, 'should be code block at line 11');
  
  actual = byLine(source, 16);
  expected = '//- some comment';
  assert.equal(actual, expected, 'should be code block at line 16');
  
  actual = byLine(source, 18);
  expected = 'div\n  | foo\n  div \n    | faa';
  assert.equal(actual, expected, 'should be code block at line 18');
  
  actual = byLine(source, 23);
  expected = 'html\n  head\n    title my jade template\n  body';
  assert.equal(actual, expected, 'should be code block at line 23');
  
  actual = byLine(source, 24);
  expected = '  head\n    title my jade template';
  assert.equal(actual, expected, 'should be code block at line 24');
  
  actual = byLine(source, 28);
  expected = '//- some comment\n  some indented comment\n  some indented comment';
  assert.equal(actual, expected, 'should be code block at line 28');

  assert.end();
});


/**
 * Test file bounds
 */

test('By line out of bounds', function(assert){
  var actual, expected;
  
  actual = byLine(source, 0);
  expected = '';
  assert.equal(actual, expected, 'should be empty at line 1');
  
  actual = byLine(source, -10);
  expected = '';
  assert.equal(actual, expected, 'should be empty at line -10');
  
  actual = byLine(source, 1000);
  expected = '';
  assert.equal(actual, expected, 'should be empty at line 100');

  assert.end();
});
