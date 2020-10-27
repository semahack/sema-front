import React, { useState} from 'react';
import './Sema.css';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import img from './preview.png';
import {Alert} from 'react-bootstrap';
import logo from './logo.png';


const Sema = () => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState('no data');
    const [preview, setPreview] = useState(img)
    const [prediction, setPrediction] = useState('')
    const [showAlert, setshowAlert] = useState({alert:false,  wait : 'Upload cell image below...'})


    const handleChange = (e) => {
           
        setData(e.target.files[0]);
        setshowAlert({alert:false,  wait : 'Waiting for prediction...'})
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    async function fetchData() {
            
            const apiUrl = 'https://sema-api.herokuapp.com//api/classify';

            setLoading(true);

            const imageFormData = new FormData();
            imageFormData.append('file', data);

            axios.post(apiUrl, imageFormData, {
                headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then((response) => {
                    const predictions = response.data;

                    setPrediction(predictions);
                    setshowAlert({alert: true, wait: ''}) 
                    setLoading(false);
                    setData('no data')

                },[setLoading, setPrediction, setshowAlert, setData]
                ).catch(function(error) {
                    console.log(error)
                })
        }  
  

    const handleSubmit = e => {
        if(data === 'no data'){
           return setshowAlert({alert:false,  wait : 'Upload cell image below...'})
        } else {
            e.preventDefault()
            fetchData()
        }
    }


    return(
            <div className='page-wrapper'>
                <div className='logo'><img src={logo} alt='logo' width='250' height='170'/></div>
                <div className='inner-wrapper'>

                    { loading ? 

                        <LoadingSpinner />
                        

                         :

                         
                        <div className='upload-wrapper'>
                            <div className='image-wrapper'>
                                <img src={preview} alt='upload cell image' width="180" height="200"/>
                            </div>

                            <h5 className='hred'>{ showAlert.wait }</h5>

                            { showAlert.alert ? 
                                prediction.infected === 1 
                                      ?
                                <Alert variant='danger' show={true}>
                                    <p>Cell is infected</p>
                                </Alert> 
                                
                                    :     

                                <Alert variant='success' show={true}>
                                    <p>Cell is not infected!</p>
                                </Alert> 
                              :  ''
                              
                            }

                 
                            
                        <div className='input-field'>
                            <h4 className='h'>Please select cell image below</h4>

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="file"
                                    id="upload"
                                    label='Input file'
                                    onChange={handleChange}    
                                />

                             <button 
                                type='submit'
                                className='submit-button'
                            > 
                               <h5>Predict</h5> 
                            </button>

                            </form>

                            </div>





                        </div>

                        
                    }
                    
                    <div className='description'></div>
                </div>
                
            </div>
    );
}

export default Sema;