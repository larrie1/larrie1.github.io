import { Box, IconButton, Typography, TextField, Table, TableHead, TableCell, TableBody, TableRow, Button, tableCellClasses } from "@mui/material"
import { Headline } from "../Utils/Headline"
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles'
import { strings } from "../Res/localization";
import { useEffect, useState } from "react";
import { scaleInVerTop } from "../Utils/animations";
import { Generator } from "./Generator";
import { createTable } from "../Utils/Table";
import { TableContext } from "../context";
import { borderLeft } from "@mui/system";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Step1 = (props: { target: string, setTarget: any }) => {
    return (
        <Box sx={{ animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, mt: 2, width: '100%', background: useTheme().palette.secondary.light, border: 1, borderColor: useTheme().palette.secondary.dark, borderRadius: 2, px: 2, pb: 2 }}>
            <Headline variant={"h6"} text={'Entscheidung'} />
            <Typography sx={{ ml: 1 }}>
                Bitte trage hier ein welche Entscheidung du mithilfe des Baums treffen möchtest. Es kann sich um alles deiner Wahl handeln, jedoch kannst du deine Wahl nicht mehr ändern.
            </Typography>
            <Box sx={{ my: 5, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <TextField sx={{ mx: 5 }} value={props.target} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.setTarget(event.target.value)
                }} size='small' label={strings.target} variant="outlined" />
            </Box>
        </Box>
    )
}

const Step2 = (props: { features: string[], setFeatures: any }) => {
    const handleChange = (val: string, index: number) => props.setFeatures((prev: string[]) => prev.map((el: string, i: number) => i === index ? val : el))

    const addInput = () => props.setFeatures([...props.features, ''])

    return (
        <Box sx={{ animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, mt: 2, width: '100%', background: useTheme().palette.secondary.light, border: 1, borderColor: useTheme().palette.secondary.dark, borderRadius: 2, px: 2, pb: 2 }}>
            <Headline variant={"h6"} text={'Parameter'} />
            <Typography sx={{ ml: 1 }}>
                Hier kannst du nun deine Parameter einfügen, die bestimmen für welche Entscheidung wir uns entscheiden bzw. woran man deine Entscheidung messen kann. Ein Beispiel wäre, dass du anhand von Fell einen Hund von einem Menschen unterscheiden kannst.
            </Typography>
            <Box sx={{ my: 5, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', maxHeight: '50vh', overflow: 'auto' }}>
                {props.features.map((_: string, index: number) =>
                    <TextField sx={{ mx: 5, my: 1 }} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(event.target.value, index)
                    }} size='small' label={'feature ' + (index + 1)} variant="outlined" />
                )}
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <IconButton onClick={addInput} sx={{ color: 'primary' }}>
                        <AddIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}

const Step3 = (props: { target: string, features: string[], data: any, setData: any }) => {

    const addInput = () => props.setData([...props.data, {[strings.result]: undefined}])

    const head = [props.target, ...props.features]

    const onChange = (val: string, col: string, rowIndex: number) => {
        let newArray = [...props.data]
        newArray[rowIndex][col] = val
        props.setData(newArray)
    }

    return (
        <Box sx={{ animation: `${scaleInVerTop} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`, mt: 2, width: '100%', background: useTheme().palette.secondary.light, border: 1, borderColor: useTheme().palette.secondary.dark, borderRadius: 2, px: 2, pb: 2 }}>
            <Headline variant={"h6"} text={'Daten'} />
            <Typography sx={{ ml: 1 }}>
                Fülle hier deine Tabelle mit Leben! Du solltest für jede Entscheidung alle Parameter ausfüllen.
            </Typography>
            <Table sx={{
                tableLayout: 'auto',
                my: 2,
                [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                    borderRight: 1,
                    borderRightColor: 'secondary.dark',
                }
            }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            {props.target}
                        </TableCell>
                        {props.features.map((val: string) => <TableCell sx={{ '&:last-child': { border: 0 } }}>{val}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row: any, index: number) => <TableRow>
                        {head.map((col: any) => <TableCell sx={{ '&:last-child': { borderRight: 0 } }}>
                            <TextField sx={{ width: '100%' }} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                onChange(event.target.value, col, index)
                            }} size='small' label={'data'} variant="outlined" />
                        </TableCell>)}
                    </TableRow>)}
                </TableBody>
            </Table>
            <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center' }}>
                <IconButton onClick={addInput} sx={{ color: 'primary' }}>
                    <AddIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export function CreateTableDialog() {
    const [target, setTarget] = useState("")
    const [features, setFeatures] = useState<string[]>(['', ''])
    const [data, setData] = useState<any[]>([{[strings.result]: undefined}, {[strings.result]: undefined}])
    const [isDone, setDone] = useState(false)
    const [isValidData, setValidData] = useState(false)

    console.log({ target: target, features: features, data: data })

    const handleClick = () => setDone(true)

    const setTable = (newData: any) => {
        setData(newData)
    }

    const validateFeatures = () => {
        for (let feature of features) {
            if (!feature) return false
        }
        return true
    }

    const validateData = () => {
        for (let row of data) {
            if (!row[target]) return false
            for (let feature of features) {
                if (!row[feature]) return false
            }
        }
        return true
    }

    const table = createTable(
        data,
        target,
        features,
        setTable,
    )

    useEffect(() => {
        setValidData(target !== '' && features.length > 1 && validateFeatures() && validateData())
    }, [target, features, data])

    let validateHints = [
        [!validateFeatures(), "Es gibt noch unbelegte Features!"],
        [!(features.length > 1), "Es sind noch nicht genügend Features definiert worden!"],
        [!validateData(), 'Es fehlen noch daten in der Tabelle!']
    ]

    if (!isDone) {
        return (
            <Box sx={{ width: '100%', height: '100%', minHeight: `calc(100vh - 260px)`, mx: 'auto' }}>
                <Headline variant={"h4"} text={"Erstelle dir dein Eigenes Level!"} />
                <Step1 target={target} setTarget={setTarget} />
                {target && <Step2 features={features} setFeatures={setFeatures} />}
                {target && features[0] && features[1] && <Step3 target={target} features={features} data={data} setData={setData} />}
                {target && features[0] && features[1] && <Box sx={{display: 'flex', flexDirection: 'column', my: 2}}>
                    {validateHints.map((val: (string | boolean)[]) => val[0] && <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            color: 'red',
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'end'
                        }}>
                            <ErrorOutlineIcon sx={{ mx: .5, height: 12 }} />
                            <Typography sx={{fontSize: 12}}>{val[1]}</Typography>
                        </Box>)}
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                        <Button disabled={!isValidData} onClick={handleClick}>Fertig</Button>
                    </Box>
                </Box>}
            </Box>
        )
    } else {
        return (
            <TableContext.Provider value={table}>
                <Generator data={data} setData={setData} />
            </TableContext.Provider>
        )
    }
}
