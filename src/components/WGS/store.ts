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
            const result = await fetch(`http://localhost:3000/api/v1/wgs_segments`);
            const jsonified = await result.json();

            const newData = Object
                .entries(jsonified)
                .reduce((accum, [aspect, info]) => (
                    {
                        ...accum, 
                        [aspect]: Object
                            .entries(info)
                            .map(([status,value]) => (
                                {
                                    name: status, 
                                    value
                                }
                            ))
                    }
                ), {} as IPieChartData);

            setData(newData);
        })();
    }, []);

    return data;
}

type GeneList = Array<{GeneID: string, GeneProductType: string}>;

const geneQueryCache: {[key: string]: {genes: number, annotations: number}} = {};
// const globalLoading = {};
export const withGenes = (filters: IPieChartFilter[] = [], mode: FilterMode = 'union'): {loading: boolean, geneCount?: number, annotationCount?: number, triggerGeneDownload?: () => void, triggerAnnotationDownload?: () => void} => {
        const _queryParams = new URLSearchParams({
        operator: mode
    });

    filters.map(f => `${f.aspect},${f.category}`).forEach(filter => _queryParams.append('filter[]', filter));

    const queryParams = _queryParams.toString();

    const { data, fetching } = useFetch<{annotatedGenes: any, unannotatedGenes: any, annotations: any[]}>({url:`http://localhost:3000/api/v1/genes?${queryParams}`});

    let geneCount = 0;
    let annotationCount = 0;

    if(fetching){
        return {loading: true};
    } else {
        const genes: GeneList = Object.values(data.annotatedGenes).concat(Object.values(data.unannotatedGenes)) as any;
        geneQueryCache[queryParams] = {genes: genes.length, annotations: data.annotations.length};
        geneCount = genes.length;
        annotationCount = data.annotations.length;
    }

    const triggerGeneDownload = () => {
        _queryParams.set("asGeneCSV", "true");
        window.location.href = `http://localhost:3000/api/v1/genes?${_queryParams}`
    }

    const triggerAnnotationDownload = () => {
        _queryParams.set("asGAF", "true");
        window.location.href = `http://localhost:3000/api/v1/genes?${_queryParams}`
    }

    return {loading: false, geneCount, annotationCount, triggerGeneDownload, triggerAnnotationDownload}; 
}