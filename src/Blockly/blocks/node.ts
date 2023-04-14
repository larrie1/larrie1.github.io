import Blockly from 'blockly'
import { codeGenerator } from '../generators/code_generator';
import { jsonGenerator } from '../generators/json_generator';
import { createMinusField } from './field_minus';
import { createPlusField } from './field_plus';

const _ = require('lodash');

export function createLeaf(leaf: string, key: number) {
    codeGenerator['leaf' + key] = function (block: Blockly.Block) {
        const leaf = block.getFieldValue("LEAF")
        const code = `"${leaf}"`;
        return [code, codeGenerator.PRECEDENCE];
    };

    jsonGenerator['leaf' + key] = function (block: Blockly.Block) {
        const leaf = block.getFieldValue('LEAF')
        const code = `"${leaf}"`;
        return [code, jsonGenerator.PRECEDENCE];
    };

    Blockly.Blocks['leaf' + key] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldLabelSerializable(leaf), "LEAF");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(180);
            this.setTooltip("This is a leaf, it represents your Decision");
            this.setHelpUrl("");
        }
    };
}

export function createNode(data: any, target: string, features: string[]) {
    Blockly.Blocks['node'] = {
        itemCount: 0,
        minInputs: 2,
        decision: features[0],
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
            this.decision = newValue
            this.getSourceBlock().updateDropDowns(this.decision)
            return newValue
        },
        updateDropDowns: function (newValue: any) {
            const choices: any = this.generateChoices(newValue)
            for (let i = 0; i <= this.itemCount; i++) {
                const input = this.getInput(i.toString())
                input?.removeField('CHOICE' + i)
                input?.appendField(new Blockly.FieldDropdown(choices), "CHOICE" + i)
            }
        },
        mutationToDom: function () {
            const container = Blockly.utils.xml.createElement('mutation');
            container.setAttribute('itemCount', this.itemCount);
            return container;
        },
        domToMutation: function (xmlElement: any) {
            const targetCount = parseInt(xmlElement.getAttribute('itemCount'), 10);
            this.updateShape(targetCount);
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
            this.addPart()
            this.updateMinus()
        },
        minus: function () {
            if (this.itemCount === this.minInputs) {
                return
            }
            this.removePart()
            this.updateMinus()
        },
        addPart: function () {
            this.appendValueInput(this.itemCount.toString())
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField("Choice " + (this.itemCount + 1) + ": ")
                .appendField(new Blockly.FieldDropdown(this.generateChoices(this.decision)), "CHOICE" + this.itemCount)
            this.itemCount++
        },
        removePart: function () {
            this.itemCount--
            this.removeInput(this.itemCount.toString())
        },
        updateMinus: function () {
            const minusField = this.getField('MINUS')
            const top = this.getInput('TOP')
            if (!minusField && this.itemCount > 2) {
                top.removeField('NODE')
                top.appendField(createMinusField(), 'MINUS');
                top.appendField("Node", 'NODE')
            } else if (minusField && this.itemCount === this.minInputs) {
                top.removeField('MINUS')
            }
        },
        generateDecisions: () => features.map((feature: string) => [feature, feature]),
        generateChoices: (decision: any) => _.uniq(_.map(data, decision)).map((val: any) => {console.log(val); return [val.toString(), val.toString()]}),
    };
}