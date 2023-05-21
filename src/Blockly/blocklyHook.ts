import _ from "lodash";
import BlocklyLib from 'blockly';
import { useContext, useEffect, useState } from "react";
import { StepperContext, TableContext } from "../context";
import { localizedStrings } from "../Res";
import { codeGenerator, createNode, jsonGenerator } from "./blocks";
import { createTree } from "./ID3/decision-tree";
import { useTheme } from "@mui/material/styles";

function checkRow(obj: any, block: any): any {
    const valueFromTable = obj[block.value]
    const valueFromBlock = block[valueFromTable]
    if (valueFromBlock === null) {
        return localizedStrings.leaf_missing
    } else if (valueFromBlock === undefined) {
        return localizedStrings.node_missing
    } else if (valueFromBlock.type === 'leaf') {
        return valueFromBlock.value
    } else {
        return checkRow(obj, valueFromBlock)
    }
}

function onShowResult(data: any, json: any) {
    var blocks = ''
    let decision = json["value"]
    let choices = _.uniq(_.map(data, decision))
    if (json['type'] === 'decision') {
        blocks += '<block type="node" x="100" y="100"><field name="DECISION">' + decision + '</field>'
        blocks += '<mutation itemCount="' + choices.length + '"></mutation>'
        choices.forEach((choice: any, index: number) => {
            blocks += '<field name="CHOICE' + index + '">' + choice + '</field>'
        })
        choices.forEach((choice: any, index: number) => {
            if (json[choice] !== null || json[choice] !== undefined) {
                blocks += '<value name="' + index + '">' + onShowResult(data, json[choice]) + '</value>'
            }
        })
        blocks += '</block>'
    } else {
        blocks += '<block type="leaf0"><field name="LEAF">' + decision + '</field></block>'
    }
    return blocks
}

export function useBlockly(xmlKey: string) {
    const [showTree, setShowTree] = useState(false)
    const [showJson, setShowJson] = useState(false)
    const [blockCode, setBlockCode] = useState("");
    const [jsonString, setJsonString] = useState("");
    const [jsonError, setJsonError] = useState(false)
    const [blockJson, setBlockJson] = useState<{ value: any, gain: any, type: string }>()
    const [loading, setLoading] = useState(true)

    /* Table */
    const { data } = useContext(TableContext)
    const { target } = useContext(TableContext)
    const { features } = useContext(TableContext)
    const { addResult } = useContext(TableContext)
    const [seed, setSeed] = useState(1)

    /* Analyse */
    const [showAnalyse, setShowAnalyse] = useState(false)

    /* Stepper */
    const { handleComplete } = useContext(StepperContext)
    const { handleSuccess } = useContext(StepperContext)
    const { completed } = useContext(StepperContext)
    const { activeStep } = useContext(StepperContext)

    function saveXML(xml: string) {
        localStorage.setItem(xmlKey, xml)
    }

    async function checkCode() {
        var allRowsCorrect = true

        data.forEach((obj, index) => {
            const actualResult = checkRow(
                obj,
                blockJson
            )
            addResult(actualResult, index)
            if (actualResult !== obj[target] && obj[target] !== undefined) allRowsCorrect = false
        })
        if (allRowsCorrect && !completed[activeStep]) {
            handleSuccess()
            await new Promise(res => setTimeout(res, 1500))
            handleShowAnalyse()
        }
    }

    const showResult = () => {
        saveXML(
            '<xml xmlns="https://developers.google.com/blockly/xml">' +
            onShowResult(data, createTree(data, target, features)) +
            '</xml>'
        )
        setSeed(Math.random())
    }

    let initialXml = localStorage.getItem(xmlKey) ?? '<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="100" y="100"></block></xml>'

    const clearWorkspace = () => {
        saveXML('<xml xmlns="https://developers.google.com/blockly/xml"><block type="node" x="70" y="30"></block></xml>')
        setSeed(Math.random())
    }

    function workspaceDidChange(workspace: BlocklyLib.WorkspaceSvg) {
        setJsonString(jsonGenerator.workspaceToCode(workspace));
        setBlockCode(codeGenerator.workspaceToCode(workspace));
    }

    const functionalities = [
        [localizedStrings.check_code, checkCode],
        [localizedStrings.show_result, showResult],
    ]

    useEffect(() => {
        if (!data && !target && !features) setLoading(true)
        else if (data.length > 0 && features.length > 0 && target !== '') setLoading(false)
    }, [TableContext])

    useEffect(() => {
        setSeed(Math.random())
    }, [useTheme().palette.mode, localizedStrings.getLanguage(), xmlKey])

    useEffect(() => {
        try {
            setBlockJson(JSON.parse(blockCode))
            setJsonError(false)
        } catch (e) {
            setJsonError(true)
        }
    }, [blockCode])

    createNode(data, features)

    const handleClose = () => {
        setShowAnalyse(false)
        handleComplete()
    }

    const handleTree = () => setShowTree(!showTree)
    const handleJson = () => setShowJson(!showJson)
    const handleShowAnalyse = () => setShowAnalyse(true)

    return {
        data: data,
        features: features,
        target: target,
        blockJson: blockJson,
        showTree: showTree,
        showJson: showJson,
        handleTree: handleTree,
        handleJson: handleJson,
        loading: loading,
        handleClose: handleClose,
        showAnalyse: showAnalyse,
        jsonError: jsonError,
        functionalities: functionalities,
        clearWorkspace: clearWorkspace,
        seed: seed,
        initialXml: initialXml,
        saveXML: saveXML,
        workspaceDidChange: workspaceDidChange,
        jsonString: jsonString,
    }
}