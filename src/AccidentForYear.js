import React, { useState, useEffect, useRef} from 'react';
import Table from 'react-bootstrap/Table';
import './style.css'
import Button from 'react-bootstrap/Button';
import { useReactToPrint } from 'react-to-print';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
var kaliphane_is = 0, kaliphane_ramak = 0 , dokumhane_is = 0, dokumhane_ramak = 0 , plastik_is = 0, plastik_ramak = 0, 
talasli_is = 0, talasli_ramak = 0, montaj_is = 0, montaj_ramak = 0, makineiml_is = 0, makineiml_ramak = 0, up_is = 0,
up_ramak = 0



const AccidentForYear = () => {


    const [yil, setYil] = useState('')

    const options = [
        {label: "Seçiniz", yil: -1},
        {label: "2023", yil: 2023},
        {label: "2024", yil: 2024}
    ]

    function handleSelect(event){
        setYil(event.target.value)
    }



    const [data, setData] = useState([]);

    useEffect(() => {
        if (!yil) return;
        fetch(`http://localhost/foryear.php?yil=${yil}`) // Replace with the URL of your PHP script
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));

         
    }, [yil, data]);



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
  
    console.log(yil)
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

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return ( 
        <div>  
            <div className='genislik50 mt-5 selectdiv'>
                <h5>Tarih Seçiniz:</h5>
                <select className='form-select' onChange={handleSelect}> 
                    {options.map(option=>(
                        <option yil={option.yil}>{option.label}</option>
                    ))}
                </select>
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

                <div ref={componentRef} className='printable'>
                    <div className='ortalanmis_div mt-5'>
                        <h5>Yıllık İş Kazaları ve Ramak Kalalar</h5>
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
                            <Bar dataKey="İK" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />}  label={{ position: 'top' }}/>
                            <Bar dataKey="RK" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />}  label={{ position: 'top' }}/>
                        </BarChart>
                    </div> 
                </div>    
                <div className='ortalanmis_div'>
                    <Button variant="outline-secondary" onClick={handlePrint}>Grafiği Yazdır</Button>
                </div>   
            </div>      
        </div>  
    );
};

export default AccidentForYear;