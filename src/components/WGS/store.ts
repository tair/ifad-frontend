import React from "react";

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
            setData(jsonified);
        })();
    }, []);

    return data;
}

type GeneList = Array<{GeneID: string, GeneProductType: string}>;
export const withGenes = (filters: IPieChartFilter[] = [], mode: FilterMode = 'union'): [boolean, GeneList] => {
    const [genes, setGenes] = React.useState<GeneList>([]);
    const [loading, setLoading] = React.useState(true);

    const queryParams = new URLSearchParams({
        operator: mode
    });

    filters.map(f => `${f.aspect},${f.category}`).forEach(filter => queryParams.append('filter[]', filter));

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const result = await fetch(`http://localhost:3000/api/v1/genes?${queryParams}`);
            const jsonified = await result.json();
            setGenes(jsonified.annotatedGenes);
            setLoading(false);
        })();
    }, [filters, mode]);

    return [loading, genes]; 
}