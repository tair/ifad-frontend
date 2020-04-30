import React from "react";
import { Toolbar, Typography, makeStyles, Theme, Button } from "@material-ui/core";
import { Nav } from "../Nav/Navbar"
import { Annotations } from "../WGS/Annotations";
import { grey } from "@material-ui/core/colors";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import {
    PieChart, Pie, Legend, Tooltip, ScatterChart, Scatter, XAxis, YAxis, ZAxis,
} from 'recharts';


const withStyles = makeStyles((theme: Theme) => ({
    chartContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-around",
        marginTop: theme.spacing(2)
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
        padding: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        marginBottom: theme.spacing(3),
        borderBottom: `2px solid ${grey[500]}`
    },
    v1: {
        borderLeft: "2px solid gray",
        height: "inherit",
        marginLeft: "2%",
        marginRight: "2%",
    },
}))




export const funcPie = () => {
    const styles = withStyles({});
    const data01 = [
        { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
        { name: 'Group E', value: 278 }, { name: 'Group F', value: 189 },
    ];

    const data02 = [
        { name: 'Group A', value: 2400 }, { name: 'Group B', value: 4567 },
        { name: 'Group C', value: 1398 }, { name: 'Group D', value: 9800 },
        { name: 'Group E', value: 3908 }, { name: 'Group F', value: 4800 },
    ];
    
        // const filter = filters.map(f => `${f.aspect},${f.category}`).join("&");
        return (
            <>
            <Nav/>
            <Toolbar/>
            <div className={styles.container}>
                <div className={styles.aboutContainer}>
                    Explore the state of annotation of the Arabidopsis thaliana genome based on annotation status using
                    the Gene Ontology (GO) aspects of Molecular Function, Biological Process, and Cellular Component.
                </div>

                <div className={styles.mainContainer}>
                    <div style={{textAlign: "center", fontWeight: "bold"}}>
                        Cellular Component
                        <PieChart width={400} height={400}>
                            <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200}
                                 outerRadius={80} fill="#8884d8" label/>
                            <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80}
                                 fill="#82ca9d"/>
                            <Tooltip/>
                        </PieChart>
                    </div>

                    <div style={{textAlign: "center", fontWeight: "bold"}}>
                        Biological Process
                        <PieChart width={400} height={400}>
                            <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200}
                                 outerRadius={80} fill="#8884d8" label/>
                            <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80}
                                 fill="#82ca9d"/>
                            <Tooltip/>
                        </PieChart>
                        
                    </div>

                    <div style={{textAlign: "center", fontWeight: "bold"}}>
                        Molecular Function
                        <PieChart width={400} height={400}>
                            <Pie dataKey="value" isAnimationActive={false} data={data01} cx={200} cy={200}
                                 outerRadius={80} fill="#8884d8" label/>
                            <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80}
                                 fill="#82ca9d"/>
                            <Tooltip/>
                        </PieChart>
                        
                    </div>


                </div>
            </div>
            </>
        )
    }

