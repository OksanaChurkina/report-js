const sampleReport = require('./makeSampleReport')
const runReport = require('./makeRunReport')
const boxPlotData = require('./boxChart')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
}));

//app.get("/test", function(request, response){

    let boxPlotdata = [10, 15, 30, 45, 5, 20, 32, 8, 12]
    let boxPlotdata1 = [15, 15, 35, 45, 10, 27, 37, 9, 13]
    let boxPlotdata2 = [16, 15, 30, 45, 9, 24, 32, 8, 15]
    let boxPlotdata3 = [11, 15, 31, 45, 5, 20, 32, 8, 17]
    let boxPlotdata4 = [13, 15, 33, 46, 8, 21, 33, 9, 18]

 const data = {
        lotType: 'lotType',
        sampleCount: 'sampleCount',
        text : 'ФГБУН КНИИГиПК ФМБА России, ' +
            'НИЛ прикладной иммуногенетики ' +
            '610027, Кировская область, Киров, Красноармейская, 72' +
            '+7 (8332) 54-17-70, www.niigpk.ru',
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
        err_hla_b: '425',
        err_hla_c: '100',
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
    let boxData = [{
        key: "A",
        value: boxPlotData.calculateBoxPlotData(boxPlotdata)
    },
        {
            key: "B",
            value: boxPlotData.calculateBoxPlotData(boxPlotdata1)
        },
        {
            key: "C",
            value: boxPlotData.calculateBoxPlotData(boxPlotdata2)
        },
        {
            key: "DBQ1",
            value: boxPlotData.calculateBoxPlotData(boxPlotdata3)
        },
        {
            key: "DRB1",
            value: boxPlotData.calculateBoxPlotData(boxPlotdata4)
        }
    ]

    runReport.makeRunReport(data, boxData)
   // sampleReport.makeSampleReport(data)
// })

// app.get("/sampleReport", function(request, response){
//
//     let lotType = request.body.lotType
//     let sampleCount = request.body.sampleCount
//     let text = request.body.text
//     let sample = request.body.sample
//     let numb = request.body.number
//
//     let hla_a = request.body.hla_a
//     let hla_b = request.body.hla_b
//     let hla_c = request.body.hla_c
//     let dqb1 = request.body.dqb1
//     let drb1 = request.body.drb1
//
//     let laborant = request.body.laborant
//     let supervizor = request.body.supervizor
//     let imgtHlaVersion = request.body.imgtHlaVersion
//     let algoritm = request.body.algoritm
//     let software = request.body.software
//
//     let err_hla_b = request.body.err_hla_b
//     let err_hla_c = request.body.err_hla_c
//     let kont = request.body.kont
//     let insertion_size = request.body.insertion_size
//     let readCount = request.body.readCount
//
//     let locus = request.body.locus
//     let allel = request.body.allel
//     let razr = request.body.razr
//     let ekzon = request.body.ekzon
//     let nukleoReplacement = request.body.nukleoReplacement
//     let aminoReplacement = request.body.aminoReplacement
//     let runNumber = request.body.runNumber
//     let allSamples = request.body.allSamples
//     let okSamples = request.body.okSamples
//     let approvedSamples = request.body.approvedSamples
//     let labError = request.body.labError
//     let typeError = request.body.typeError
//
//     const data = {
//         lotType: lotType,
//         sampleCount: sampleCount,
//         text : text,
//         sample: sample,
//         sampleNumber: numb,
//         laborant: laborant,
//         supervizor: supervizor,
//         imgtHlaVersion: imgtHlaVersion,
//         algoritm: algoritm,
//         software: software,
//         hla_a: hla_a,
//         hla_b: hla_b,
//         hla_c: hla_c,
//         dqb1: dqb1,
//         drb1: drb1,
//         err_hla_b: err_hla_b,
//         err_hla_c: err_hla_c,
//         kont: kont,
//         insertion_size: insertion_size,
//         readCount: readCount,
//         locus: locus ,
//         allel: allel,
//         razr: razr,
//         ekzon: ekzon,
//         nukleoReplacement: nukleoReplacement,
//         aminoReplacement: aminoReplacement,
//         runNumber: runNumber,
//         allSamples: allSamples,
//         okSamples: okSamples,
//         approvedSamples: approvedSamples,
//         labError: labError,
//         typeError: typeError
//     }
//
//    sampleReport.makeSampleReport(data)
// })
//
// app.get("/runReport", function(request, response){
//
//     let lotType = request.body.lotType
//     let sampleCount = request.body.sampleCount
//     let text = request.body.text
//     let sample = request.body.sample
//     let numb = request.body.number
//
//     let hla_a = request.body.hla_a
//     let hla_b = request.body.hla_b
//     let hla_c = request.body.hla_c
//     let dqb1 = request.body.dqb1
//     let drb1 = request.body.drb1
//
//     let laborant = request.body.laborant
//     let supervizor = request.body.supervizor
//     let imgtHlaVersion = request.body.imgtHlaVersion
//     let algoritm = request.body.algoritm
//     let software = request.body.software
//
//     let err_hla_b = request.body.err_hla_b
//     let err_hla_c = request.body.err_hla_c
//     let kont = request.body.kont
//     let insertion_size = request.body.insertion_size
//     let readCount = request.body.readCount
//
//     let locus = request.body.locus
//     let allel = request.body.allel
//     let razr = request.body.razr
//     let ekzon = request.body.ekzon
//     let nukleoReplacement = request.body.nukleoReplacement
//     let aminoReplacement = request.body.aminoReplacement
//     let runNumber = request.body.runNumber
//     let allSamples = request.body.allSamples
//     let okSamples = request.body.okSamples
//     let approvedSamples = request.body.approvedSamples
//     let labError = request.body.labError
//     let typeError = request.body.typeError
//
//     let boxKey = request.body.boxKey
//     let boxValue = request.body.boxValue
//
//     const data = {
//         lotType: lotType,
//         sampleCount: sampleCount,
//         text : text,
//         sample: sample,
//         sampleNumber: numb,
//         laborant: laborant,
//         supervizor: supervizor,
//         imgtHlaVersion: imgtHlaVersion,
//         algoritm: algoritm,
//         software: software,
//         hla_a: hla_a,
//         hla_b: hla_b,
//         hla_c: hla_c,
//         dqb1: dqb1,
//         drb1: drb1,
//         err_hla_b: err_hla_b,
//         err_hla_c: err_hla_c,
//         kont: kont,
//         insertion_size: insertion_size,
//         readCount: readCount,
//         locus: locus ,
//         allel: allel,
//         razr: razr,
//         ekzon: ekzon,
//         nukleoReplacement: nukleoReplacement,
//         aminoReplacement: aminoReplacement,
//         runNumber: runNumber,
//         allSamples: allSamples,
//         okSamples: okSamples,
//         approvedSamples: approvedSamples,
//         labError: labError,
//         typeError: typeError
//     }
//
//     let boxData = {
//         boxKey: boxKey,
//         boxValue: boxValue
//     }
//
//     runReport.makeRunReport(data, boxData)
// })
//
// app.listen(8080)
