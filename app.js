
class Edit extends React.Component {
    
    state = {
        show: false
    }

    toggleShow = () => {
        this.setState({
            show: !this.state.show
        })
    }


    render = () => {
        const {gig, updateGig, 
                changeUpdateGigName, 
            changeUpdateGigDate, 
            changeUpdateGigLocation, 
            changeUpdateGigCompensation, 
            changeUpdateGigNotes,
            deleteGig } = this.props

        return (
            <div className="editclass">
            <button onClick={this.toggleShow}>Edit</button>
            <div className="editform">
                {this.state.show ? (
                    <form id={gig.id} onSubmit={updateGig}>
                    <input onChange={changeUpdateGigName} type="text" placeholder="name"/>
                    <input onChange={changeUpdateGigDate} type="date" placeholder="date"/>
                    <input onChange={changeUpdateGigLocation} type="text" placeholder="location"/>
                    <input onChange={changeUpdateGigCompensation} type="text" placeholder="compensation"/>
                    <input onChange={changeUpdateGigNotes} type="textarea" placeholder="notes"/>
                    <input type="submit" value="Update GIG"/>
                    <button value={gig.id} onClick={deleteGig}>DELETE</button>
                </form>
                ) : (
                    ''
                )}
            
            </div>
            </div>
        )
    }
}


class App extends React.Component {
        state = {
            gigz: []
        }

    changeNewGigName = (event) => {
        this.setState({
            newGigName: event.target.value,
        })
    }


    changeNewGigDate = (event) => {
        this.setState({
            newGigDate: event.target.value,
        })
    }


    changeNewGigLocation = (event) => {
        this.setState({
            newGigLocation: event.target.value,
        })
    }


    changeNewGigCompensation = (event) => {
        this.setState({
            newGigCompensation: event.target.value,
        })
    }

    changeNewGigNotes = (event) => {
        this.setState({
            newGigNotes: event.target.value,
        })
    }

    createGig = (event) => {
        event.preventDefault();
        // console.log(this.state);
        axios.post(
            '/gigz',
            {
                name: this.state.newGigName,
                date: this.state.newGigDate,
                location: this.state.newGigLocation,
                compensation: this.state.newGigCompensation,
                notes: this.state.newGigNotes
            }
        ).then(
            (response) => {
                this.setState({
                    gigz: response.data
                })
            }
        )
        
    }

    componentDidMount = () => {
        axios.get('/gigz').then(
            (response) => {
                this.setState({
                    gigz: response.data
                })
            }
        )
    }


    changeUpdateGigName = (event) => {
        this.setState({
            updateGigName:event.target.value
        })
    }

    changeUpdateGigDate = (event) => {
        this.setState({
            updateGigDate:event.target.value
        })
    }

    changeUpdateGigLocation = (event) => {
        this.setState({
            updateGigLocation:event.target.value
        })
    }


    changeUpdateGigCompensation = (event) => {
        this.setState({
            updateGigCompensation:event.target.value
        })
    }

    changeUpdateGigNotes = (event) => {
        this.setState({
            updateGigNotes:event.target.value
        })
    }

    updateGig = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        axios.put(
            '/gigz/' + id,
            {
                name:this.state.updateGigName,
                date:this.state.updateGigDate,
                location:this.state.updateGigLocation,
                compensation:this.state.updateGigCompensation,
                notes:this.state.updateGigNotes
            }
        ).then((response) => {
            this.setState({
                gigz:response.data
            })
        })
    }

    deleteGig = (event) => {
        axios.delete('/gigz/' + event.target.value).then(
            (response) => {
                this.setState(
                    {
                        gigz: response.data
                    }
                )
            }
        )
    }

    render = () => {
        return (
    <div className="container">
            <div className="header">
                <h1>MYGIGZ</h1>
            </div>
            <div className="pagecontent">
            <div className="sidebar">
                <h2>ADD MY GIGZ</h2>
                <form className="newform" onSubmit={this.createGig}>
                    <input onChange={this.changeNewGigName} type="text" placeholder="name"/>
                    <input onChange={this.changeNewGigDate} type="date" placeholder="date"/>
                    <input onChange={this.changeNewGigLocation} type="text" placeholder="location"/>
                    <input onChange={this.changeNewGigCompensation} type="text" placeholder="compensation"/>
                    <input onChange={this.changeNewGigNotes} type="textarea" placeholder="notes"/>
                    <input type="submit" value="Create GIG"/>
                </form>
            </div>
            <div className="main">
        
                <ul>
                    {
                        this.state.gigz.map(
                            (gig) => {
                                return (
                                    <li>
                                        <h4>NAME: {gig.name}</h4>
                                        <h4>DATE: {gig.date}</h4>
                                        <h4>LOCATION: {gig.location}</h4>
                                        <h4>PAY: {gig.compensation}</h4> 
                                        {gig.notes}<br/>
                                        <Edit 
                                        updateGig={this.updateGig}
                                        changeUpdateGigName={this.changeUpdateGigName}
                                        changeUpdateGigDate={this.changeUpdateGigDate}
                                        changeUpdateGigLocation={this.changeUpdateGigLocation}
                                        changeUpdateGigCompensation={this.changeUpdateGigCompensation}
                                        changeUpdateGigNotes={this.changeUpdateGigNotes}
                                        deleteGig={this.deleteGig}
                                        gig={gig}/>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
                 </div>
            </div>
        </div>
        )
    }

}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)