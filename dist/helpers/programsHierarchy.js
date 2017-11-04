import _ from "lodash";

const Filter = {
  thisChildren: (array, program) => _.filter(array, (children) => children.parentId === program.id),
  origin: (array) => _.filter(array, (parent) => parent.parentId === null || array.every((element) => element.id !== parent.parentId)),
  level: (array) => _.filter(array, (parent) => array.every((element) => element.id !== parent.parentId)),
}


function getProgramsLevel(firstLevel, nextlevel, length, margin) {
  const resultArray = [];
  resultArray.push(firstLevel);
  const children = [];
  children.push(nextlevel);
  for (var i = 0; i < length; i++) {
    if (i < 5) {
      margin += 20;
    }
    if (children[i].length === 0) break;
    let level = Filter.level(children[i]);
    level.map((program) => program.margin = margin);
    resultArray.push(level);
    let levelnextsort = _.difference(children[i], level);
    children.push(levelnextsort)
  }
  return resultArray
}


function programsTree(originArray, startArray, nextIndex, resultArray) {
  let item, index = 0, length = startArray.length;
  for (; index < length; index++) {
    item = startArray[index];
    let childrens = Filter.thisChildren(originArray[nextIndex], item);
    if (childrens.length === 0) {
      resultArray.push([item])
    } else {
      resultArray.push([item, []]);
      programsTree(originArray, childrens, nextIndex + 1, resultArray[resultArray.length - 1][1]);
    }
  }
}
function finalProgramsArray(array) {
  const Result=[];
  function iterator (array, callback) {
    var item, index = 0, length = array.length;
    for (; index < length; index++) {
      item = array[index];

      if (Object.prototype.toString.call(item) === '[object Array]') {
        iterator(item, callback);
      } else {
        callback(item);
      }
    }
  }
  function callback (item) {
    Result.push(item)
  }

  iterator(array, callback);
  return Result
}



export function getProgramsHierarchy(programsList) {
  const originPrograms = Filter.origin(programsList);
  const clonePrograms = _.difference(programsList, originPrograms);
  originPrograms.map((program) => program.margin = 0);
  const Hierarchy = getProgramsLevel(originPrograms, clonePrograms, programsList.length, 0);
  return Hierarchy
}

export function getProgramsTree(Hierarchy) {
  const Tree = [];
  programsTree(Hierarchy, Hierarchy[0], 1, Tree);
  const renderTree = finalProgramsArray(Tree);
  return renderTree
}
