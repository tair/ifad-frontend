import React from "react";
import { AppBar, Toolbar, Typography, makeStyles, Theme } from "@material-ui/core";
import { ResponsiveContainer, PieChart, Pie, Text, Label, XAxis, Cell } from "recharts";
import { withPieChartData, AnnotationCategory } from "./store";
import { AspectPie } from "./pie";
import { useLocation, useHistory } from "react-router-dom";

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

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export const WGS = () => {
    const {
        BP, CC, MF
    } = withPieChartData();
    const styles = withStyles({});

    const query = useQuery();
    const history = useHistory();

    const [selectedCategories, setSelectedCategories] = React.useState({ BP: query.getAll("BP") as AnnotationCategory[], CC: query.getAll("CC") as AnnotationCategory[], MF: query.getAll("MF") as AnnotationCategory[]});

    React.useEffect(() => {
        let params = new URLSearchParams();
        Object.entries(selectedCategories).forEach(([aspect, cats]) => {
            for(const cat of cats){
                params.append(aspect, cat);
            }
        })
        history.push({search: `?${params}`})
    }, [selectedCategories])

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
                    <AspectPie data={MF} label="Molecular Function" onActiveChange={(actives) => setSelectedCategories(cats => ({ ...cats, MF: actives }))} activeCategories={selectedCategories.MF} />
                    <AspectPie data={BP} label="Biological Process" onActiveChange={(actives) => setSelectedCategories(cats => ({ ...cats, BP: actives }))} activeCategories={selectedCategories.BP} />
                    <AspectPie data={CC} label="Cellular Component" onActiveChange={(actives) => setSelectedCategories(cats => ({ ...cats, CC: actives }))} activeCategories={selectedCategories.CC} />
                </div>
                <div className={styles.mainContainer}>
                    <div>{JSON.stringify(selectedCategories)}</div>
                </div>
            </div>
        </>
    )
}