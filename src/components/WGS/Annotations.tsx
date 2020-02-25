import React from "react";
import { IPieChartFilter, FilterMode, withGenes } from "./store";
import { CircularProgress, Button } from "@material-ui/core";

export const Annotations = ({filters, operator, metadata}: {filters: IPieChartFilter[], operator: FilterMode, metadata: string}) => {
    const results = withGenes(filters, operator);
    return (
        <>
            {results.loading ? <CircularProgress/> : (
                <>
                    <div>Hello. {results.annotationCount} annotations match this query.</div>
                    <Button onClick={results.triggerAnnotationDownload}>Download</Button>
                    <pre>{metadata}</pre>
                </>
            )}
        </>
    );
}