import React, { useState, useEffect, useRef} from 'react';
import Table from 'react-bootstrap/Table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useReactToPrint } from 'react-to-print';
import Button from 'react-bootstrap/Button';

const AccidentForDepartment = () => {
    const [yil, setYil] = useState('');
    const [bolum, setBolum] = useState('');
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (!bolum || !yil) return;

        // Verileri çekmek için API'ye istek gönder
        fetch(`http://localhost/fordepartment.php?bolum=${bolum}&yil=${yil}`)
            .then(response => response.json())
            .then(data => {
                setData(data);

                // Tarihe göre verileri gruplayıp iş kazası ve ramak kala sayılarını hesapla
                const groupedData = data.reduce((acc, curr) => {
                    const month = new Date(curr.tarih).getMonth(); // Ay indeksini al
                    const key = month.toString(); // Ay indeksini anahtar olarak kullan

                    // Anahtar varsa değerleri artır, yoksa yeni bir anahtar oluştur
                    if (acc[key]) {
                        acc[key].is_kazasi += curr.isg_turu === 'İş Kazası' ? 1 : 0;
                        acc[key].ramak_kala += curr.isg_turu === 'Ramak Kala' ? 1 : 0;
                    } else {
                        acc[key] = {
                            is_kazasi: curr.isg_turu === 'İş Kazası' ? 1 : 0,
                            ramak_kala: curr.isg_turu === 'Ramak Kala' ? 1 : 0,
                        };
                    }

                    return acc;
                }, {});

                // Grafik için uygun formata dönüştür
                const chartData = Array.from({ length: 12 }, (_, i) => {
                    const monthIndex = i.toString(); // Ay indeksi
                    return {
                        month: getMonthName(i), // Ay ismi
                        İK: groupedData[monthIndex] ? groupedData[monthIndex].is_kazasi : 0,
                        RK: groupedData[monthIndex] ? groupedData[monthIndex].ramak_kala : 0,
                    };
                });

                setChartData(chartData);
            })
            .catch(error => console.error('Error fetching data:', error));
  
    }, [bolum, yil]);

    // Ay indeksini alıp, ismini döndüren yardımcı fonksiyon
    const getMonthName = (index) => {
        const months = [
            'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
            'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
        ];
        return months[index];
    };

    function handleBolumSelect(event) {
        setBolum(event.target.value);
    }

    function handleYilSelect(event) {
        setYil(event.target.value);
    }

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    return (
        <div>
            <div className='selectdiv disdiv'>
                <div className='mx-5 icdiv'>
                    <h5>Tarih Seçiniz:</h5>
                    <select className='form-select icdiv' onChange={handleYilSelect}> 
                        <option value="">Yıl Seçiniz</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div className='mx-5 icdiv'>
                    <h5>Bölüm Seçiniz:</h5>
                    <select className='form-select' onChange={handleBolumSelect}> 
                        <option value="">Bölüm Seçiniz</option>
                        <option value="Kalıphane">Kalıphane</option>
                        <option value="Dökümhane">Dökümhane</option>
                        <option value="Plastik Enjeksiyon">Plastik Enjeksiyon</option>
                        <option value="Talaşlı İmalat">Talaşlı İmalat</option>
                        <option value="Montaj">Montaj</option>
                        <option value="Makine İmalat">Makine İmalat</option>
                        <option value="Üretim Planlama">Üretim Planlama</option>
                    </select>
                </div> 
            </div>

            <div className='table mt-5 '>
                <Table bordered hover striped>
                    <thead>
                        <tr>
                            <th className='tableElement'>ID</th>
                            <th className='tableElement'>Tarih</th>
                            <th className='tableElement'>Bölüm</th>
                            <th className='tableElement'>ISG Türü</th>
                            <th className='tableElement'>Kaynak</th>
                            <th className='tableElement'>Personel</th>
                            <th className='tableElement'>Açıklama</th>
                        </tr>
            

                    </thead>
                </Table>
            </div>

            <div className='table'>
                <Table bordered hover striped>
              

                    <tbody>
                    {data.map(item => (  
                            <tr key={item.id}>
                                <td className='tableElement'>{item.id_is_kazasi}</td>
                                <td className='tableElement'>{item.tarih}</td>
                                <td className='tableElement'>{item.bolum}</td>
                                <td className='tableElement'>{item.isg_turu}</td>
                                <td className='tableElement'>{item.kaynak}</td>
                                <td className='tableElement'>{item.personel}</td>
                                <td className='tableElement'>{item.aciklama}</td>
                            </tr>          
                        ))}
                    </tbody>        
                </Table>
            </div>

            <div  ref={componentRef} className='printables'>
                <div className='ortalanmis_div mt-5'>
                    <h5>{bolum} Bölümü {yil} İş Kazaları ve Ramak Kalalar</h5>
                </div>
                <div className='chart mt-5 ortalanmis_div'>
                    <ResponsiveContainer width="60%" height={400}>
                        <LineChart
                            data={chartData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="İK" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={4} />
                            <Line type="monotone" dataKey="RK" stroke="#82ca9d" strokeWidth={4}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>    
            <div className='ortalanmis_div'>
                <Button variant="outline-secondary" onClick={handlePrint}>Grafiği Yazdır</Button>
            </div>
        </div>
    );
}

export default AccidentForDepartment;
