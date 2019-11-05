import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, makeStyles, Theme, Paper, Tabs, Tab } from "@material-ui/core";
import { withPieChartData, AnnotationCategory, IPieChartFilter } from "./store";
import { AspectPie } from "./pie";
import { useLocation, useHistory, Link } from "react-router-dom";
import { __RouterContext as RouteContext, useRouteMatch, Redirect } from "react-router";
import { Genes } from "./Genes";
import { Annotations } from "./Annotations";

const TabPanel = (props: { children: JSX.Element | JSX.Element[], index: any, value: any }) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {children}
        </Typography>
    );
}


const withStyles = makeStyles((theme: Theme) => ({
    chartContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-around",
        marginTop: theme.spacing(2)
    },
    mainContainer: {
        flexGrow: 10
    },
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: theme.spacing(5)
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
        P,F,C
    } = withPieChartData();
    const styles = withStyles({});

    const query = useQuery();
    const history = useHistory();

    const calculateSelected = () => ({ P: query.getAll("P") as AnnotationCategory[], F: query.getAll("F") as AnnotationCategory[], C: query.getAll("C") as AnnotationCategory[] });
    const selectedCategories = React.useMemo(calculateSelected, [query]);
    const filters: Array<IPieChartFilter> = React.useMemo(
        (
            () => Object.entries(selectedCategories)
                        .map(([aspect, categories]: [keyof typeof selectedCategories, AnnotationCategory[]]) => categories.map(category => ({aspect, category})))
                        .reduce((accum,curr) => ([...accum,...curr]), [])
        ),
        [selectedCategories]
    );

    const setSelectedCategories = (sel: typeof selectedCategories) => {
        let params = new URLSearchParams();
        Object.entries(sel).forEach(([aspect, cats]) => {
            for (const cat of cats) {
                params.append(aspect, cat);
            }
        })
        history.push({ search: `?${params}` })
    };

    const match_path = React.useContext(RouteContext).match.path;

    const sub_match = useRouteMatch<{ route: string }>(`${match_path}/:route`);

    const filter = filters.map(f => `${f.aspect},${f.category}`).join("&");

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
                    <AspectPie data={F} label="Molecular Function" onActiveChange={(actives) => setSelectedCategories(({ ...selectedCategories, F: actives }))} activeCategories={selectedCategories.F} />
                    <AspectPie data={P} label="Biological Process" onActiveChange={(actives) => setSelectedCategories(({ ...selectedCategories, P: actives }))} activeCategories={selectedCategories.P} />
                    <AspectPie data={C} label="Cellular Component" onActiveChange={(actives) => setSelectedCategories(({ ...selectedCategories, C: actives }))} activeCategories={selectedCategories.C} />
                </div>
                <Typography variant="h4">Filter: {filter}</Typography>
                <div className={styles.mainContainer}>
                    {
                        sub_match ? (
                            <>
                                <Tabs value={sub_match.params.route}>
                                    <Tab component={Link} to={"genes"} value={"genes"} label="Gene IDs" />
                                    <Tab component={Link} to={"annotations"} value={"annotations"} label="Annotations" />
                                </Tabs>
                                <TabPanel value={"genes"} index={sub_match.params.route}>
                                    <Genes filters={filters}/> 
                                </TabPanel>
                                <TabPanel value={"annotations"} index={sub_match.params.route}>
                                    <Annotations filters={filters}/> 
                                </TabPanel>
                            </>
                        ) : <Redirect to={`${match_path}/genes`} />
                    }
                </div>
            </div>
        </>
    )
}