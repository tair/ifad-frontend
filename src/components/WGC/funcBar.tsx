import React from "react";
import { Toolbar, makeStyles, Theme} from "@material-ui/core";
import { Nav } from "../Nav/Navbar"
import { grey } from "@material-ui/core/colors";
import { BarChart, Bar, CartesianGrid, Cell,  XAxis, YAxis,
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import PropTypes from 'prop-types';


const withStyles = makeStyles((theme: Theme) => ({
    chartContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-around",
        marginTop: theme.spacing(2)
    },
    mainContainer: {
        flexGrow: 10,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
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
}));




export const funcBar = () => {
    const styles = withStyles({});
    const colors = scaleOrdinal(schemeCategory10).range();
    const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
          Z`;

    const data = [
        {
            name: 'Page A', uv: 4000, female: 2400, male: 2400,
        },
        {
            name: 'Page B', uv: 3000, female: 1398, male: 2210,
        },
        {
            name: 'Page C', uv: 2000, female: 9800, male: 2290,
        },
        {
            name: 'Page D', uv: 2780, female: 3908, male: 2000,
        },
        {
            name: 'Page E', uv: 1890, female: 4800, male: 2181,
        },
        {
            name: 'Page F', uv: 2390, female: 3800, male: 2500,
        },
        {
            name: 'Page G', uv: 3490, female: 4300, male: 2100,
        },
    ];

    const TriangleBar = (props) => {
        const {
            fill, x, y, width, height,
        } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    TriangleBar.propTypes = {
        fill: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number,
    };

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
                <b>Cellular Component</b> 
                <BarChart
                    width={650}
                    height={400}
                    data={data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))
                        }
                    </Bar>
                </BarChart>
                <b>Biological Process</b>
                <BarChart
                    width={650}
                    height={400}
                    data={data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))
                        }
                    </Bar>
                </BarChart>
                <b>Molecular Function</b>
                <BarChart
                    width={650}
                    height={400}
                    data={data}
                    margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Bar dataKey="female" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))
                        }
                    </Bar>
                </BarChart>


            </div>
        </div>
        </>
    )
};
