const PdfPrinter = require('pdfmake')
const box = require('./boxChart')
const groupBox = require('./groupBoxChart')
const fs = require('fs')

const fonts = {
    Roboto: {
        normal: "../fonts/Roboto-Regular.ttf",
        bold: '../fonts/Roboto-Medium.ttf',
        italics: '../fonts/Roboto-Italic.ttf',
        bolditalics: '../fonts/Roboto-MediumItalic.ttf'
    }
};

const dt = new Date()
const date = dt.toLocaleString()
const printer = new PdfPrinter(fonts)


function makeRunReport(data, resp) {

    const documentDefinition = {
        pageSize: 'A4',
        pageMargins: [60, 60, 60, 60],
        pageOrientation: 'portrait',
        header: function (currentPage, pageCount) {
            return {
                margin: [50, 10, 50, 0],
                table: {
                    widths: ["*", '*', "*", '*'],
                    body: [
                        [{
                            text: 'Отчёт по HLA типированию',
                            fontSize: 10,
                            alignment: 'center'
                        },
                            {
                                text: 'Тест-система: VariFind™ HLA solution IL-v2',
                                fontSize: 10,
                                alignment: 'center'
                            }, {
                            text: 'Отчет создан: \n' + date,
                            fontSize: 10,
                            alignment: 'center'
                        },
                            {
                                text: currentPage.toString() + '/' + pageCount,
                                fontSize: 14,
                                alignment: 'center'
                            }],
                    ]
                },
            };
        },
        footer: {
            margin: [50, 0, 50, 0],
            table: {
                widths: ["*"],
                body: [
                    [{
                        text: 'ТУ 21.20.23-007-39429653-2020',
                        fontSize: 10,
                        alignment: 'center'
                    }
                    ],
                ]
            }
        },
        content: [
            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*'],
                    body: [
                        [{
                            text: data.text, border: [false, false, false, false],
                            fontSize: 10
                        },
                            {
                                image: '../img/logo.png',
                                width: 50,
                                height: 50,
                                border: [false, false, false, false],
                                alignment: 'right'
                            }]
                    ]
                }
            },
            {text: 'Отчёт по запуску HLA', style: 'header', alignment: 'center', fontSize: 20},
            {text: 'ОБЩАЯ ИНФОРМАЦИЯ ОБ АНАЛИЗЕ', style: 'subheader', alignment: 'left', fontSize: 14},
            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*'],
                    alignment: 'center',
                    body: [
                        [{
                            text: 'Тест-система',
                            border: [false, false, true, true],
                            fillColor: '#CCCCCC'
                        }, {text: 'VariFind HLA solution IL-v2',
                            border: [false, false, false, true],
                            fillColor: '#CCCCCC'}],
                        [{text: 'Лот', border: [false, false, true, true]}, {
                            text: data.lotType,
                            border: [false, false, false, true]
                        }],
                        [{
                            text: 'Метод анализа',
                            border: [false, false, true, true]
                        }, {text: 'Высокопроизводительное секвенирование', border: [false, false, false, true]}],
                        [{
                            text: 'Анализируемые локусы',
                            border: [false, false, true, true]
                        }, {text: 'HLA-A, HLA-B, HLA-C, HLA-DQB1, HLA-DRB1', border: [false, false, false, true]}],
                        [{text: 'Разрешение HLA типирования', border: [false, false, true, false]}, {
                            text: '4-digit',
                            border: [false, false, false, false]
                        }]
                    ]
                }
            },
            {
                style: 'tableExample',
                margin: [0, 20, 0, 8],
                table: {
                    widths: ['*', '*'],
                    body: [
                        [{text: 'Номер запуска', alignment: 'center', fillColor: '#CCCCCC', bold: true},
                            {text: data.runNumber, alignment: 'center', fillColor: '#CCCCCC', bold: true}]
                    ]
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*'],
                    alignment: 'center',
                    body: [
                        [{text: 'Дата секвенирования', border: [false, false, true, true]}, {
                            text: date,
                            border: [false, false, false, true]
                        }],
                        [{text: 'Всего образцов', border: [false, false, true, true]}, {
                            text: data.sampleCount,
                            border: [false, false, false, true]
                        }],
                        [{text: 'Лаборант', border: [false, false, true, true]}, {
                            text: data.laborant,
                            border: [false, false, false, true]
                        }],
                        [{text: 'Супервизор', border: [false, false, true, true]}, {
                            text: data.supervizor,
                            border: [false, false, false, true]
                        }],
                        [{text: 'Дата анализа', border: [false, false, true, true]}, {
                            text: date,
                            border: [false, false, false, true]
                        }],
                        [{text: 'Версия IMGT-HLA', border: [false, false, true, true]}, {
                            text: data. imgtHlaVersion,
                            border: [false, false, false, true]
                        }],
                        [{text: 'Алгоритм', border: [false, false, true, true]}, {
                            text: data.algoritm,
                            border: [false, false, false, true]
                        }],
                        [{text: 'Программное обеспечение', border: [false, false, true, true]}, {
                            text: data.software,
                            border: [false, false, false, true]
                        }],
                    ]
                }
            },
            {text: 'КОНТРОЛЬ КАЧЕСТВА', style: 'subheader', alignment: 'left', pageBreak: "before"},
            {
                table: {
                    widths: ['*', '*'],
                    alignment: 'center',
                    body: [
                        [{text: 'Ср. количество прочтений',  border: [false, false, false, false]}, {text: 'Размер вставки',  border: [false, false, false, false]}],
                        [{svg: box.buildBoxChart(),  border: [false, false, false, false]}, {svg: box.buildBoxChart(),  border: [false, false, false, false]}],
                    ]
                }
                },
            {text: '\n'},
            {
                table: {
                    widths: ['*', '*'],
                    alignment: 'center',
                    body: [
                        [{text: 'Всего прочтений',  border: [false, false, false, false]}, { text: '', border: [false, false, false, false]}],
                        [{svg: box.buildBoxChart(),  border: [false, false, false, false]}, { text: '', border: [false, false, false, false]}],
                    ]
                }
            },
            {text: '\n'},
            {text: 'Прочтения по локусам', alignment: 'center', pageBreak: "before"},
            {svg: groupBox.buildGroupBoxChart()},
            {text: '\n'},
            {text: 'СТАТУСЫ ОБРАЗЦОВ В ЗАПУСКЕ', style: 'subheader', alignment: 'left'},
            {
                table: {
                    widths: ['*', '*'],
                    alignment: 'center',
                    headerRows: 1,
                    body: [
                        [{text: ' Статус', style: 'tableHeader'}, {text: 'Количество образцов', alignment: 'center',style: 'tableHeader'}],
                        [{text: ' Всего импортировано'}, {text: data.allSamples, alignment: 'center'}],
                        [{text: ' Утверждено'}, {text: data.okSamples, alignment: 'center'}],
                        [{text: ' Одобрено'}, {text: data.approvedSamples, alignment: 'center'}],
                        [{text: ' Лаб. ошибка'}, {text: data.labError, alignment: 'center'}],
                        [{text: ' Ошибка типирования'}, {text: data.typeError, alignment: 'center'}]
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                    }
                }
            },
            {text: '\n'},
            {
                text: 'ОШИБКИ АНАЛИЗА',
                style: 'subheader',
                alignment: 'left',
                fontSize: 14
            },
            {text: '\n'},
            {
                table: {
                    widths: ['*', '*'],
                    alignment: 'center',
                    body: [
                        [{text: 'Образец', style: 'tableHeader'},{text: 'Показатель', alignment: 'center', style: 'tableHeader'}],
                        [{text: data.sample}, {text: 'Контаминация', alignment: 'center'}],
                        [{text: data.sample}, {text: 'Прочтения по локусу HLA-C', alignment: 'center'}],
                        [{text: data.sample}, {text: 'Прочтения по локусу HLA-B', alignment: 'center'}],
                        [{text: data.sample}, {text:  'Размер вставки', alignment: 'center'}],
                        [{text: data.sample}, {text: 'Число прочтений', alignment: 'center'}]
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                    }
                }
            },
            {text: '\n'},
            {
                text: 'НОВЫЕ АЛЛЕЛИ',
                style: 'subheader',
                alignment: 'left',
                fontSize: 14
            },
            {text: '\n'},
            {
                table: {
                    widths: [40, 40, '*', 50, 50, '*', '*'],
                    alignment: 'center',
                    headerRows: 1,
                    body: [
                        [
                            {text: 'Образец', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Локус', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Ближайшая аллель', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Разрешение', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Экзон', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Нуклеотидная замена', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Аминокислотная замена', alignment: 'center', bold: true, fontSize: 11}
                        ],
                        [
                            {text: data.sample, alignment: 'center'},
                            {text: data.locus, alignment: 'center'},
                            {text: data.allel, alignment: 'center'},
                            {text: data.razr, alignment: 'center'},
                            {text: data.ekzon, alignment: 'center'},
                            {text: data.nukleoReplacement, alignment: 'center'},
                            {text: data.aminoReplacement, alignment: 'center'}
                        ]
                    ]
                },
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                    }
                }
            },

        ],

        styles: {
            header: {
                fontSize: 18,
                margin: [0, 0, 0, 10],
                border: 0.5
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15],
                border: [false, false, false, true]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
        defaultStyle: {}
    }
    resp.set('content-type', 'application/pdf')
    const pdfDoc = printer.createPdfKitDocument(documentDefinition)
    pdfDoc.pipe(fs.createWriteStream('../docs/runReport.pdf'));
    pdfDoc.pipe(resp)
    pdfDoc.end();
}

module.exports = {
    makeRunReport: makeRunReport
}