import React, { Component } from 'react';

import Input from './Input';
import Checkbox from './Checkbox';
import Button from './Button';

class Form extends Component {
    state ={
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        postcode: '',
        houseNumber: '',
        fullAddress: '',
        consent: false,
        address: ["25 Oxford Drive, , , , Waterloo, Liverpool, Merseyside"]
    }

    handleChange = (e) => {
        let value = e.target.value;
        let name = e.target.name;

        this.setState({
            [name]: value
        });
    }


    handleCheckboxChange = (e) => {
        let name = e.target.name;

        this.setState((prevState) => ({
            [name]: !prevState[name]
        }));
    }
    
    searchForAddress = () => {
        const { houseNumber, postcode} = this.state;
        const that = this;

        fetch(`https://api.getAddress.io/find/${postcode}/${houseNumber}?api-key=ZxTy_qnGck2BshPyX4Ar3g18402`)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }
            
                    response.json().then(function(data) {
                        let addresses = data.addresses;

                        // would render list from this array with options for address
                        that.setState(() => ({
                            fullAddress: data.addresses[0]
                        }));
                    });
                }
                )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }


    handleSubmit = () => {
        if (this.state.consent) {
            alert(JSON.stringify(this.state));
        } else {
            alert('Please tick consent')
        }
    }


    render() {
        const { firstName, lastName, email, dob, fullAddress, consent, postcode, houseNumber } = this.state;


        return (
            <div className="form__container form-group">
                <Input 
                    name={'firstName'}
                    value={firstName}
                    onChange={this.handleChange}
                    placeholder={'Enter first name'}
                    title={'First Name'}
                    type={'text'}
                />
                <Input 
                    name={'lastName'}
                    value={lastName}
                    onChange={this.handleChange}
                    placeholder={'Enter last name'}
                    title={'Last Name'}
                    type={'text'}
                />
                <Input 
                    name={'email'}
                    value={email}
                    onChange={this.handleChange}
                    placeholder={'Enter email'}
                    title={'Email'}
                    type={'email'}
                />
                <Input 
                    name={'dob'}
                    value={dob}
                    onChange={this.handleChange}
                    placeholder={'DD/MM/YYYY'}
                    title={'D.O.B'}
                    type={'text'}
                />
                <Input 
                    name={'postcode'}
                    value={postcode}
                    onChange={this.handleChange}
                    placeholder={'Enter your postcode'}
                    title={'Postcode'}
                    type={'text'}
                />
                <Input 
                    name={'houseNumber'}
                    value={houseNumber}
                    onChange={this.handleChange}
                    placeholder={'Enter House number'}
                    title={'House Number'}
                    type={'number'}
                />
                <Button 
                    action={this.searchForAddress} 
                    text={'Search'} 
                />
                { fullAddress && (
                    <div>
                        <label>Your Address</label>
                        <input value={fullAddress} disabled/>
                    </div>
                )}
                
                <Checkbox 
                    onChange={this.handleCheckboxChange}
                    consent={consent}
                    name={'consent'}
                    message={'I consent to giving my data'}
                />
                <Button 
                    action={this.handleSubmit} 
                    text={'Submit'} 
                />
            </div>  
        )
    }
}

export default Form;