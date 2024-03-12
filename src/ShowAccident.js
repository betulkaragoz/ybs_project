import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './style.css'

function ShowAccident(){
 
    return (

        <div>
            <div className='ortalanmis_yazi mt-5'>
                <h3>Raporları Filtrele</h3>
            </div>


            <div className='carddisdiv'>      
                <div className='cardicdiv'>
                <Card style={{ width: '19rem' }}>
                    <Card.Body>
                        <Card.Title>Fabrika Geneli İş Kazaları</Card.Title>
                        <Card.Text>
                        Fabrikada olan tüm iş kazalarının listelenmesi, bölümlere göre ayrılması ve gösterimi
                        </Card.Text>
                        <Button variant="outline-secondary" href='/ShowAllAccident'>Sonuçları Göster </Button>
                    </Card.Body>
                </Card>
                </div>

                <div className='cardicdiv'>
                <Card style={{ width: '19rem' }}>
                    <Card.Body>
                        <Card.Title>Yıllık Raporlar</Card.Title>
                        <Card.Text>
                        Fabrikada olan iş kazalarının yıllara göre filtrelenerek listelenmesi ve gösterimi
                        </Card.Text>
                        <Button variant="outline-secondary" href='/AccidentForYear'>Sonuçları Göster </Button>
                    </Card.Body>
                </Card>
                </div>

                <div className='cardicdiv'>
                <Card style={{ width: '19rem' }}>
                    <Card.Body>
                        <Card.Title>Aylık Raporlar</Card.Title>
                        <Card.Text>
                        Fabrikada olan iş kazalarının aylara göre filtrelenerek listelenmesi ve gösterimi
                        </Card.Text>
                        <Button variant="outline-secondary" href='/AccidentForMonth'>Sonuçları Göster </Button>
                    </Card.Body>
                </Card>
                </div>

            </div>

            <div className='carddisdiv'>
                <div className='cardicdiv'>
                <Card style={{ width: '19rem' }}>
                    <Card.Body>
                        <Card.Title>Çeyrek Raporlar</Card.Title>
                        <Card.Text>
                        Fabrikada olan iş kazalarının çeyrek yıllara göre filtrelenerek listelenmesi ve gösterimi
                        </Card.Text>
                        <Button variant="outline-secondary" href='/AccidentForQuarter'>Sonuçları Göster </Button>
                    </Card.Body>
                </Card>
                </div>
                <div className='cardicdiv'>
                <Card style={{ width: '19rem' }}>
                    <Card.Body>
                        <Card.Title>Özelleştirilmiş Raporlar</Card.Title>
                        <Card.Text>
                        Fabrikada olan tüm iş kazalarının tarih aralıklarına göre listelenmesi ve gösterimi
                        </Card.Text>
                        <Button variant="outline-secondary" href='/AccidentForDate'>Sonuçları Göster </Button>
                    </Card.Body>
                </Card>
                </div>
                <div className='cardicdiv'>
                <Card style={{ width: '19rem' }}>
                    <Card.Body>
                        <Card.Title>Bölüm Grafikleri</Card.Title>
                        <Card.Text>
                        Fabrikada olan tüm iş kazalarının bölümlere göre iş kazalarındaki artışı gösteren grafikler
                        </Card.Text>
                        <Button variant="outline-secondary" href='/AccidentForDepartment'>Sonuçları Göster </Button>
                    </Card.Body>
                </Card>
                </div>

            </div>

    </div>
            
           
       
       
        
    )
}

export default ShowAccident;