import React from "react";
import {GeneProductTypeFilter, IPieChartSegment, QueryStrategy, withGenes} from "./store";
import { CircularProgress, Button, Typography } from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export const Annotations = ({segments, strategy, filter}: {segments: IPieChartSegment[], strategy: QueryStrategy, filter: GeneProductTypeFilter}) => {
    const results = withGenes(segments, strategy, filter);
    return (
        <div style={{padding:16, display:"flex", flexDirection:"column"}}>
            {results.loading ? <CircularProgress/> : results.error ? <span>{JSON.stringify(results.error)}</span> : (
                <>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={results.triggerAnnotationDownload}
                        endIcon={<CloudDownloadIcon/>}
                    ><Typography>Download {results.annotationCount} annotations</Typography></Button>

                    <h4>Source Metadata:</h4>
                    <pre style={{overflow:"auto", maxHeight:300}}>{results.annotationsMeta}</pre>
                </>
            )}
        </div>
    );
}