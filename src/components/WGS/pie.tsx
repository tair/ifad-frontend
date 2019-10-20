import { IPieChartSlice } from "./store";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, PieLabelRenderProps, Sector, LegendPayload } from "recharts";
import { COLORS } from "../../utils/theme";

const withStyles = makeStyles((theme: Theme) => ({
    header: {
        textAlign: "center"
    }
}))

export interface IAspectPieProps {
    data: IPieChartSlice[];
    label: string;
    onActiveChange?: (actives: string[]) => void;
}

function toggleElementInArray(el: number, arr: number[]){
    if(arr.indexOf(el)>=0){
        return arr.filter(e => e !== el)
    } else {
        return [...arr,el];
    }
}

export const AspectPie = ({ data, label, onActiveChange }: IAspectPieProps) => {
    const styles = withStyles({});

    const [activeIndexes, setActiveIndexes] = React.useState([]);

    React.useEffect(() => {
        if(onActiveChange){
            onActiveChange(activeIndexes.map(idx => data[idx].name))
        }
    }, [activeIndexes])

    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }: PieLabelRenderProps) => {
        const RADIAN = Math.PI / 180;
        const radius = (parseFloat('' + outerRadius) - parseFloat('' + innerRadius)) * 0.5;
        const x = parseFloat('' + cx) + radius * Math.cos(-midAngle * RADIAN);
        const y = parseFloat('' + cy) + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text onClick={()=>setActiveIndexes(idxs=>toggleElementInArray(index, idxs))} style={{userSelect:"none"}} x={x} y={y} fill="white" fontWeight={activeIndexes.indexOf(index)>=0 ? "bolder" : "normal"} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const renderActiveShape = (props) => {
        const {
            cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, onClick 
        } = props;
        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    stroke={"white"}
                    fill={fill}
                    onClick={onClick}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 3}
                    outerRadius={outerRadius + 10}
                    stroke={"white"}
                    fill={fill}
                    onClick={onClick}
                />
            </g>
        );
    };

    const legendFormatter = (value: string) => {
        return <span style={{userSelect:"none", fontWeight: activeIndexes.indexOf(data.indexOf(data.find(d=>d.name==value)))>=0 ? "bolder" : "normal"}}>{value}</span>
    }

    return (
        <div key={`pie-${label}-${activeIndexes.length}`} style={{ width: "100%" }}>
            <h3 className={styles.header}>{label}</h3>
            <ResponsiveContainer width={"100%"} height={250}>
                <PieChart width={200} height={200}>
                    <Pie isAnimationActive={false} activeIndex={activeIndexes} activeShape={renderActiveShape} data={data} labelLine={false} dataKey="value" nameKey="name" cx="50%" cy="50%" label={renderCustomizedLabel}>
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name]} onClick={()=>setActiveIndexes(idxs=>toggleElementInArray(index, idxs))} />)}
                    </Pie>
                    <Legend formatter={legendFormatter} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}