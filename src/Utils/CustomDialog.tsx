import CloseIcon from '@mui/icons-material/Close'
import { Backdrop, Box, Card, IconButton } from "@mui/material"
import { ReactNode, useEffect } from "react"
import { Headline } from "./Headline"

/**
 *  This Method creates a custom dialog which has a blurred Background that follows the main design of the App.
 *  It comes with a title and a close Icon.
 * 
 *  @param props    open: State variable indicating if the dialog is open or not
 *                  handleClose: Function which will be called when closing the Dialog
 *                  title: Title displayed within the Dialog
 *                  bottomNavigation: Custom UI that will be displayed at the bottom of the Dialog
 *                  children: Custom UI which will be the main content of the Dialog
 *  @returns        UI representation of the Dialog 
 */
export function CustomDialog(props: {
    open: boolean,
    handleClose: () => void,
    title: string,
    bottomNavigation: ReactNode,
    children: ReactNode,
}) {

    // ensure that the background is not scrollable and restore it after closing the Dialog.
    useEffect(() => {
        if (typeof window !== 'undefined' && window.document) {
            document.body.style.overflow = 'hidden'
        }
        if (!props.open) {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [props.open])

    return <Backdrop open={props.open}>
        <Card sx={{
            width: '30vw',
            minWidth: '300px',
            height: '70vh',
            overflow: 'auto',
            p: 2,
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
                <Headline variant={"h4"} text={props.title} />
                <Box sx={{ flex: 1 }} />
                <IconButton
                    onClick={props.handleClose}
                    sx={{
                        p: 2,
                        color: 'secondary.dark',
                    }}>
                    <CloseIcon />
                </IconButton>
            </Box>
            {props.children}
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
            }}>
                {props.bottomNavigation}
            </Box>
        </Card>
    </Backdrop>
}