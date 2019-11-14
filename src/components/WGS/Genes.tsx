import React from "react";
import { IPieChartFilter, withGenes, FilterMode } from "./store";
import { CircularProgress, Button } from "@material-ui/core";

export const Genes = ({filters, operator}: {filters: IPieChartFilter[], operator: FilterMode}) => {
    const {loading, geneCount, triggerGeneDownload} = withGenes(filters, operator);
    return (
        <>
            {loading ? <CircularProgress/> : (
                <>
                    <div>Hello. {geneCount} genes match this query.</div>
                    <Button onClick={triggerGeneDownload}>Download</Button>
                </>
            )}
        </>
    );
}