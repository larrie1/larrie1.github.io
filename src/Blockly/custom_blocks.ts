import Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

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
  var value_top = javascriptGenerator.valueToCode(block, 'top', javascriptGenerator.ORDER_ATOMIC);
  var value_bottom = javascriptGenerator.valueToCode(block, 'bottom', javascriptGenerator.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
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
  var value_top = javascriptGenerator.valueToCode(block, 'top', javascriptGenerator.ORDER_ATOMIC);
  var dropdown_name = block.getFieldValue('NAME');
  var value_bottom = javascriptGenerator.valueToCode(block, 'bottom', javascriptGenerator.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_NONE];
};
