
class App extends React.Component {

    state = {
        gigz: [],
        show: true
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

    render = () => {
        return (
            <div>
            <h1>Create GIG Post</h1>
            <form onSubmit={this.createGig}>
                <input onChange={this.changeNewGigName} type="text" placeholder="name"/>
                <input onChange={this.changeNewGigDate} type="date" placeholder="date"/>
                <input onChange={this.changeNewGigLocation} type="text" placeholder="location"/>
                <input onChange={this.changeNewGigCompensation} type="text" placeholder="compensation"/>
                <input onChange={this.changeNewGigNotes} type="textarea" placeholder="notes"/>
                <input type="submit" value="Create GIG"/>
            </form>
                <h2>GIGZ</h2>
                <ul>
                    {
                        this.state.gigz.map(
                            (gig) => {
                                return (
                                    <li>
                                        {gig.name}<br/>
                                        {gig.date}<br/>
                                        {gig.location}<br/>
                                        {gig.compensation}<br/>
                                        {gig.notes}<br/>
                                        <button value={gig.id} onClick={this.deleteGig}>
                                            DELETE
                                        </button>
                                        <form id={gig.id} onSubmit={this.updateGig}>
                                            <input onChange={this.changeUpdateGigName} type="text" placeholder="name"/>
                                            <input onChange={this.changeUpdateGigDate} type="date" placeholder="date"/>
                                            <input onChange={this.changeUpdateGigLocation} type="text" placeholder="location"/>
                                            <input onChange={this.changeUpdateGigCompensation} type="text" placeholder="compensation"/>
                                            <input onChange={this.changeUpdateGigNotes} type="textarea" placeholder="notes"/>
                                            <input type="submit" value="Update GIG"/>
                                        </form>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
            </div>
        )
    }

}




ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)