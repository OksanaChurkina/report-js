const PdfPrinter = require('pdfmake')

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

function makeSampleReport(data) {

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
            {text: 'Отчёт по HLA типированию образца', style: 'header', alignment: 'center', fontSize: 20},
            {text: 'ОБЩАЯ ИНФОРМАЦИЯ ОБ АНАЛИЗЕ', style: 'subheader', alignment: 'left', fontSize: 14},
            {
                style: 'tableExample',
                table: {
                    widths: ['*', '*'],
                    alignment: 'center',
                    body: [
                        [{
                            text: 'Тест-система',
                            border: [false, false, true, true]
                        }, {text: 'VariFind HLA solution IL-v2', border: [false, false, false, true]}],
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
                        [{text: 'Образец', alignment: 'center', fillColor: '#CCCCCC', bold: true}, {text: data.sample, alignment: 'center', fillColor: '#CCCCCC', bold: true}]
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
                        [{text: 'Номер запуска', border: [false, false, true, true]}, {
                            text: data.sampleCount,
                            border: [false, false, false, true]
                        }],
                        [{text: 'Номер образца в постановке', border: [false, false, true, true]}, {
                            text: data.sampleNumber,
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
            {
                text: 'РЕЗУЛЬТАТ ГЕНОТИПИРОВАНИЯ',
                style: 'subheader',
                alignment: 'left',
                pageBreak: "before",
                fontSize: 14
            },
            {text: '\n'},
            {
                table: {
                    widths: ['*', '*'],
                    alignment: 'center',
                    body: [
                        [{text: ' Локус', style: 'tableHeader'}, {text: 'Генотип', alignment: 'center',style: 'tableHeader'}],
                        [{text: ' HLA-A'}, {text: data.hla_a, alignment: 'center'}],
                        [{text: ' HLA-B'}, {text: data.hla_b, alignment: 'center'}],
                        [{text: ' HLA-B'}, {text: data.hla_c, alignment: 'center'}],
                        [{text: ' HLA-DQB1'}, {text: data.dqb1, alignment: 'center'}],
                        [{text: ' HLA-DRB1'}, {text: data.drb1, alignment: 'center'}]
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
                        [{text: ' Показатель', style: 'tableHeader'}, {text: 'Значение', alignment: 'center',style: 'tableHeader'}],
                        [{text: ' Прочтения по локусу HLA-B'}, {text: data.err_hla_b, alignment: 'center'}],
                        [{text: ' Прочтения по локусу HLA-C'}, {text: data.err_hla_c, alignment: 'center'}],
                        [{text: ' Контаминация'}, {text: data.kont, alignment: 'center'}],
                        [{text: ' Размер вставки'}, {text: data.ins_size, alignment: 'center'}],
                        [{text: ' Число прочтений'}, {text: data.readCount, alignment: 'center'}]
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
                    widths: [40, '*', 50, 50, '*', '*'],
                    alignment: 'center',
                    body: [
                        [
                            {text: 'Локус', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Ближайшая аллель', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Разрешение', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Экзон', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Нуклеотидная замена', alignment: 'center', bold: true, fontSize: 11},
                            {text: 'Аминокислотная замена', alignment: 'center', bold: true, fontSize: 11}
                        ],
                        [
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
            {text: '\n'},{text: '\n'},{text: '\n'},{text: '\n'},{text: '\n'},
            {text: '\n'},{text: '\n'},{text: '\n'},{text: '\n'},{text: '\n'},
            {text: '\n'},{text: '\n'},{text: '\n'},{text: '\n'},{text: '\n'},
            {
                table: {
                    widths: [100],
                    body: [
                        [{text: '', border: [false, true, false, false]}],
                    ]
                }
            },
            {text: '1 Формат записи: \'Аллель 1 + Аллель 2\', где ND (not determined) - аллель не установлена' +
                    ' - обозначает случай определения гомозиготы, когда не исключено выпадение второй аллели', italics: true, fontSize: 9}
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
    return printer.createPdfKitDocument(documentDefinition)

}

module.exports = {
    makeSampleReport
}