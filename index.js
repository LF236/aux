const fs = require('fs');
const moment = require('moment');
const _ = require('lodash');

const data = fs.readFileSync('code.json', 'utf8');

const parseData = JSON.parse(data);


const filterByTimeRange = (data) => {
    let aux = data.map(item => {
        return {
            ...item,
            hora: moment(item.horaReg, 'HH:mm:ss').hours(),
            min: moment(item.horaReg, 'HH:mm:ss').minutes()

        }
    })

    const groupByHour = _.groupBy(aux, 'hora');
    Object.keys(groupByHour).map(key => {
        groupByHour[key] = groupByHour[key][0];
    });

    // Plain DATA
    let res = [];
    Object.keys(groupByHour).map(key => {
        res.push(groupByHour[key]);
    });

    console.log(res);
    
};
  
  

// CASE 1 
parseData.map(item => {
    let {hora_entrada, hora_salida, matricula, attendances} = item;
    hora_entrada = moment(hora_entrada).utc().format('HH:mm');
    hora_salida = moment(hora_salida).utc().format('HH:mm');
    let diff = moment.utc(moment(hora_salida,"HH:mm").diff(moment(hora_entrada,"HH:mm"))).hours();


    console.log({
        hora_entrada,
        hora_salida,
        diff,
        matricula
    });

    const grupByDate = _.groupBy(attendances, 'dateReg');
    // console.log(grupByDate)

    Object.keys(grupByDate).map(key => {
        const assistencedFiltered = filterByTimeRange(grupByDate[key]);
        grupByDate[key] = assistencedFiltered;
    });

    // console.log(grupByDate)

    // let specialCases = [];

    // let final = {};

    // Object.keys(grupByDate).map(key => {
    //     if(grupByDate[key].length == 1) {
    //         specialCases.push(grupByDate[key]);
    //         // console.log(grupByDate[key])
    //     } else {
    //         // This case is just when have 2 asistencias
    //         final[key] = grupByDate[key];
    //     }
    // });

    // console.log(specialCases)

    // console.log(final);

    // INCIDENCIAS







    // console.log(grupByDate)
})