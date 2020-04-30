import React from "react";
import { Toolbar, Typography, makeStyles, Theme, Button} from "@material-ui/core";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Nav } from "../Nav/Navbar"
import { grey } from "@material-ui/core/colors";
import Radio from '@material-ui/core/Radio';



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
        width: "70%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "8%",
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

export const custom = () => {

    const styles = withStyles({});
    

    const [selectedOutput, setSelectedValue] = React.useState('HTML');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
        <Nav/>
        <Toolbar />
        <div className={styles.container}>
            <div className={styles.aboutContainer}>
                <h2>  Custom Functional Categorization of the Arabidopsis Genome</h2>
                Paste locus identifiers (such as At1g01030) into the textbox and press one of the submit buttons below. The identifiers have to be separated by tabs, commas, carriage returns or spaces. Alternatively, you can upload a file, same formatting as for the textbox. Clicking on Functional categorization will group the genes into broad functional categories based on the high level terms in GO hierarchy.

                You may download the whole genome GO annotations from TAIR Downloads Site.

                Do you want to look for over-represented terms in your data set?
                Try GO Term Enrichment : A GO tool for statistical comparisons of annotations between two data sets
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
              <div style={{padding:10, display:"flex", justifyContent:"space-around"}} >
                  <b>Locus Identifiers</b>
                  <TextareaAutosize style={{width: "40%" }} aria-label="minimum height" rowsMin={10} />
              </div>
                <div style={{padding:10, display:"flex", justifyContent:"space-around"}}>
                    <b>Select Output </b>
                    <div style={{display: "flex", flexDirection:"row"}}>
                        <Radio
                            checked={selectedOutput === 'HTML'}
                            onChange={handleRadioChange}
                            value="HTML"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <p>HTML</p>
                    </div>
                    <div style={{display: "flex", flexDirection:"row"}}>
                        <Radio
                            checked={selectedOutput === 'TEXT'}
                            onChange={handleRadioChange}
                            value="TEXT"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'B' }}
                        /> <p>TEXT</p>
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
                            ><Typography style={{fontSize:12}}>Reset</Typography></Button>
                        </div>
                        
                        </>
                        
                    </div>
                    <div style={{padding:16, display:"flex", flexDirection:"row"}}>
                        <>
                        <div className={styles.button}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                            ><Typography style={{fontSize:12}}>Get All GO Annotations</Typography></Button>
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
                            ><Typography style={{fontSize:12}}>Functional Categorization</Typography></Button>
                        </div>
                        
                        </>

                    </div>
                </div>

            </div>
        </div>
        </>
    )
};

