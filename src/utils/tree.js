const generateChildNodes = (arr, ParentID, parentKey) => {
  let outputs = [];
  let index = 0;
  for (let element of arr) {
    if (element.ParentID === ParentID) {
      let children = generateChildNodes(
        arr,
        element.ID,
        `${parentKey}-${index}`
      );

      let node = {
        title: `${element?.Name} `,
        value: element.ID,
        key: `${parentKey}-${index}`,
        ...element,
      };

      if (children.length > 0) {
        node.children = children;
      }

      outputs.push(node);
      index++;
    }
  }
  return outputs;
};

const generateTrees = (arr) => {
  let trees = [];
  let index = 0;
  for (let element of arr) {
    if (element.ParentID === "") {
      let node = {
        children: [],
        value: element.ID,
        title: `${element?.Name}`,
        key: `0-${index}`,
        ...element,
      };
      trees.push(node);
      index++;
    }
  }
  trees.forEach((element, index) => {
    let child = generateChildNodes(arr, element.ID, `0-${index}`);
    trees[index].children = [...child];
  });

  // console.log(trees);
  return trees;
};

const getKeysByTitle = (tree, value) => {
  const matchingKeys = [];

  const search = (node) => {
    if (node.title.includes(value)) {
      matchingKeys.push(node.key);
    }
    if (node.children) {
      node.children.forEach((child) => search(child));
    }
  };

  tree.forEach((node) => search(node));

  return matchingKeys;
};

const getNodeByKey = (tree, key) => {
  let result = null;

  const search = (node) => {
    if (node?.key === key) {
      result = node;
      return;
    }

    if (node?.children) {
      node.children.forEach((child) => search(child));
    }
  };

  tree.forEach((node) => search(node));

  return result;
};

const treeToList = (tree) => {};

export { generateTrees, getKeysByTitle, getNodeByKey };
