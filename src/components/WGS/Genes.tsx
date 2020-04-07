import React from "react";
import {IPieChartSegment, withGenes, QueryStrategy, GeneProductTypeFilter} from "./store";
import { CircularProgress, Button, Typography } from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export const Genes = ({segments, strategy, filter}: {segments: IPieChartSegment[], strategy: QueryStrategy, filter: GeneProductTypeFilter}) => {
    
    const {loading, error, geneCount, triggerGeneDownload, genesMeta} = withGenes(segments, strategy, filter);
    return (
        <div style={{padding:16, display:"flex", flexDirection:"column"}}>
            {loading ? <CircularProgress/> : error ? <span>{JSON.stringify(error)}</span> : (
                <>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        size="large"
                        onClick={triggerGeneDownload}
                        endIcon={<CloudDownloadIcon/>}
                    ><Typography>Download {geneCount} genes</Typography></Button>

                    <h4>Source Metadata:</h4>
                    <pre style={{overflow:"auto", maxHeight:300}}>{genesMeta}</pre>
                </>
            )}
        </div>
    );
}