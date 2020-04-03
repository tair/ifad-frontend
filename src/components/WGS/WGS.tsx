import React from "react";
import { AppBar, Toolbar, Typography, makeStyles, Theme, Tabs, Tab, IconButton, Tooltip } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import {withPieChartData, AnnotationCategory, IPieChartSegment, QueryStrategy, GeneProductTypeFilter} from "./store";
import { AspectPie } from "./pie";
import { useLocation, useHistory, Link } from "react-router-dom";
import { __RouterContext as RouteContext, useRouteMatch, Redirect } from "react-router";
import { Genes } from "./Genes";
import { Annotations } from "./Annotations";
import { grey } from "@material-ui/core/colors";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

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
    },
    aboutContainer: {
        padding: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        marginBottom: theme.spacing(3),
        borderBottom: `2px solid ${grey[500]}`
    }
}))

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const aspectHR = {
    'F': "Molecular Function",
    'P': "Biological Process",
    'C': "Celluar Component"
};

const statusHR = {
    'EXP': "Experimentally Known",
    'OTHER': "Known Other",
    'UNKNOWN': "Annotated Unknown",
    'UNANNOTATED': "Unannotated"
}

const strategyHR = {
    'intersection': "And",
    'union': "Or",
}

export const WGS = () => {
    const {
        P, F, C
    } = withPieChartData();
    const styles = withStyles({});

    const query = useQuery();
    const history = useHistory();

    const strategy = React.useMemo<QueryStrategy>((() => query.get("strategy") as QueryStrategy || 'union'), [query]);
    const filter: GeneProductTypeFilter = React.useMemo<GeneProductTypeFilter>((() => query.get("filter") as GeneProductTypeFilter || 'exclude_pseudogene'), [query]);
    const calculateSelected = () => ({ P: query.getAll("P") as AnnotationCategory[], F: query.getAll("F") as AnnotationCategory[], C: query.getAll("C") as AnnotationCategory[] });
    const selectedCategories = React.useMemo(calculateSelected, [query]);
    const segments: Array<IPieChartSegment> = React.useMemo(
        (
            () => Object.entries(selectedCategories)
                .map(([aspect, categories]: [keyof typeof selectedCategories, AnnotationCategory[]]) => categories.map(category => ({ aspect, category })))
                .reduce((accum, curr) => ([...accum, ...curr]), [])
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
        params.set("strategy", strategy);
        history.push({ search: `?${params}` })
    };

    const setOperator = (strategy: QueryStrategy) => {
        query.set("strategy", strategy);
        history.push({ search: `?${query}` });
    }

    const match_path = React.useContext(RouteContext).match.path;

    const sub_match = useRouteMatch<{ route: string }>(`${match_path}/:route`);

    // const filter = filters.map(f => `${f.aspect},${f.category}`).join("&");

    return (
        <>
            <AppBar color="primary" position="absolute">
                <Toolbar>
                    <Typography>Whole Genome Snapshot</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <div className={styles.container}>
                <div className={styles.aboutContainer}>
                    Explore the state of annotation of the Arabidopsis thaliana genome based on annotation status using the Gene Ontology (GO) aspects of Molecular Function, Biological Process, and Cellular Component.
                </div>
                <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <Tooltip title="Reset filters">
                        <IconButton onClick={() => setSelectedCategories({ F: [], P: [], C: [] })} ><RotateLeftIcon /></IconButton>
                    </Tooltip>
                </div>
                <div className={styles.chartContainer}>
                    <AspectPie data={F} label="Molecular Function" onActiveChange={(actives) => setSelectedCategories(({ ...selectedCategories, F: actives }))} activeCategories={selectedCategories.F} />
                    <AspectPie data={P} label="Biological Process" onActiveChange={(actives) => setSelectedCategories(({ ...selectedCategories, P: actives }))} activeCategories={selectedCategories.P} />
                    <AspectPie data={C} label="Cellular Component" onActiveChange={(actives) => setSelectedCategories(({ ...selectedCategories, C: actives }))} activeCategories={selectedCategories.C} />
                </div>
                <Typography variant="h6">Filter: <ul>{segments.map(f => <span>{aspectHR[f.aspect]} - {statusHR[f.category]}</span>).reduce((accum, curr) => [...accum, <li> {curr} {accum.length < segments.length - 1 ? <b> {strategyHR[strategy]} </b> : null} </li>], [])}</ul></Typography>
                <ToggleButtonGroup
                        value={strategy}
                        exclusive
                        onChange={(_, v) => setOperator(v)}
                    >
                        <ToggleButton value="union">Or</ToggleButton>
                        <ToggleButton value="intersection">And</ToggleButton>
                    </ToggleButtonGroup>
                <div className={styles.mainContainer}>
                    {
                        sub_match ? (
                            <>
                                <Tabs value={sub_match.params.route}>
                                    <Tab component={Link} to={{ pathname: "genes", search: '' + query }} value={"genes"} label="Gene IDs" />
                                    <Tab component={Link} to={{ pathname: "annotations", search: '' + query }} value={"annotations"} label="Annotations" />
                                </Tabs>
                                <TabPanel value={"annotations"} index={sub_match.params.route}>
                                    <Annotations segments={segments} strategy={strategy} filter={filter} />
                                </TabPanel>
                                <TabPanel value={"genes"} index={sub_match.params.route}>
                                    <Genes segments={segments} strategy={strategy} filter={filter} />
                                </TabPanel>
                            </>
                        ) : <Redirect to={`${match_path}/genes`} />
                    }
                </div>
            </div>
        </>
    )
}