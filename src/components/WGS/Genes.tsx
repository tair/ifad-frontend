import React from "react";
import { IPieChartFilter, withGenes, FilterMode } from "./store";
import { CircularProgress } from "@material-ui/core";

export const Genes = ({filters, operator}: {filters: IPieChartFilter[], operator: FilterMode}) => {
    const [loading, genes] = withGenes(filters, operator);
    return (
        <>
            {loading ? <CircularProgress/> : null}
            <div>Hello. {genes.length} genes match this query.</div>
        </>
    );
}