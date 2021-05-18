const data = require('./public/data/data')

const okt = data.hikes[0]

const from = okt.checkpoints.filter(cp => 'Nagymaros' === cp.name)[0].nodeIdx
const to = okt.checkpoints.filter(cp => 'Nógrád' === cp.name)[0].nodeIdx

