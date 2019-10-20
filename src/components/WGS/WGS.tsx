import React from "react";
import { AppBar, Toolbar, Typography, makeStyles, Theme } from "@material-ui/core";
import { ResponsiveContainer, PieChart, Pie, Text, Label, XAxis, Cell } from "recharts";
import { withPieChartData, AnnotationCategory } from "./store";

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

const COLORS: {[key in AnnotationCategory]: string} = {
    'EXP': '#0088FE',
    'Other': '#00C49F',
    'Unannotated': '#FFBB28',
    'Unknown': '#FF8042'
};

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
                    <div style={{ width: "100%" }}>
                        <h3 className={styles.header}>Molecular Function</h3>
                        <ResponsiveContainer height={150}>
                            <PieChart height={150}>
                                <Pie activeIndex={0} activeShape={<div>Wat</div>} data={MF} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label={({ name, percent }) => `${name} - ${+percent * 100}%`}>
                                    {MF.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: "100%" }}>
                        <h3 className={styles.header}>Biological Process</h3>
                        <ResponsiveContainer height={150}>
                            <PieChart height={150}>
                                <Pie data={BP} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label={({ name, percent }) => `${name} - ${+percent * 100}%`}>
                                    {BP.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ width: "100%" }}>
                        <h3 className={styles.header}>Cellular Component</h3>
                        <ResponsiveContainer height={150}>
                            <PieChart height={150}>
                                <Pie data={CC} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label={({ name, percent }) => `${name} - ${+percent * 100}%`}>
                                    {CC.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />)}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className={styles.mainContainer}>
                    <div>Hello world</div>
                </div>
            </div>
        </>
    )
}