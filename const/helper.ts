export const semanaDeAno=(): number => {
    const date=new Date()
    const startOfYear: Date=new Date(date.getFullYear(), 0, 1)
    //console.log(date, startOfYear)
    startOfYear.setDate(startOfYear.getDate()+(startOfYear.getDay()%7))
    const res: any=Number(date)-Number(startOfYear)
    return Math.round((res)/(7*24*3600*1000))+1

}
