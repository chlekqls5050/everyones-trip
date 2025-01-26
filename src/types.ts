export interface tripData {
    addr1:string;
    addr2:string;
    firstimage:string;
    tel:string;
    title:string;
    contentid:string;
    mapx?:string;
    mapy?:string;
    areacode?:string;
    sigungucode?:string;
    contenttypeid?:string;
    cat1:string;
    cat2:string;
    cat3:string;
    name?:string;
    homepage?:string;
}
export type infoItemProps = tripData & {
    eventstartdate?: string;
    eventenddate?:string;
    playtime?:string;
    usetimefestival?:string;
    treatmenu?:string;
};
export interface repeatItemProps {
    infotext?: string;
};
