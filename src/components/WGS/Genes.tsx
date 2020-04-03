import React from "react";
import {IPieChartSegment, withGenes, QueryStrategy, GeneProductTypeFilter} from "./store";
import { CircularProgress, Button } from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export const Genes = ({segments, strategy, filter}: {segments: IPieChartSegment[], strategy: QueryStrategy, filter: GeneProductTypeFilter}) => {
    
    const {loading, error, geneCount, triggerGeneDownload, genesMeta} = withGenes(segments, strategy, filter);
    return (
        <div style={{padding:16}}>
            {loading ? <CircularProgress/> : error ? <span>{JSON.stringify(error)}</span> : (
                <>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={triggerGeneDownload}
                        endIcon={<CloudDownloadIcon/>}
                    >Download {geneCount} genes</Button>

                    <h4>Source Metadata:</h4>
                    <pre>{genesMeta}</pre>
                </>
            )}
        </div>
    );
}