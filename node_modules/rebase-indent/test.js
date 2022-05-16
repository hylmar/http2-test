'use strict';
/* global require */

var test = require('tape');
var rebase = require('./index');


test('rebase', function(assert){
  var actual = rebase([
    '  div',
    '    div',
    '      div',
    '        p foo']).join('\n');
  var expected = [
    'div',
    '  div',
    '    div',
    '      p foo'].join('\n');

  assert.equal(actual, expected, 'rebase should reset indents to its base level');
  assert.end();
});

test('rebase string', function(assert){
  var actual = rebase('  div\n    div').join('\n');
  var expected = 'div\n  div';

  assert.equal(actual, expected, 'rebase should work with a string');
  assert.end();
});

test('rebase ignore', function(assert){
  var actual = rebase([
    'div',
    '  div',
    '    div',
    '      p foo']).join('\n');
  var expected = [
    'div',
    '  div',
    '    div',
    '      p foo'].join('\n');

  assert.equal(actual, expected, 'rebase should not reset anything');
  assert.end();
});

test('rebase empty', function(assert){
  var actual = rebase([ ]).join('\n');
  var expected = [].join('\n');

  assert.equal(actual, expected, 'rebase should return empty array');
  assert.end();
});

test('rebase tab', function(assert){
  var actual = rebase([
    ' div',
    '    div',
    '      div']).join('\n');
  var expected = [
    'div',
    '   div',
    '     div'].join('\n');

  assert.equal(actual, expected, 'rebase should reset indents if they are tabs');
  assert.end();
});


test('rebase to -1', function(assert){
  var actual = rebase([
    '  div',
    '    div',
    '      div',
    '        p foo'], -1).join('\n');
  var expected = [
    'div',
    '  div',
    '    div',
    '      p foo'].join('\n');

  assert.equal(actual, expected, 'rebase with -1 base');
  assert.end();
});


test('rebase to 0', function(assert){
  var actual = rebase([
    '  div',
    '    div',
    '      div',
    '        p foo'], 0).join('\n');
  var expected = [
    'div',
    '  div',
    '    div',
    '      p foo'].join('\n');

  assert.equal(actual, expected, 'rebase with 0 base');
  assert.end();
});


test('rebase to 1', function(assert){
  var actual = rebase([
    'line 1',
    '    line 2'], 1).join('\n');
  var expected = [
    ' line 1',
    '     line 2'].join('\n');

  assert.equal(actual, expected, 'rebase with 2 base');
  assert.end();
});


test('rebase to 2', function(assert){
  var actual = rebase([
    '  div',
    '    div',
    '      div',
    '        p foo'], 2).join('\n');
  var expected = [
    '  div',
    '    div',
    '      div',
    '        p foo'].join('\n');

  assert.equal(actual, expected, 'rebase with 2 base');
  assert.end();
});


test('rebase to 4', function(assert){
  var actual = rebase([
    '  div',
    '    div',
    '      div',
    '        p foo'], 4).join('\n');
  var expected = [
    '    div',
    '      div',
    '        div',
    '          p foo'].join('\n');

  assert.equal(actual, expected, 'rebase with 4 base');
  assert.end();
});


test('rebase to null', function(assert){
  var actual = rebase([
    '  div',
    '    div',
    '      div',
    '        p foo'], null).join('\n');
  var expected = [
    'div',
    '  div',
    '    div',
    '      p foo'].join('\n');

  assert.equal(actual, expected, 'rebase with null base');
  assert.end();
});


test('rebase to string', function(assert){
  var actual = rebase([
    '  div',
    '    div',
    '      div',
    '        p foo'], 'foo').join('\n');
  var expected = [
    'div',
    '  div',
    '    div',
    '      p foo'].join('\n');

  assert.equal(actual, expected, 'rebase with string base');
  assert.end();
});


test('stop rebase at block with lower level', function(assert){
  var actual = rebase([
    '  div',
    '    div',
    '',
    'div',
    '  div'], 0, true).join('\n');
  var expected = [
    'div',
    '  div',
    '',
    'div',
    '  div'].join('\n');

  assert.equal(actual, expected, 'rebase with base deeper than rest of fragment');
  assert.end();
});


test('stop rebase at block with lower level', function(assert){
  var actual = rebase([
    '      div',
    '        div',
    '',
    '    div',
    '      div'], 0, true).join('\n');
  var expected = [
    'div',
    '  div',
    '',
    'div',
    '  div'].join('\n');

  assert.equal(actual, expected, 'rebase with base deeper than rest of fragment');
  assert.end();
});