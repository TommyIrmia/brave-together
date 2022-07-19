import React from 'react';

// import '../../assets/scss/cmps/backButton';

const backButtonIcon = 'images/icons/Back.png'
class BackButton extends React.Component {

    onBackButtonClick = () => {
        this.props.history.goBack()
    }

    render() {
        return (


            <div className='go-back' style={{ backgroundImage: `url(${backButtonIcon})` }} onClick={this.onBackButtonClick} />

        )
    }
}

export default BackButton;