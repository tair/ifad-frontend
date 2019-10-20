import { IPieChartSlice } from "./store";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import React from "react";
import { ResponsiveContainer, PieChart, Pie } from "recharts";

const withStyles = makeStyles((theme: Theme) => ({
    header: {
        textAlign: "center"
    }
}))

export interface IAspectPieProps {
    data: IPieChartSlice[]
}

export const AspectPie = ({data}: IAspectPieProps) => {
    const styles = withStyles({});

    return (
        <div style={{ width: "100%" }}>
            <h3 className={styles.header}>Molecular Function</h3>
            <ResponsiveContainer height={150}>
                <PieChart height={150}>
                    <Pie activeIndex={0} activeShape={<div>Wat</div>} data={MF} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label={({ name, percent }) => `${name} - ${+percent * 100}%`}>
                        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}