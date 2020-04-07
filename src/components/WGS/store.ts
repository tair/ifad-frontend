import React from "react";
import { useFetch } from "@bjornagh/use-fetch";
import { useDebounce } from 'use-debounce';

export type Aspect = 'P' | 'F' | 'C';
export type AnnotationCategory = 'EXP' | 'OTHER' | 'UNKNOWN' | 'UNANNOTATED'
export type QueryStrategy = 'union' | 'intersection';
export type GeneProductTypeFilter = "all" | "include_protein";

export interface IPieChartSegment {
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

export const withPieChartData = (
    strategy: QueryStrategy = 'union',
    filter: GeneProductTypeFilter = "all",
): {loading?: boolean, error?: any, data?: IPieChartData} => {
    const _queryParams = new URLSearchParams({ strategy, filter });

    const [data, setData] = React.useState<IPieChartData>();
    
    const [queryParams] = useDebounce(_queryParams.toString(), 250, {leading: true});

    const { fetching: loading, error, data: responseData } = useFetch({url:`${backend_host}/api/v1/wgs_segments?${queryParams}`}, [queryParams]);

    React.useEffect(() => {
        if(!responseData){
            return;
        }

        const newData = Object
            .entries(responseData)
            .filter(([key]) => ["P","F","C"].includes(key))
            .reduce((accum, [aspect, info]: [string, any]) => (
                {
                    ...accum, 
                    [aspect]: [
                        {
                            name: "EXP",
                            value: info.known.exp,
                        },
                        {
                            name: "OTHER",
                            value: info.known.other,
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
            ), {} as IPieChartData)
        setData(newData);
    }, [responseData])

    return {
        loading, 
        error,
        data
    }
}

export interface IMetadata {
    genes: string;
    annotations: string;
}

type GeneList = Array<{GeneID: string, GeneProductType: string}>;

const backend_host = process.env.REACT_APP_API_HOSTNAME || '';

export const withGenes = (
    segments: IPieChartSegment[] = [],
    strategy: QueryStrategy = 'union',
    filter: GeneProductTypeFilter = "all",
): {loading?: boolean, error?: any, genesMeta?: string, annotationsMeta?: string, geneCount?: number, annotationCount?: number, triggerGeneDownload?: () => void, triggerAnnotationDownload?: () => void} => {
    const _queryParams = new URLSearchParams({ strategy, filter, format: "json" });

    segments.map(s => `${s.aspect.toUpperCase()},${s.category.toUpperCase()}`).forEach(segment => _queryParams.append('segments[]', segment));

    const [queryParams] = useDebounce(_queryParams.toString(), 250, {leading: true});

    const { fetching: loading, error, data } = useFetch({url:`${backend_host}/api/v1/genes?${queryParams}`}, [queryParams]);

    let geneCount = 0;
    let annotationCount = 0;

    let genesMeta = "";
    let annotationsMeta = "";

    if(loading){
        return {loading: true};
    } else if (error){
        return {error}
    } else {
        geneCount = data.gene_count;
        annotationCount = data.annotation_count;
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