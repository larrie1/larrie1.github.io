Blockly.Blocks['node'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Node")
        .appendField(new Blockly.FieldDropdown([["option","OPTIONNAME"]]), "NAME");
    this.appendValueInput("top")
        .setCheck(["Boolean", "Number", "String", "node"])
        .appendField("true");
    this.appendValueInput("bottom")
        .setCheck(["Boolean", "Number", "String", "node"])
        .appendField("false");
    this.setInputsInline(false);
    this.setOutput(true, "node");
    this.setColour(230);
 this.setTooltip("This is a Node you can connect it with other nodes or with a leaf");
 this.setHelpUrl("");
  }
};