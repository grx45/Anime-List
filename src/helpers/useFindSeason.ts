export const findSeason = (): {season:string,year:number} =>{
    const today: Date = new Date();
    const month: number = today.getMonth() + 1;
    const year: number = today.getFullYear();
    let season: string = ""

    if (month >= 3 && month <= 5){
        season = "Spring";
    }else if (month >= 6 && month <= 8){
        season = "Summer";
    }else if (month >= 9 && month <= 11){
        season = "Autumn";
    }else{
        season = "Winter";
    }

   return {season,year}
};