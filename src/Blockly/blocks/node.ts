import Blockly from 'blockly'
import { level2Table } from '../data/level1';
import { createMinusField } from './field_minus';
import { createPlusField } from './field_plus';

/*Blockly.Blocks['node'] = {
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
};*/

Blockly.Blocks['node'] = {
    dataHeader: level2Table,
    dataBody: level2Table[1],
    itemCount: 0,
    minInputs: 2,
    decision: 0,
    init: function () {
        this.appendDummyInput('TOP')
            .appendField(createPlusField(), 'PLUS')
            .appendField("Node", 'NODE')
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Decision: ")
            .appendField(new Blockly.FieldDropdown(this.generateDecisions, this.validate), "DECISION")
        this.setOutput(true, null)
        this.setColour(230)
        this.setTooltip("This is a Node it connects with other Nodes or Leafs")
        this.setHelpUrl("")
        this.updateShape(this.minInputs)
    },
    validate: function (newValue: any) {
        this.getSourceBlock().updateDropDowns(newValue)
        return newValue
    },
    updateDropDowns: function (newValue: any) {
        this.decision = +newValue
        const choices: string[][] = this.generateChoices(+newValue)
        for(let i = 0; i <= this.itemCount; i++) {
            const input = this.getInput(i.toString())
            input?.removeField('CHOICE' + i)
            input?.appendField(new Blockly.FieldDropdown(this.generateChoices(+newValue)), "CHOICE" + i)
        }
    },
    mutationToDom: function () {
        const container = Blockly.utils.xml.createElement('mutation')
        container.setAttribute('items', this.itemCount)
        return container
    },
    domToMutation: function (xmlElement: any) {
        const targetCount = parseInt(xmlElement.getAttribute('items'), 10)
        this.updateShape(targetCount)
    },
    saveExtraState: function () {
        return {
            'itemCount': this.itemCount,
            'decision': this.decision,
        }
    },
    loadExtraState: function (state: any) {
        this.itemCount = state['itemCount']
        this.decision = state['decision']
        this.updateShape()
    },
    updateShape: function (targetCount: number) {
        while (this.itemCount < targetCount) {
            this.addPart()
        }
        while (this.itemCount > targetCount) {
            this.removePart()
        }
        this.updateMinus()
    },
    plus: function () {
        this.addPart();
        this.updateMinus();
    },
    minus: function () {
        if (this.itemCount == this.minInputs) {
            return;
        }
        this.removePart();
        this.updateMinus();
    },
    addPart: function () {
        this.appendValueInput(this.itemCount.toString())
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Choice " + (this.itemCount + 1) + ": ")
            .appendField(new Blockly.FieldDropdown(this.generateChoices(0)), "CHOICE" + this.itemCount);
        this.itemCount++;
    },
    removePart: function () {
        this.itemCount--;
        this.removeInput(this.itemCount.toString());
    },
    updateMinus: function () {
        const minusField = this.getField('MINUS');
        const top = this.getInput('TOP');
        if (!minusField && this.itemCount > 2) {
            top.removeField('NODE')
            top.appendField(createMinusField(), 'MINUS');
            top.appendField("Node", 'NODE')
        } else if (minusField && this.itemCount === this.minInputs) {
            top.removeField('MINUS');
        }
    },
    generateDecisions: function () {
        return level2Table[0].slice(1, level2Table[0].length).map((decision: string, index: number) => [decision, index.toString()])
    },
    generateChoices: function (decision: number) {
        const options: any[] = []
        this.dataBody.forEach((row: any[]) => {
            row.slice(1, row.length).forEach((val: any, index: number) => {
                if (index === decision && !options.includes(val.toString())) {
                    options.push(val.toString())
                }
            })
        })
        return options.map((val: any, index: number) => [val, val])
    },
};