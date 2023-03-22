import Blockly, { Block } from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { Tree, Node } from '../Tree';

// / / /* Root * / / / //

Blockly.Blocks['stamm'] = {
  init: function () {
    this.appendValueInput("top")
      .setCheck("knoten");
    this.appendDummyInput()
      .appendField("Root");
    this.appendValueInput("bottom")
      .setCheck("knoten");
    this.setInputsInline(false);
    this.setColour(240);
    this.setTooltip("This is the root of the Tree");
    this.setHelpUrl("https://www.geeksforgeeks.org/introduction-to-tree-data-structure-and-algorithm-tutorials/");
  }
};

javascriptGenerator['stamm'] = function (block: Blockly.Block) {
  var value_top = javascriptGenerator.valueToCode(block, 'top', javascriptGenerator.ORDER_ATOMIC) as Node;
  var value_bottom = javascriptGenerator.valueToCode(block, 'bottom', javascriptGenerator.ORDER_ATOMIC) as Node;
  const tree = new Tree(
    new Node(
      'data',
      value_top,
      value_bottom,
      null,
    )
  )
  var code = tree.toJSON();
  return code;
};

// / / /* Node * / / / //

Blockly.Blocks['knoten'] = {
  init: function () {
    this.appendValueInput("top")
      .setCheck(["String", "Number", "Boolean", "knoten"]);
    this.appendDummyInput()
      .appendField("Node")
      .appendField(new Blockly.FieldDropdown([["A", "a"], ["B", "b"], ["C", "c"]]), "dropdown");
    this.appendValueInput("bottom")
      .setCheck(["String", "Number", "Boolean", "knoten"]);
    this.setInputsInline(false);
    this.setOutput(true, "knoten");
    this.setColour(165);
    this.setTooltip("This connects a Node with another Node or with a Leaf");
    this.setHelpUrl("");
  }
};

javascriptGenerator['knoten'] = function (block: Blockly.Block) {
  var value_top = javascriptGenerator.valueToCode(block, 'top', javascriptGenerator.ORDER_ATOMIC) as Node || null;
  var dropdown_name = block.getFieldValue('dropdown');
  var value_bottom = javascriptGenerator.valueToCode(block, 'bottom', javascriptGenerator.ORDER_ATOMIC) as Node || null;
  var code = new Node(
    dropdown_name,
    value_top,
    value_bottom,
  );
  return [code.toJSON(), javascriptGenerator.ORDER_NONE];
};
