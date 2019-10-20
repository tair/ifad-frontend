import React from "react";
import { AppBar, Toolbar, Typography, makeStyles, Theme } from "@material-ui/core";
import { ResponsiveContainer, PieChart, Pie, Text, Label, XAxis, Cell } from "recharts";
import { withPieChartData, AnnotationCategory } from "./store";
import { AspectPie } from "./pie";

const withStyles = makeStyles((theme: Theme) => ({
    chartContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-around",
        marginTop: theme.spacing(2)
    },
    mainContainer: {
        flexGrow: 3
    },
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    header: {
        textAlign: "center"
    }
}))



export const WGS = () => {
    const {
        BP, CC, MF
    } = withPieChartData();
    const styles = withStyles({});

    return (
        <>
            <AppBar color="primary" position="absolute">
                <Toolbar>
                    <Typography>Whole Geneome Snapshot</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <div className={styles.container}>
                <div className={styles.chartContainer}>
                    <AspectPie data={MF} label="Molecular Function"/>
                    <AspectPie data={BP} label="Biological Process"/>
                    <AspectPie data={CC} label="Cellular Component"/>
                </div>
                <div className={styles.mainContainer}>
                    <div>Hello world</div>
                </div>
            </div>
        </>
    )
}