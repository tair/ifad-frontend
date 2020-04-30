import React from "react";
import { Link } from 'react-router-dom';
import { AppBar, Typography, makeStyles, Theme } from "@material-ui/core";



const withStyles = makeStyles((theme: Theme) => ({
    v1: {
        borderLeft: "2px solid gray",
        height: "inherit",
        marginLeft: "2%",
        marginRight: "2%",
    },
    appBar: {
        display: "flex",
        flexDirection: "row",
        padding: '1%',
        justifyContent: "end",
    },
    link: {
        textDecoration: "none",
        color: "white"
    }
}))

export const Nav = () => {
    const styles = withStyles({});
    return(
        <AppBar className={styles.appBar} color="primary" position="absolute">
            <Link className={styles.link} to="/snapshot"><Typography><b>Whole Genome Snapshot</b></Typography></Link>
            <div className={styles.v1}> </div>
            <Link className={styles.link} to="/functional"><Typography><b>Functional Categorization</b></Typography></Link>
            <div className={styles.v1}> </div>
            <Link className={styles.link} to="/mapper"><Typography><b>GO Term Mapper</b></Typography></Link>

        </AppBar>
    )
    
}

    