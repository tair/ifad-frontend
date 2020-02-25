import React from "react";
import { IPieChartFilter, withGenes, FilterMode } from "./store";
import { CircularProgress, Button } from "@material-ui/core";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

export const Genes = ({filters, operator}: {filters: IPieChartFilter[], operator: FilterMode}) => {
    
    const {loading, geneCount, triggerGeneDownload, genesMeta} = withGenes(filters, operator);
    return (
        <div style={{padding:16}}>
            {loading ? <CircularProgress/> : (
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