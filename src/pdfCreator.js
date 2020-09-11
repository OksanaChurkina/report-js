const sampleReport = require('./makeSampleReport')
const runReport = require('./makeRunReport')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get("/test", function(request, response){

 const data = {
        lotType: 'lotType',
        sampleCount: 'sampleCount',
        text : 'ФГБУН КНИИГиПК ФМБА России,\\n\' +\n' +
            '\'НИЛ прикладной иммуногенетики\\n\' +\n' +
            '\'610027, Кировская область, Киров, Красноармейская, 72\\n\' +\n' +
            '\'+7 (8332) 54-17-70, www.niigpk.ru',
        sample: '11111',
        sampleNumber: 'S36',
        laborant: 'Иванова Мария',
        supervizor: 'Васильева Виктория',
        imgtHlaVersion: '3.39.0',
        algoritm: 'mercury-pipeline-3.1.1',
        software: 'PARallele™ HLA software 1.4.3',
        hla_a: '01:01:01 + Новая аллель',
        hla_b: 'Не определен',
        hla_c: 'Не определен',
        dqb1: '02:02:01 + ND',
        drb1: '07:01:01 + 13:01:01',
        err_hlab: '425',
        err_hlac: '100',
        kont: 'Идентифицирована',
        ins_size: '30',
        readCount: '200',
        locus: 'A' ,
        allel: 'HLA-A*02:01:01:01',
        razr: '3 fields',
        ekzon: '2',
        nukleoReplacement: '694G>C',
        aminoReplacement: 'K90N',
        runNumber: 'DCBUF',
        allSamples: '191',
        okSamples: '166',
        approvedSamples: '23',
        labError: '2',
        typeError: '0'
    }


  sampleReport.makeSampleReport(data, response)
    //runReport.makeRunReport(data, response)

})

app.get("/sampleReport", function(request, response){

    let lotType = request.query.lotType
    let sampleCount = request.query.sampleCount
    let numb = request.query.number
    let sample = request.query.sample
    let hla_a = request.query.hla_a
    let hla_b = request.query.hla_b
    let hla_c = request.query.hla_c
    let dqb1 = request.query.dqb1
    let drb1 = request.query.drb1

    let year = request.body.year
    let value = request.body.value

    let count = request.body.count
    let min = request.body.min
    let max = request.body.max
    let label = request.body.label
    let stddev = request.body.stddev
    let mean = request.body.mean

    const data = {
        lotType: lotType,
        sampleCount: sampleCount
    }

    const tableData = {
        a: {
            number: numb,
            sample: sample,
            hla_a: hla_a,
            hla_b: hla_b,
            hla_c: hla_c,
            dqb1: dqb1,
            drb1: drb1
        }
    };

    const tempData = [{ year: year, value: value }]
    const boxData = [{count: count, min: min, max: max, label: label ,stddev: stddev, mean: mean }]
    sampleReport.makeSampleReport(data, tableData, boxData, tempData, response)
});

app.listen(8080)
