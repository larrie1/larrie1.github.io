import { useState } from "react";

export function useBlockly() {
    const [showTree, setShowTree] = useState(false)
    const [showJson, setShowJson] = useState(false)

    const handleTree = () => setShowTree(!showTree)
    const handleJson = () => setShowJson(!showJson)

    return {
        showTree: showTree,
        showJson: showJson,
        handleTree: handleTree,
        handleJson: handleJson,
    }
}