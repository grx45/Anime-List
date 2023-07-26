
export const convertToDate = (timeStamp: number) => {
    const date = new Date(timeStamp * 1000);
    const newDate = date.toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    return newDate
}

export const changeDateFormat = (day: number|null, month: number|null, year: number) => {

    if(!month || !day){
        return year.toString()
    }
    const date = new Date(year, month - 1, day);
    const newDate = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    return newDate
}

export const ratingFormat = (score: number | null) => {
    if (!score) {
        return null
    }
    const total = (Math.floor(score / 20 * 10) / 10).toFixed(1)
    return parseFloat(total)

}

export const changeBack = (input:string | undefined )=>{
    
    if (input == undefined){
        return
    }
    
    let replacedString = input.replaceAll("%", " ")
    return replacedString
}


export const checkDemographic = (val: { name: string }) => {
    const desiredTags: string[] = ["Shounen", "Seinen", "Shojo", "Josei"]
    return desiredTags.includes(val.name)
}