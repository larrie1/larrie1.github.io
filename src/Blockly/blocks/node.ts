import Blockly from 'blockly'
import _ from 'lodash';
import { NODE_TYPES } from '../ID3/decision-tree';
import { localizedStrings } from '../../Res';
import { createMinusField } from './field_minus';
import { createPlusField } from './field_plus';

export const codeGenerator: any = new Blockly.Generator('CODE');
export const jsonGenerator: any = new Blockly.Generator('JSON');

jsonGenerator.PRECEDENCE = 0;
codeGenerator.PRECEDENCE = 0;

/**
 * This Method creates a Leaf Block. 
 * 
 * @param leaf This string will get displayed by the leaf. It is the Class label of the Decision
 * @param key Key to identify this leaf
 */
export function createLeaf(leaf: string, key: number) {
    codeGenerator['leaf' + key] = leafToCode
    jsonGenerator['leaf' + key] = leafToJson

    Blockly.Blocks['leaf' + key] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldLabelSerializable(leaf), "LEAF");
            this.setInputsInline(true);
            this.setOutput(true, null);
            this.setColour(180);
            this.setTooltip(localizedStrings.leaf_tooltip);
            this.setHelpUrl("");
        }
    };
}

/**
 * This Method will create Source Code for the Leaf Block.
 * 
 * @param block Block which will be translated
 * @returns String representation of the Block
 */
function leafToJson(block: Blockly.Block) {
    const leaf = block.getFieldValue('LEAF')
    const code = `return "${leaf}";`;
    return [code, jsonGenerator.PRECEDENCE];
}

/**
 * This Method will create a JSON Object for the Leaf Block.
 * 
 * @param block Block which will be translated
 * @returns String representation of the Block
 */
function leafToCode(block: Blockly.Block) {
    const leaf = block.getFieldValue("LEAF")
    const code = `{"value": "${leaf}", "type": "${NODE_TYPES.LEAF}"}`;
    return [code, codeGenerator.PRECEDENCE];
}

/**
 * This Method will create a JSON Object of the Node Block. Containing the Feature and the Values.
 * 
 * @param block Block which will be translated
 * @returns String representation of the Block
 */
function nodeToCode(block: Blockly.Block) {
    var decision = block.getFieldValue('DECISION')
    let counter = 0
    let choice = block.getFieldValue('CHOICE' + counter)
    let value = codeGenerator.valueToCode(block, counter.toString(), codeGenerator.PRECEDENCE) || null
    let json = ""

    while (choice) {
        counter++
        json += `"${choice}": ${value}, `
        choice = block.getFieldValue('CHOICE' + counter);
        value = codeGenerator.valueToCode(block, counter.toString(), codeGenerator.PRECEDENCE) || null
    }

    json += `"type": "${NODE_TYPES.DECISION}"`

    const str = `{"value": "${decision}", ${json}}`
    return [str, codeGenerator.PRECEDENCE];
}

/**
 * This Method will create the Source Code for the Node Block. It will create nested If Statements of the Feature and Values.
 * 
 * @param block Block which will be translated
 * @returns String representation of the Block
 */
function nodeToJson(block: Blockly.Block) {
    var decision = block.getFieldValue('DECISION')
    let counter = 0
    let choice = block.getFieldValue('CHOICE' + counter)
    let value = jsonGenerator.valueToCode(block, counter.toString(), jsonGenerator.PRECEDENCE) || null
    let json = block.getParent() ? "" : "/**\n* This Method finds a value for my Decision\n**/\nfunction decisionTree() {\n"
    
    while(choice) {
        counter++
        if (counter !== 1) {
            json += jsonGenerator.prefixLines(`else if ("${decision}" === "${choice}") {\n${jsonGenerator.prefixLines(value ? value.toString() : "/* TODO */", jsonGenerator.INDENT)} \n}`, jsonGenerator.INDENT)
        } else {
            json += jsonGenerator.prefixLines(`if ("${decision}" === "${choice}") {\n${jsonGenerator.prefixLines(value ? value.toString() : "/* TODO */", jsonGenerator.INDENT)} \n}`, jsonGenerator.INDENT)
        }
        choice = block.getFieldValue('CHOICE' + counter); 
        value = jsonGenerator.valueToCode(block, counter.toString(), jsonGenerator.PRECEDENCE) || null
    }
  
    json += jsonGenerator.prefixLines('else {\n', jsonGenerator.INDENT)
    json += jsonGenerator.prefixLines(jsonGenerator.prefixLines('return undefined;\n', jsonGenerator.INDENT), jsonGenerator.INDENT)
    json += jsonGenerator.prefixLines('}\n', jsonGenerator.INDENT)
    block.getParent() ? json = json.substring(0, json.length - 1) : json += "}"

    return [json, jsonGenerator.PRECEDENCE];
  }

/**
 * This Method will create the main node block. It covers all the functionalities for the block.
 * 
 * @param data Table that holds all the records to create the Block according to the Data
 * @param features Features that will be displayed at the dropdown
 */
export function createNode(data: any, features: string[]) {
    codeGenerator['node'] = nodeToCode
    jsonGenerator['node'] = nodeToJson

    Blockly.Blocks['node'] = {
        itemCount: 0,  // Number of values
        minInputs: 2,  // min number of values
        decision: features[0],
        init: function () {
            this.appendDummyInput('TOP')
                .appendField(createPlusField(), 'PLUS')
                .appendField(localizedStrings.node, 'NODE')
            this.appendDummyInput()
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(localizedStrings.node_decision)
                .appendField(new Blockly.FieldDropdown(this.generateDecisions, this.validate), "DECISION")
            this.setOutput(true, null)
            this.setColour(230)
            this.setTooltip(localizedStrings.node_tooltip)
            this.setHelpUrl("")
            this.updateShape(this.minInputs)
        },
        // validate Value Dropdown according to Feature Dropdown
        validate: function (newValue: any) {
            this.decision = newValue
            this.getSourceBlock().updateDropDowns(this.decision)
            return newValue
        },
        // update value Dropdown by removing and appending new value
        updateDropDowns: function (newValue: any) {
            const choices: any = this.generateChoices(newValue)
            for (let i = 0; i <= this.itemCount; i++) {
                const input = this.getInput(i.toString())
                input?.removeField('CHOICE' + i)
                input?.appendField(new Blockly.FieldDropdown(choices), "CHOICE" + i)
            }
        },
        // mutate Dom to cover the mutations 
        mutationToDom: function () {
            const container = Blockly.utils.xml.createElement('mutation');
            container.setAttribute('itemCount', this.itemCount);
            return container;
        },
        // apply mutation to block
        domToMutation: function (xmlElement: any) {
            const targetCount = parseInt(xmlElement.getAttribute('itemCount'), 10);
            this.updateShape(targetCount);
        },
        // save the selected decision and number of values
        saveExtraState: function () {
            return {
                'itemCount': this.itemCount,
                'decision': this.decision,
            }
        },
        // load the selected decision and number of values
        loadExtraState: function (state: any) {
            this.itemCount = state['itemCount']
            this.decision = state['decision']
            this.updateShape()
        },
        // updateShape if value option gets added or removed
        updateShape: function (targetCount: number) {
            while (this.itemCount < targetCount) {
                this.addPart()
            }
            while (this.itemCount > targetCount) {
                this.removePart()
            }
            this.updateMinus()
        },
        // add value option dropdown
        plus: function () {
            this.addPart()
            this.updateMinus()
        },
        // remove value option dropdown
        minus: function () {
            if (this.itemCount === this.minInputs) {
                return
            }
            this.removePart()
            this.updateMinus()
        },
        // add dropdown to the block with correct values
        addPart: function () {
            this.appendValueInput(this.itemCount.toString())
                .setCheck(null)
                .setAlign(Blockly.ALIGN_RIGHT)
                .appendField(localizedStrings.node_value + (this.itemCount + 1) + ": ")
                .appendField(new Blockly.FieldDropdown(this.generateChoices(this.decision)), "CHOICE" + this.itemCount)
            this.itemCount++
        },
        // remove dropdown from the block
        removePart: function () {
            this.itemCount--
            this.removeInput(this.itemCount.toString())
        },
        // show or remove minus button if not enough values are displayed
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
        // calculate the Features that can be selected
        generateDecisions: () => features.map((feature: string) => [feature, feature]),
        // calculate the Values that can be selected
        generateChoices: (decision: any) => _.uniq(_.map(data, decision)).map((val: any) => [val !== undefined && val !== null ? val.toString() : "", val !== undefined && val !== null ? val.toString() : ""]),
    };
}