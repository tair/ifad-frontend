import React from "react";
import { useFetch } from "@bjornagh/use-fetch";

export type Aspect = 'P' | 'F' | 'C';
export type AnnotationCategory = 'EXP' | 'OTHER' | 'UNKNOWN' | 'UNANNOTATED'
export type FilterMode = 'union' | 'intersection';

export interface IPieChartFilter {
    aspect: Aspect,
    category: AnnotationCategory
}

export interface IPieChartSlice {
    name: AnnotationCategory,
    value: number
}

export type IPieChartData = {
    [key in Aspect]: IPieChartSlice[]
}

export const withPieChartData = (filters: IPieChartFilter[] = [], mode: FilterMode = 'union'): IPieChartData => { 
    const [data, setData] = React.useState<IPieChartData>({P:[],F:[],C:[]});
    
    React.useEffect(() => {
        (async () => {
            const result = await fetch(`${backend_host}/api/v1/wgs_segments`);
            const jsonified = await result.json();

            console.log(jsonified);

            const newData = Object
                .entries(jsonified)
                .filter(([key]) => ["P","F","C"].includes(key))
                .reduce((accum, [aspect, info]: [string, any]) => (
                    {
                        ...accum, 
                        [aspect]: [
                            {
                                name: "EXP",
                                value: info.knownExp,
                            },
                            {
                                name: "OTHER",
                                value: info.knownOther,
                            },
                            {
                                name: "UNKNOWN",
                                value: info.unknown,
                            },
                            {
                                name: "UNANNOTATED",
                                value: info.unannotated
                            }
                        ]
                    }
                ), {} as IPieChartData);

            setData(newData);
        })();
    }, []);

    return data;
}

export interface IMetadata {
    genes: string;
    annotations: string;
}

type GeneList = Array<{GeneID: string, GeneProductType: string}>;

const backend_host = process.env.REACT_APP_API_HOSTNAME || '';

const geneQueryCache: {[key: string]: {genes: number, annotations: number}} = {};
// const globalLoading = {};
export const withGenes = (filters: IPieChartFilter[] = [], mode: FilterMode = 'union'): {loading: boolean, genesMeta?: string, annotationsMeta?: string, geneCount?: number, annotationCount?: number, triggerGeneDownload?: () => void, triggerAnnotationDownload?: () => void} => {
        const _queryParams = new URLSearchParams({
        strategy: mode
    });

    filters.map(f => `${f.aspect.toUpperCase()},${f.category.toUpperCase()}`).forEach(filter => _queryParams.append('filter[]', filter));

    const queryParams = _queryParams.toString();

    const { data, fetching } = useFetch<{annotatedGenes: any, unannotatedGenes: any, annotations: any[]}>({url:`${backend_host}/api/v1/genes?${queryParams}`});

    let geneCount = 0;
    let annotationCount = 0;

    let genesMeta = "";
    let annotationsMeta = "";

    if(fetching){
        return {loading: true};
    } else {
        const genes: GeneList = data.genes;
        geneQueryCache[queryParams] = {genes: genes.length, annotations: data.annotations.length};
        geneCount = genes.length;
        annotationCount = data.annotations.length;
        genesMeta = data.gene_metadata;
        annotationsMeta = data.annotation_metadata;
    }

    const triggerGeneDownload = () => {
        _queryParams.set("format", "gene-csv");
        window.location.href = `${backend_host}/api/v1/genes?${_queryParams}`
    }

    const triggerAnnotationDownload = () => {
        _queryParams.set("format", "gaf");
        window.location.href = `${backend_host}/api/v1/genes?${_queryParams}`
    }

    return {loading: false, geneCount, annotationCount, genesMeta, annotationsMeta, triggerGeneDownload, triggerAnnotationDownload}; 
}