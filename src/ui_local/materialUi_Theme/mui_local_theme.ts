import {Button, createTheme, InputBase, styled} from "@mui/material";



declare module "@mui/material/styles" {
    interface Theme {
        status: {
            ui_color_text: string;
            ui_color_textDark?: string;
            ui_color_textOpacity:string
        }

    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            ui_color_text?: string;
            ui_color_textDark?: string;
            ui_color_textOpacity?:string
        }

    }
    interface PaletteOptions {

    }
}
export const theme = createTheme({
    status : {
        ui_color_text:'#E5DCCB',
        ui_color_textDark: '#847C6E',
        ui_color_textOpacity:'#E5DCCB80'
    },
    palette :{
        primary : {
            main:'#847C6E',
            contrastText:'#E5DCCB'
        },
        success :{
            light: '#000',
            main:'#E5DCCB',
            dark:'#E5DCCB',
            contrastText:'#847C6E'
        }
    }
    })

export const CustomTextField = styled(InputBase)(({theme}) => ({
    border: `1px solid ${theme.status.ui_color_textOpacity}`,
    color: theme.status.ui_color_text,
    padding:theme.spacing(1.5),
    fontSize: '18px',
    borderRadius: theme.shape.borderRadius,
    '&:hover' : {
        borderColor: theme.status.ui_color_text
    },
    '&:focus' : {
        borderColor: theme.status.ui_color_text
    },
    '&:placeholder' : {
        fontSize:'15px'
    }
}))

export const CustomButton = styled(Button)(({theme,color}) => ({
    backgroundColor: color ? color :theme.status.ui_color_textDark,
    color: color ? color : theme.status.ui_color_text,
    '&:hover' :{
        backgroundColor:color ?  color : 'rgb(92, 86, 77)',
    }
}))
