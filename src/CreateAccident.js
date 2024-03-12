import React, { useState } from 'react'
import './style.css'
import { Form } from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCalendarDays} from "@fortawesome/free-solid-svg-icons"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

function CreateAccident() {
const [selectedDate, setSelectedDate] = useState(null)
const [bolum, setBolum] = useState('')
const [isg_turu, setIsg_Turu] = useState('')
const [kaynak, setKaynak] = useState('')
const [personel, setPersonel] = useState('')
const [aciklama, setAciklama] = useState('')
const timezoneOffsetInMinutes = new Date().getTimezoneOffset();
const timezoneOffsetInMilliseconds = timezoneOffsetInMinutes * 60000;
const adjustedDate = new Date(new Date(selectedDate).getTime() - timezoneOffsetInMilliseconds);
const formattedDate = adjustedDate.toISOString().split('T')[0];

const handleSubmit = (event) =>{
    event.preventDefault()
    
    if(bolum.length === 0){
        alert("Bölüm adı boş bırakılamaz!")
    }else if(isg_turu.length === 0){
        alert("İSG Türü boş bırakılmaz")
    }else if(kaynak.length === 0){
        alert("Kaynak boş bırakılamaz")
    }else if(personel.length === 0){
        alert("Personel adı boş bırakılamaz!")
    }else if (selectedDate.length === 0){
        alert("Tarih boş bırakılamaz!")
    }else{
        const url = 'http://localhost:80/ybs_project.php'
        let fData = new FormData()    
        fData.append('tarih', formattedDate)
        fData.append('bolum', bolum)
        fData.append('isg_turu', isg_turu)
        fData.append('kaynak', kaynak)
        fData.append('personel', personel)
        fData.append('aciklama', aciklama)
        axios.post(url, fData).then(response => alert(response.data)).catch(error => alert(error))

    } 
}

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='form_container p-5 rounded bg-white'>
            <form>
                <h3 className=' justify-content-center align-items-center d-flex mb-4'>Günlük İş Kazaları</h3>
                {/* tarih  selected={selectedDate} onChange={date => setSelectedDate(date)} onSubmit={handleSubmit}*/}
                <div className='mb-2 mt-2'>
                    <h6>Tarih Seçiniz:</h6>
                    <div className='d-flex align-items-center pt-2'>
                        <div className=''>
                            <i><FontAwesomeIcon icon={faCalendarDays}/></i>
                        </div>
                        <div className='mx-3'>
                            <DatePicker id='tarih' className='form-control genislik' htmlFor="tarih" name='tarih' selected={selectedDate} onChange={date => setSelectedDate(date)}/>

                        </div>
                    </div>
                </div>
                {/* bölüm */}
                <div className='mb-2 mt-4'>
                    <h6>Bölüm Şeçiniz:</h6>
                    <Form.Select aria-label="is_bolumu" id='bolum' htmlFor="bolum" className='form-control'name='bolum' value={bolum} onChange={(e) => setBolum(e.target.value)}>
                    <option value="Seçilmedi" id='secilmedi'>Seçilmedi</option>
                    <option value="Kalıphane" id='kaliphane'>Kalıphane</option>
                    <option value="Dökümhane" id='dokumhane'>Dökümhane</option>
                    <option value="Plastik Enjeksiyon" id='plastik_enjeksiyon'>Plastik Enjeksiyon</option>
                    <option value="Talaşlı İmalat" id='talasli_imalat'>Talaşlı İmalat</option>
                    <option value="Montaj" id='montaj'>Montaj</option>
                    <option value="Makine İmalat" id='makine_imalat'>Makine İmalat</option>
                    <option value="Üretim Planlama" id='uretim_planlama'>Üretim Planlama</option>
                    </Form.Select>
                </div>

                {/* isg türü */}
                <div className='mt-4 mb-2'>
                    <h6>İSG Türü Seçiniz:</h6>
                    <Form.Select aria-label='isg_turu' id='isg_turu' className='form-control' name='isg_turu' value={isg_turu} onChange={(e) => setIsg_Turu(e.target.value)}>
                        <option value="Seçilmedi" id='secilmedi'>Seçilmedi</option>
                        <option value="İş Kazası" id='is_kazasi'>İş Kazası</option>
                        <option value="Ramak Kala" id='ramak_kala'>Ramak Kala</option>
                    </Form.Select>
                </div>

                {/* kaynak */}
                <div className='mt-4 mb-2'>
                    <h6>Kaza Kaynağını Seçiniz:</h6>
                    <Form.Select id='kaynak' className='form-control' name='kaynak' value={kaynak} onChange={(e) => setKaynak(e.target.value)}>
                        <option value="Seçilmedi" id='secilmedi'>Seçilmedi</option>
                        <option value="Personel Kaynaklı" id='personel_kaynakli'>Personel Kaynaklı</option>
                        <option value="Organizasyon Kaynaklı" id='organizasyon_kaynakli'>Organizasyon Kaynaklı</option>
                    </Form.Select>
                </div>

                {/* kazayı yapan kişi onChange={e => setPersonel(e.target.value)}*/}
                <div className='mt-4 mb-2'>
                    <label className='fw-bold'>Kazayı Yapan Kişi:</label>
                    <input type='text' id='personel' className='form-control' name='personel' value={personel} onChange={(e) => setPersonel(e.target.value)} />
                </div>

                {/* açıklama */}
                <div className='mt-4 mb-2'>
                    <label className='fw-bold'>Açıklama:</label>
                    <input type='text' id='aciklama' className='form-control' name='aciklama' value={aciklama} onChange={(e) => setAciklama(e.target.value)}/>
                </div>

                {/* kaydet butonu */}
                <div className='mt-4 mb-2 d-flex align-items-between mainbutton'>
                    <input type='button' className='btn btn-outline-secondary' name='kaydet' id='kaydet' value="Kaydet" onClick={handleSubmit}></input>
                    <Link to="/ShowAccident"> <button className="btn btn-outline-secondary">Kazaları Göster</button></Link>                     
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateAccident
