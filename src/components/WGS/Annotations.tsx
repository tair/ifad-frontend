import React from "react";
import {GeneProductTypeFilter, IPieChartSegment, QueryStrategy, withGenes} from "./store";
import { CircularProgress, Button } from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export const Annotations = ({segments, strategy, filter}: {segments: IPieChartSegment[], strategy: QueryStrategy, filter: GeneProductTypeFilter}) => {
    const results = withGenes(segments, strategy, filter);
    return (
        <div style={{padding:16}}>
            {results.loading ? <CircularProgress/> : results.error ? <span>{JSON.stringify(results.error)}</span> : (
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