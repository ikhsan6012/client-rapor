import React, { Fragment, useState, useEffect } from 'react'

const RaporAr = () => {
  const [data, setData] = useState({})
  const [lastUpdate, setLastUpdate] = useState(null)
  
	const getData = async q => {
		const res = await fetch(process.env.REACT_APP_API_URL + 'data/rapor', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(q)
		})
		const data = await res.json()
    setData(data.data)
    setLastUpdate(data.lastUpdate)
	}

	useEffect(() => {
    getData({})
	}, [])
		
	const formatNumber = num => {
		if(typeof num % 1 !== 0){
			num = parseFloat(num.toFixed(2))
		}
		return num.toLocaleString('ID', { useGrouping: true })
	}

	const renderData = data => {
    let listAr = Object.keys(data)
		listAr.sort((a, b) => {
			if(data[a].RANKING < data[b].RANKING) return -1
			if(data[a].RANKING > data[b].RANKING) return 1
			return 0
		})
		
		const dataRender = listAr.length 
			? listAr.map((ar, i) => {
				return(<tr key={ i }>
					<td className="align-middle text-center">{ data[ar].RANKING }</td>
					<td className="align-middle">{ data[ar].NAMA_AR }</td>
					<td className="align-middle" data-id={ data[ar].KPP.KD_KANTOR } onClick={ handleKppClick }>{ data[ar].KPP.NM_KANTOR }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].TOTAL_SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].SP2DK.JUMLAH) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].SP2DK.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].SP2DK.SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].LHP2DK.JUMLAH) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].LHP2DK.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].LHP2DK.SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].LHP2DK_BERKUALITAS.JUMLAH) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].LHP2DK_BERKUALITAS.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].LHP2DK_BERKUALITAS.SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].POTENSI_AKHIR.NILAI) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].POTENSI_AKHIR.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].POTENSI_AKHIR.SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].REALISASI_POTENSI.WP.JUMLAH) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].REALISASI_POTENSI.WP.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].REALISASI_POTENSI.WP.SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].REALISASI_POTENSI.REALISASI.NILAI) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].REALISASI_POTENSI.REALISASI.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].REALISASI_POTENSI.REALISASI.SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].STP.JUMLAH.JUMLAH) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].STP.JUMLAH.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].STP.JUMLAH.SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].STP.NILAI.NILAI) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].STP.NILAI.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].STP.NILAI.SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].NON_GALPOT.JUMLAH) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].NON_GALPOT.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].NON_GALPOT.SKOR_AKHIR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].VISIT.JUMLAH) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].VISIT.SKOR) }</td>
					<td className="align-middle text-right">{ formatNumber(data[ar].VISIT.SKOR_AKHIR) }</td>
				</tr>)
			})
		: <tr><td colSpan="34">Sedang Mengambil Data...</td></tr>
		return dataRender
	}

	const handleKppClick = e => {
		getData({ KD_KPP: e.target.dataset.id })
	}

	const Thead = props =>
		<thead className="bg-primary text-white" style={ props.style }>
			<tr>
				<th className="align-middle text-center th1" rowSpan="3">RANK</th>
				<th className="align-middle text-center th1" rowSpan="3" style={{ minWidth: 150 }}>NAMA AR</th>
				<th className="align-middle text-center th1" rowSpan="3" style={{ minWidth: 125 }}>KPP</th>
				<th className="align-middle text-center th1" rowSpan="3">TOTAL SKOR AKHIR</th>
				<th className="align-middle text-center th1" rowSpan="2" colSpan="3">SP2DK (10%)</th>
				<th className="align-middle text-center th1" rowSpan="2" colSpan="3">LHP2DK (5%)</th>
				<th className="align-middle text-center th1" rowSpan="2" colSpan="3">LHP2DK BERKUALITAS (15%)</th>
				<th className="align-middle text-center th1" rowSpan="2" colSpan="3">POTENSI AKHIR (15%)</th>
				<th className="align-middle text-center th1" colSpan="6">REALIASI POTENSI (25%)</th>
				<th className="align-middle text-center th1" colSpan="6">STP (20%)</th>
				<th className="align-middle text-center th1" rowSpan="2" colSpan="3">NON GALPOT (5%)</th>
				<th className="align-middle text-center th1" rowSpan="2" colSpan="3">VISIT (5%)</th>
			</tr>
			<tr>
				<th className="align-middle text-center th2" colSpan="3">WP (30%)</th>
				<th className="align-middle text-center th2" colSpan="3">NILAI (70%)</th>
				<th className="align-middle text-center th2" colSpan="3">JUMLAH (30%)</th>
				<th className="align-middle text-center th2" colSpan="3">NILAI (70%)</th>
			</tr>
			<tr>
				<th className="align-middle text-center th3">JUMLAH</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
				<th className="align-middle text-center th3">JUMLAH</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
				<th className="align-middle text-center th3">JUMLAH</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
				<th className="align-middle text-center th3">NILAI</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
				<th className="align-middle text-center th3">JUMLAH</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
				<th className="align-middle text-center th3">NILAI</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
				<th className="align-middle text-center th3">JUMLAH</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
				<th className="align-middle text-center th3">NILAI</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
				<th className="align-middle text-center th3">JUMLAH</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
				<th className="align-middle text-center th3">JUMLAH</th>
				<th className="align-middle text-center th3">SKOR</th>
				<th className="align-middle text-center th3">SKOR AKHIR</th>
			</tr>
		</thead>

	return(
		<Fragment>
      <h2>Rapor AR</h2>
      { lastUpdate
        ? <p className="float-right">Update Tanggal: { new Date(lastUpdate).toLocaleDateString('ID') }</p>
        : null
      }
      <div className="table-responsive" style={{ maxHeight: 700 }}>
        <table className="table table-striped" style={{ fontSize: 10 }}>
          <Thead />
          <tbody>
            { renderData(data) }
          </tbody>
        </table>
      </div>
		</Fragment>
	)
}
export default RaporAr