import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, makeStyles, Theme, Paper, Tabs, Tab } from "@material-ui/core";
import { withPieChartData, AnnotationCategory } from "./store";
import { AspectPie } from "./pie";
import { useLocation, useHistory, Link } from "react-router-dom";
import { __RouterContext as RouteContext, useRouteMatch } from "react-router";

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
        BP, CC, MF
    } = withPieChartData();
    const styles = withStyles({});

    const query = useQuery();
    const history = useHistory();

    const calculateSelected = () => ({ BP: query.getAll("BP") as AnnotationCategory[], CC: query.getAll("CC") as AnnotationCategory[], MF: query.getAll("MF") as AnnotationCategory[] });
    const selectedCategories = React.useMemo(calculateSelected, [query]);

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
    console.log(match_path);

    const sub_match = useRouteMatch<{ route: string }>(`${match_path}/:route`);

    // React.useEffect(() => {
    //     setSelectedCategories(calculateSelected())
    // }, [query])

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
                    <AspectPie data={MF} label="Molecular Function" onActiveChange={(actives) => setSelectedCategories(({ ...selectedCategories, MF: actives }))} activeCategories={selectedCategories.MF} />
                    <AspectPie data={BP} label="Biological Process" onActiveChange={(actives) => setSelectedCategories(({ ...selectedCategories, BP: actives }))} activeCategories={selectedCategories.BP} />
                    <AspectPie data={CC} label="Cellular Component" onActiveChange={(actives) => setSelectedCategories(({ ...selectedCategories, CC: actives }))} activeCategories={selectedCategories.CC} />
                </div>
                <div className={styles.mainContainer}>
                        <Tabs value={sub_match.params.route}>
                            <Tab component={Link} to={"genes"} value={"genes"} label="Gene IDs" />
                            <Tab component={Link} to={"annotations"} value={"annotations"} label="Annotations" />
                        </Tabs>
                        <TabPanel value={"genes"} index={sub_match.params.route}>
                            <Typography>Genes!</Typography>
                        </TabPanel>
                        <TabPanel value={"annotations"} index={sub_match.params.route}>
                            <Typography>Annotations!</Typography>
                        </TabPanel>
                </div>
            </div>
        </>
    )
}