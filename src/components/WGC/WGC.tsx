import React from "react";
import { Toolbar, makeStyles, Theme, Button } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Nav } from "../Nav/Navbar";
import { useHistory } from "react-router-dom";


const withStyles = makeStyles((theme: Theme) => ({
    chartContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-around",
        marginTop: theme.spacing(2)
    },
    optionContainer: {
        display: "flex",
        justifyContent: "space-between",
    },
    
    mainContainer: {
        flexGrow: 10,
        display: "flex"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        padding: theme.spacing(5)
    },
    header: {
        textAlign: "center"
    },
    aboutContainer: {
        marginBottom: theme.spacing(3),
        borderBottom: `2px solid ${grey[500]}`
    },
    v1: {
        borderLeft: "2px solid gray",
        height: "inherit",
        marginLeft: "2%",
        marginRight: "2%",
    },
    formDiv: {
        display: "flex",
        justifyContent: "center",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    table: {
        minWidth: 650,
    },
    button: {
        height: "45%",
        width: "max-content",
        backgroundColor: "#19857b",
        color: "white",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
        }
    },
    Gbutton: {
        marginLeft: "3%",
        paddingTop: "4%",
        paddingBottom: "4%",
        width: "max-content",
        height: "45%",
        backgroundColor: "#19857b",
        color: "white",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
        }
    }
}));

function createData(keyCat: string, funCat: string, anCnt: number, gCnt: number) {
    return { keyCat, funCat, anCnt, gCnt };
}

const rows = [
    createData('GO Cellular Component', "nucleus", 6.0, 24 ),
    createData('GO Cellular Component', "plasma", 9.0, 37),
    createData('GO Cellular Component', "cytosol", 16.0, 24),
    createData('GO Cellular Component', "cytoplasm lol", 3.7, 67),
    createData('GO Cellular Component', "nucleus", 6.0, 24 ),
    createData('GO Cellular Component', "plasma", 9.0, 37),
    createData('GO Cellular Component', "cytosol", 16.0, 24),
    createData('GO Cellular Component', "cytoplasm lol", 3.7, 67),
    createData('GO Cellular Component', "nucleus", 6.0, 24 ),
    createData('GO Cellular Component', "plasma", 9.0, 37),
    createData('GO Cellular Component', "cytosol", 16.0, 24),
    createData('GO Cellular Component', "cytoplasm lol", 3.7, 67), createData('GO Cellular Component', "nucleus", 6.0, 24 ),
    createData('GO Cellular Component', "plasma", 9.0, 37),
    createData('GO Cellular Component', "cytosol", 16.0, 24),
    createData('GO Cellular Component', "cytoplasm lol", 3.7, 67), createData('GO Cellular Component', "nucleus", 6.0, 24 ),
    createData('GO Cellular Component', "plasma", 9.0, 37),
    createData('GO Cellular Component', "cytosol", 16.0, 24),
    createData('GO Cellular Component', "cytoplasm lol", 3.7, 67),
];


export const WGC = () => {
 
    const styles = withStyles({});
    
    const [chart, setChart] = React.useState('');
    const [count, setCount] = React.useState('');
    
    const handleCountChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setCount(event.target.value as string);
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setChart(event.target.value as string);
    };
    const history = useHistory();
    const draw = () => {
        if(chart === "pie") {
            history.push("/pie")
        }
        else{
            history.push("/bar") 
        }
    };
    

    return (
        <>
        <Nav />
        <Toolbar />
        <div className={styles.container}>
            <div className={styles.aboutContainer}>
                <h2> Whole Genome Categorization</h2>
            </div>
            
            <div className={styles.optionContainer}>
                <div className={styles.formDiv}>
                    <FormControl className={styles.formControl}>

                        <Select
                            displayEmpty
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={chart}
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value={"pie"}>Annotation Pie Chart</MenuItem>
                            <MenuItem value={"bar"}>Gene Bar Chart</MenuItem>
                        </Select>
                        <FormHelperText>Pick Chart</FormHelperText>
                        
                    </FormControl>
                   
                    <Button onClick={draw} className={styles.button} variant="outlined">
                        Draw
                    </Button>

                    <Button href="#/custom" className={styles.Gbutton} variant="outlined">
                        <p>Input Genes</p>
                    </Button>
                </div>
                
                <div className={styles.formDiv}>
                    <FormControl className={styles.formControl}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={count}
                            onChange={handleCountChange}
                        >
                            <MenuItem value={"aCount"}>Annotation Count</MenuItem>
                            <MenuItem value={"gCount"}>Gene Count</MenuItem>
                        </Select>
                        <FormHelperText>Sort By</FormHelperText>
                    </FormControl>
                    <Button className={styles.button} variant="outlined">
                        Sort
                    </Button>
                </div>
                
            </div>
            <div className={styles.chartContainer}>
                <TableContainer component={Paper}>
                    <Table className={styles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell size={"small"} ><b>Keyword Category</b></TableCell>
                                <TableCell size={"small"} align="right"><b>Functional Category</b></TableCell>
                                <TableCell size={"small"} align="right"><b>Annotation Count</b></TableCell>
                                <TableCell size={"small"} align="right"><b>Gene Count</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow>
                                    <TableCell size={"small"} component="th" scope="row">
                                        {row.keyCat}
                                    </TableCell>
                                    <TableCell size={"small"} align="right">{row.funCat}</TableCell>
                                    <TableCell size={"small"} align="right">{row.anCnt}</TableCell>
                                    <TableCell size={"small"} align="right">{row.gCnt}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div style={{
                display: "inherit",
                alignItems: "center",
                marginTop: 12
            }}>
                
            </div>
                
               

            </div>
        
        </>
    )
};