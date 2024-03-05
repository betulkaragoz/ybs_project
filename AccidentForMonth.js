import React, { useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import './style.css'
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
var kaliphane_is = 0, kaliphane_ramak = 0 , dokumhane_is = 0, dokumhane_ramak = 0 , plastik_is = 0, plastik_ramak = 0, 
talasli_is = 0, talasli_ramak = 0, montaj_is = 0, montaj_ramak = 0, makineiml_is = 0, makineiml_ramak = 0, up_is = 0,
up_ramak = 0

const AccidentForMonth = () => {

    const [ay, setAy] = useState('')
    const [yil, setYil] = useState('');

    const options = [
        {label: "Seçiniz", ay: -1},
        {label: "Ocak", ay:1},
        {label: "Şubat", ay: 2},
        {label: "Mart", ay: 3},
        {label: "Nisan", ay: 4},
        {label: "Mayıs", ay: 5},
        {label: "Haziran", ay: 6},
        {label: "Temmuz", ay: 7},
        {label: "Ağustos", ay: 8},
        {label: "Eylül", ay: 9},
        {label: "Ekim", ay: 10},
        {label: "Kasım", ay: 11},
        {label: "Aralık", ay: 12}
    ]

    const optionsyil = [
        {label: "Seçiniz", yil: -1},
        {label: "2023", yil: 2023},
        {label: "2024", yil: 2024}
    ]

    function handleAySelect(event){
        setAy(event.target.options[event.target.selectedIndex].getAttribute("ay"));
    }

    function handleYilSelect (event){
        setYil(event.target.options[event.target.selectedIndex].getAttribute("yil"));
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        if (!ay || !yil) return;
        fetch(`http://localhost/formonth.php?ay=${ay}&yil=${yil}`) // Replace with the URL of your PHP script
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
  
    }, [ay, yil, data]);

    kaliphane_is = data.filter(item => item.bolum === 'Kalıphane' && item.isg_turu === "İş Kazası").length;
    kaliphane_ramak = data.filter(item => item.bolum === 'Kalıphane' && item.isg_turu === "Ramak Kala").length;
    dokumhane_is = data.filter(item => item.bolum === 'Dökümhane' && item.isg_turu === "İş Kazası").length;
    dokumhane_ramak = data.filter(item => item.bolum === 'Dökümhane' && item.isg_turu === "Ramak Kala").length;
    plastik_is = data.filter(item => item.bolum === 'Plastik Enjeksiyon' && item.isg_turu === "İş Kazası").length;
    plastik_ramak = data.filter(item => item.bolum === 'Plastik Enjeksiyon' && item.isg_turu === "Ramak Kala").length;
    talasli_is = data.filter(item => item.bolum === 'Talaşlı İmalat' && item.isg_turu === "İş Kazası").length;
    talasli_ramak = data.filter(item => item.bolum === 'Talaşlı İmalat' && item.isg_turu === "Ramak Kala").length;
    montaj_is = data.filter(item => item.bolum === 'Montaj' && item.isg_turu === "İş Kazası").length;
    montaj_ramak = data.filter(item => item.bolum === 'Montaj' && item.isg_turu === "Ramak Kala").length;
    makineiml_is = data.filter(item => item.bolum === 'Nakine İmalat' && item.isg_turu === "İş Kazası").length;
    makineiml_ramak = data.filter(item => item.bolum === 'Makine İmalat' && item.isg_turu === "Ramak Kala").length;
    up_is = data.filter(item => item.bolum === 'Üretim Planlama' && item.isg_turu === "İş Kazası").length;
    up_ramak = data.filter(item => item.bolum === 'Üretim Planlama' && item.isg_turu === "Ramak Kala").length;
  
    const data1 = [
        {
            name: 'Kalıphane',
            İK: kaliphane_is,
            RK: kaliphane_ramak,
        },
        {
            name: 'Dökümhane',
            İK: dokumhane_is,
            RK: dokumhane_ramak,
        },
        {
            name: 'Plastik Enj.',
            İK: plastik_is,
            RK: plastik_ramak,
        },
        {
            name: 'Talaşlı İmalat',
            İK: talasli_is,
            RK: talasli_ramak,
        },
        {
            name: 'Montaj',
            İK: montaj_is,
            RK: montaj_ramak,
        },
        {
            name: 'Makine İmalat',
            İK: makineiml_is,
            RK: makineiml_ramak,
        },
        {
            name: 'Üretim Planlama',
            İK: up_is,
            RK: up_ramak,
        },
    ];

    return ( 
        <div>  
            <div className='genislik50 mt-5 selectdiv disdiv'>

                <div className='icdiv'>
                    <h5>Tarih Seçiniz:</h5>
                </div>
    
                <div className='icdiv mx-5'>
                    <select className='form-select' onChange={handleYilSelect}> 
                        {optionsyil.map(optionyil=>(
                            <option yil={optionyil.yil}>{optionyil.label}</option>                          
                        ))}
                    </select>
                </div>

                <div className='icdiv mx-5'>
                    <select className='form-select' onChange={handleAySelect}> 
                        {options.map(option=>(
                            <option ay={option.ay}>{option.label}</option>              
                        ))}
                    </select>
                </div>  
            </div>
            
            <div>
                <h3 className='ortalanmis_yazi mt-5'>Fabrika Geneli Veriler</h3>
            </div>
            <div className='mt-5'>
                <div className='table'>
                    <Table bordered hover striped="columns">
                        <tbody>
                            <tr>
                                <th className='tableElement'>ID</th>
                                <th className='tableElement'>Tarih</th>
                                <th className='tableElement'>Bölüm</th>
                                <th className='tableElement'>ISG Türü</th>
                                <th className='tableElement'>Kaynak</th>
                                <th className='tableElement'>Personel</th>
                                <th className='tableElement'>Açıklama</th>
                            </tr>
                         
                        </tbody>
                    </Table>
                </div>

                <div className='table'>
                    <Table bordered hover striped="columns">
                        {data.map(item => (  
                            <tbody >
                                <tr>
                                    <td className='tableElement' key={item.id}>{item.id_is_kazasi}</td>
                                    <td className='tableElement' key={item.id}>{item.tarih}</td>
                                    <td  className='tableElement' key={item.id}>{item.bolum}</td>
                                    <td  className='tableElement' key={item.id}>{item.isg_turu}</td>
                                    <td  className='tableElement' key={item.id}>{item.kaynak}</td>
                                    <td  className='tableElement' key={item.id}>{item.personel}</td>
                                    <td  className='tableElement' key={item.id}>{item.aciklama}</td>                           
                                </tr>          
                            </tbody>                         
                        ))}                                
                    </Table>       
                </div>

                <div className='ortalanmis_div align-items-center mt-5' >
                    <BarChart
                        width={1000}
                        height={360}
                        data={data1}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false}/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="İK" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                        <Bar dataKey="RK" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                    </BarChart>
                </div> 
    
            </div>      
        </div>  
    );
};

export default AccidentForMonth;