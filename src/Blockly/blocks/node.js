import Blockly from 'blockly'
import { createDropDown } from '../../Game/Game';

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

Blockly.Blocks['node'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Node")
            .appendField(new Blockly.FieldDropdown(this.generateOptions), "Decision");
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
    },
    generateOptions: createDropDown()
};