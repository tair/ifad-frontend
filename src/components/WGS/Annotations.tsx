import React from "react";
import { IPieChartFilter, FilterMode, withGenes } from "./store";
import { CircularProgress, Button } from "@material-ui/core";

export const Annotations = ({filters, operator}: {filters: IPieChartFilter[], operator: FilterMode}) => {
    const results = withGenes(filters, operator);
    return (
        <>
            {results.loading ? <CircularProgress/> : (
                <>
                    <div>Hello. {results.annotationCount} annotations match this query.</div>
                    <Button onClick={results.triggerAnnotationDownload}>Download</Button>
                </>
            )}
        </>
    );
}