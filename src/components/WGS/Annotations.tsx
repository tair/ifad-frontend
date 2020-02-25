import React from "react";
import { IPieChartFilter, FilterMode, withGenes } from "./store";
import { CircularProgress, Button } from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export const Annotations = ({filters, operator}: {filters: IPieChartFilter[], operator: FilterMode}) => {
    const results = withGenes(filters, operator);
    return (
        <div style={{padding:16}}>
            {results.loading ? <CircularProgress/> : (
                <>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={results.triggerAnnotationDownload}
                        endIcon={<CloudDownloadIcon/>}
                    >Download {results.annotationCount} annotations</Button>

                    <h4>Source Metadata:</h4>
                    <pre>{results.annotationsMeta}</pre>
                </>
            )}
        </div>
    );
}