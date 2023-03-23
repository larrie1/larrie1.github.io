import Blockly from 'blockly';

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