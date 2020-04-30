import React from "react";
import { Toolbar, Typography, makeStyles, Theme, Button} from "@material-ui/core";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Nav } from "../Nav/Navbar"
import { grey } from "@material-ui/core/colors";
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';



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
        display: "flex",
        justifyContent: "center",
        height: "120vh",
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
    actual: {
        backgroundColor: "#edeae7",
        height: "fit-content",
        width: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "5%",
        flexWrap: "wrap",
        alignItems: "center"
    },
    v1: {
        borderLeft: "2px solid gray",
        height: "inherit",
        marginLeft: "2%",
        marginRight: "2%",
    },
    formDiv: {
        height: "95%",
        width: "80%",
        border: "1px solid #19857b",
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: "column",
        padding: "3%",
        margin: "2%"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 100,
        width: "70%"
    },
    formRow :{
        display: "flex",
        justifyContent: "flex-start",

    },

    button: {
        height: "65%",
        fontSize: "6px",
        width: "max-content",
        color: "white",
        "&:hover": {
            backgroundColor: "white",
            color: "black",
        }
    }
}));



export const goMapper = () => {

    const styles = withStyles({});

    const [chart, setChart] = React.useState('');
    
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setChart(event.target.value as string);
    };

    const [selectedOutput, setSelectedValue] = React.useState('PROCESS');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    const [checked, setChecked] = React.useState(true);

    const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <>
        <Nav/>
        <Toolbar />
        <div className={styles.container}>
            <div className={styles.aboutContainer}>
                <h2>  GO TERM MAPPER</h2>
                Welcome to the GOTERMMAPPER , a tool for mapping the granular GO annotations for genes in a list to a set of broader, high-level GO parents terms (sometimes referred to as GO Slim terms), allowing you to bin your genes into broad categories.

                The implementation of this Generic GO Term Mapper uses map2slim.pl script written by Chris Mungall at Berkeley Drosophila Genome Project, and some of the modules included in the GO-TermFinder distribution written by Gavin Sherlock and Shuai Weng at Stanford University, made publicly available through the GMOD project.

                GO Term Mapper serves a different function than the GO Term Finder. GO Term Mapper simply bins the submitted gene list to a static set of ancestor GO terms. In contrast, GO Term Finder finds the GO terms significantly enriched in a submitted list of genes.

            </div>


            <div style={{
                display: "inherit",
                alignItems: "center",
                marginTop: 12
            }}>
            </div>
        </div>
        <div className={styles.mainContainer}>
            <div className={styles.actual}>
                <div className={styles.formDiv}>
                    <h2> Basic Inputs</h2>
                    <div style={{padding:10, display:"flex" ,flexDirection: "column"}} >
                        <TextareaAutosize style={{width: "60%" ,height: "70%" }} aria-label="minimum height" rowsMin={8} />
                        <br/>
                        OR
                        <div className={styles.button} style={{marginTop: "2%"}}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                            ><Typography style={{fontSize:12}}>Choose File</Typography></Button>
                        </div>
                    </div>

                    <div style={{padding:10, display:"flex", justifyContent:"flex-start" ,flexWrap: "wrap"}}>
                        <div style={{display: "flex", flexDirection:"row"}}>
                            <Radio
                                checked={selectedOutput === 'PROCESS'}
                                onChange={handleRadioChange}
                                value="PROCESS"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            <p>PROCESS</p>
                        </div>
                        <div style={{display: "flex", flexDirection:"row"}}>
                            <Radio
                                checked={selectedOutput === 'FUNCTION'}
                                onChange={handleRadioChange}
                                value="FUNCTION"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'B' }}
                            /> <p>FUNCTION</p>
                        </div>
                        <div style={{display: "flex", flexDirection:"row"}}>
                            <Radio
                                checked={selectedOutput === 'COMPONENT'}
                                onChange={handleRadioChange}
                                value="COMPONENT"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'C' }}
                            />
                            <p>COMPONENT</p>
                        </div>

                    </div>
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
                        <FormHelperText>Organism (Annotation)</FormHelperText>

                    </FormControl>
                    
                    <div>
                        Output Format:
                        <Checkbox
                            checked={checked}
                            onChange={handleCheckChange}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        /> Plain Text
                        <Checkbox
                            
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        /> HTML
                        
                        
                    </div>
                    <div style={{ marginTop: "6%", display:"flex", flexDirection:"row", }}>
                        Gene URL for the Organism (Optional):
                        <TextField style={{width: "40%"}}/>
                      
                    </div>
                    <div style={{ display:"flex", flexDirection:"row", flexWrap: "wrap", justifyContent: "center"}}>
                        <div style={{padding:16, display:"flex", flexDirection:"row"}}>

                            <>
                            <div className={styles.button}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                ><Typography style={{fontSize:12}}>GOTerm Search</Typography></Button>
                            </div>

                            </>

                        </div>
                        <div style={{padding:16, display:"flex", flexDirection:"row"}}>
                            <>
                            <div className={styles.button}>
                                <Button
                                    href="#/functional/"
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                ><Typography style={{fontSize:12}}>Reset Form</Typography></Button>
                            </div>

                            </>

                        </div>
                    </div>
                    
                </div>
                <div className={styles.formDiv}>
                    <h2> Advanced Options </h2>
                    Please choose ONLY 1 of the 3 options listed below to supply a list of GO slim terms and GOIDs of your choice (for information on GO terms and GOIDs, please refer the AMIGO web site):
                    Please remember to select the correct Ontology Aspect (step 2 in Basic Inputs section above) corresponding to the slim GOID(s) in your GO slim list. For example, to use protein complex terms from the cellular component ontology in the sample component GO macromolecular complex terms, you should choose component for the ontology aspect.
                    <div style={{padding:10, display:"flex" ,flexDirection: "column"}} >
                        1A. Enter List of GO Slim Terms and GOIDs (e.g. cell cycle ; GO:0007049), or List of GOIDs (e.g. GO:0007049)
                        (separate each entry by a return). sample component GO macromolecular complex terms
                        <TextareaAutosize style={{width: "60%" ,height: "70%" }} aria-label="minimum height" rowsMin={8} />
                        <div className={styles.button} style={{marginTop: "2%"}}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                            ><Typography style={{fontSize:12}}>Choose File</Typography></Button>
                        </div>
                    </div>

                    <div style={{padding:10, display:"flex", justifyContent:"flex-start" ,flexWrap: "wrap"}}>
                        <div style={{display: "flex", flexDirection:"row"}}>
                            <Radio
                                checked={selectedOutput === 'PROCESS'}
                                onChange={handleRadioChange}
                                value="PROCESS"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'A' }}
                            />
                            <p>PROCESS</p>
                        </div>
                        <div style={{display: "flex", flexDirection:"row"}}>
                            <Radio
                                checked={selectedOutput === 'FUNCTION'}
                                onChange={handleRadioChange}
                                value="FUNCTION"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'B' }}
                            /> <p>FUNCTION</p>
                        </div>
                        <div style={{display: "flex", flexDirection:"row"}}>
                            <Radio
                                checked={selectedOutput === 'COMPONENT'}
                                onChange={handleRadioChange}
                                value="COMPONENT"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'C' }}
                            />
                            <p>COMPONENT</p>
                        </div>

                    </div>
                    <div style={{ display:"flex", flexDirection:"row", flexWrap: "wrap"}}>
                        <div style={{padding:16, display:"flex", flexDirection:"row"}}>
                            1B. Upload a File Containing a List of GO Slim Terms and GOIDs, or a List of GOIDs:  [CLEAR]
                            (e.g. sample component GO macromolecular complex terms )

                            <>
                            <div className={styles.button}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                ><Typography style={{fontSize:12}}>Choose File</Typography></Button>
                            </div>

                            </>

                        </div>
                        <div style={{padding:16, display:"flex", flexDirection:"row"}}>
                            1C. Upload a GO Slim File in OBO format to use instead of the one selected above:  [CLEAR]
                            (sample generic OBO file)
                            <>
                            <div className={styles.button}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                ><Typography style={{fontSize:12}}>Choose File</Typography></Button>
                            </div>
                            </>

                        </div>
                        <div style={{padding:16, display:"flex", flexDirection:"row"}}>
                            2. Upload a Gene Association File to use instead of the one selected in the pulldown 
                            menu above: (optional)
                            [CLEAR] (110 MB max)
                            ( sample SGD gene association file )
                            <>
                            <div className={styles.button}>
                                <Button
                                    href="#/functional/"
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                ><Typography style={{fontSize:12}}>Choose File</Typography></Button>
                            </div>

                            </>

                        </div>
                        <div style={{ marginLeft: "2%", marginTop: "6%", display:"flex", flexDirection:"row", }}>
                            3. The results for the Advanced Options are estimated to be ready in about 90 seconds but may be done sooner. If you wish to have the results emailed to you instead, please provide your E-mail (optional):
                            <TextField style={{width: "50%"}}/>

                        </div>
                    </div>
                    <div style={{ display:"flex", justifyContent: "center", flexDirection:"row", flexWrap: "wrap"}}>
                        <div style={{padding:16, display:"flex", flexDirection:"row"}}>

                            <>
                            <div className={styles.button}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                ><Typography style={{fontSize:12}}>Search for GOTerms</Typography></Button>
                            </div>

                            </>

                        </div>

                        <div style={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                
                            OR
                        </div>
                        
                        <div style={{padding:16, display:"flex", flexDirection:"row"}}>
                            <>
                            <div className={styles.button}>
                                <Button
                                    href="#/functional/"
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                ><Typography style={{fontSize:12}}>Reset Form</Typography></Button>
                            </div>

                            </>

                        </div>
                    </div>
                </div>
                

            </div>
        </div>
        </>
    )
};