'use strict';
/* global module, require */

var WHITESPACE_REGEX = /^\s*/g;


/**
 * get code block starting at line
 * and ending at indent mismatch
 */

function byLine(src, lineNumber){
  lineNumber = lineNumber-1;
  var lines = src.split('\n');

  if(lineNumber < 0 || lineNumber > lines.length){
    return '';
  }

  var indent = getIndentLevel(lines[lineNumber]);
  var block = [lines[lineNumber]];
  var i = lineNumber;

  while(++i){

    // end of file
    if(typeof lines[i] === 'undefined'){
      break;
    }

    // indent match breaks
    if(lines[i].trim() !== ''){
      if(getIndentLevel(lines[i]) <= indent){
        break;
      }
    }

    block.push(lines[i]);
  }
  // remove empty lines from the end
  var j = block.length;
  while(--j){
    if(block[j].trim() === '') {
      block.pop();
      continue;
    }
    break;
  }

  return block.join('\n');
}

module.exports.byLine = byLine;


/**
 * Get indent level of line
 */

function getIndentLevel(line){
  return line.match(WHITESPACE_REGEX)[0].length;
}


/**
 * get code block by string
 */

function byString(src, string){
  var lines = src.split('\n');
  var i = 0;
  var l = lines.length;

  var matches = [];

  // find line
  for(; i<l; ++i){
    if(lines[i].indexOf(string) > -1){
      matches.push(byLine(src, i + 1));
    }
  }

  if(!matches.length){
    return '';
  }

  if(matches.length === 1){
    return matches[0];
  }

  return matches;
}

module.exports.byString = byString;